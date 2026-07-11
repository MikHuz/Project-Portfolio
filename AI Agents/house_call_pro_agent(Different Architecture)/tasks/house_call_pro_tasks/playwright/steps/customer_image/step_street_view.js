/**
 * step_street_view.js — Get Google Street View house image
 *
 * Navigates Google Maps Street View for a given address, clicks Share,
 * grabs the clean thumbnail URL from the share dialog, downloads it.
 *
 * CDP port: 18800 (main openclaw browser — needs Google login session)
 *
 * Usage:
 *   ADDRESS="183 Fleet St, Vallejo, CA 94591"
 *   OUT_PATH="/abs/path/to/house_original.png"
 *
 *   node steps/step_street_view.js
 */

'use strict';

const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const CDP_URL  = process.env.CDP_URL   || 'http://127.0.0.1:18800';
const ADDRESS  = (process.env.ADDRESS  || '').trim();
const OUT_PATH = (process.env.OUT_PATH || '').trim();

if (!ADDRESS)  { console.error('ERROR: ADDRESS is required'); process.exit(1); }
if (!OUT_PATH) { console.error('ERROR: OUT_PATH is required'); process.exit(1); }

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Build a Street View Static API URL — fastest, no JS needed.
 * Falls back to scraping if the page doesn't expose it.
 */
function staticSVUrl(address) {
  const enc = encodeURIComponent(address);
  return `https://maps.googleapis.com/maps/api/streetview?size=800x600&location=${enc}&fov=90&heading=0&pitch=0&key=`;
}

/**
 * Extract the clean thumbnail from the Maps share dialog.
 * Returns the URL string or null.
 */
async function getShareThumbnail(page) {
  // Look for a thumbnail img inside the share panel
  const src = await page.evaluate(() => {
    // Share dialog thumbnails
    const imgs = Array.from(document.querySelectorAll('img'));
    // Filter: must be a googleusercontent or streetviewpixels URL, reasonable size
    const candidates = imgs.filter(img => {
      const src = img.src || '';
      return (
        src.includes('streetviewpixels') ||
        src.includes('geo0.ggpht') ||
        src.includes('maps.googleapis.com/maps/api/streetview') ||
        (src.includes('googleusercontent') && img.naturalWidth > 200)
      );
    });
    if (!candidates.length) return null;
    // Pick largest by natural size
    candidates.sort((a, b) => (b.naturalWidth * b.naturalHeight) - (a.naturalWidth * a.naturalHeight));
    return candidates[0].src;
  });
  return src;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  console.log('\n=== step_street_view.js ===');
  console.log(`Address: ${ADDRESS}`);
  console.log(`Out:     ${OUT_PATH}\n`);

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });

  const browser = await chromium.connectOverCDP(CDP_URL);
  const context = browser.contexts()[0];
  const page = await context.newPage();

  try {
    // ── Approach 1: Google Maps embed (fast, no JS gymnastics) ───────────────
    const mapsUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=&query=${encodeURIComponent(ADDRESS)}`;
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(ADDRESS)}`;

    console.log('[Street View] Loading Google Maps...');
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(3000);

    // Try clicking the Street View pegman or thumbnail if visible
    const svThumb = await page.$('[data-tooltip="Street View"], [aria-label="Street View"], [data-value="streetview"]');
    if (svThumb) {
      await svThumb.click();
      await page.waitForTimeout(2000);
      console.log('  ✓ clicked Street View entry point');
    } else {
      // Try clicking the place card photo which often opens SV
      const placePhoto = await page.$('[data-section="photos"] img, [jsaction*="photo"] img, .OKAoZd img');
      if (placePhoto) {
        await placePhoto.click();
        await page.waitForTimeout(2000);
      }
    }

    // ── Click Share button ───────────────────────────────────────────────────
    console.log('[Street View] Looking for Share button...');
    const shareBtn = await page.$('button[aria-label="Share"], button[data-tooltip="Share"], [aria-label="Share"]');
    if (shareBtn) {
      await shareBtn.click();
      await page.waitForTimeout(2500);
      console.log('  ✓ Share dialog opened');

      const thumbUrl = await getShareThumbnail(page);
      if (thumbUrl) {
        console.log(`  ✓ Got thumbnail: ${thumbUrl.slice(0, 80)}...`);
        
        // Method A: Use Playwright fetch (inherits browser cookies — works for geo/SV URLs)
        try {
          const resp = await page.context().request.get(thumbUrl, { timeout: 15000 });
          if (resp.ok()) {
            const body = await resp.body();
            if (body.length > 5000) {
              fs.writeFileSync(OUT_PATH, body);
              console.log(`  ✓ Saved via browser fetch: ${path.basename(OUT_PATH)} (${Math.round(body.length/1024)}KB)`);
              await page.close().catch(() => {});
              
              console.log('\n✅ DONE');
              return;
            }
          }
          console.log(`  ⚠ Browser fetch returned ${resp.status()} — trying screenshot approach`);
        } catch (fetchErr) {
          console.log(`  ⚠ Browser fetch failed: ${fetchErr.message}`);
        }
        
        // Method B: Open the thumbnail URL in a new tab and screenshot it
        try {
          const imgTab = await page.context().newPage();
          await imgTab.goto(thumbUrl, { waitUntil: 'load', timeout: 10000 });
          await imgTab.waitForTimeout(1000);
          // Screenshot just the image element
          const imgEl = await imgTab.$('img, body');
          if (imgEl) {
            await imgEl.screenshot({ path: OUT_PATH, type: 'png' });
            const size = fs.statSync(OUT_PATH).size;
            if (size > 5000) {
              console.log(`  ✓ Saved via tab screenshot: ${path.basename(OUT_PATH)} (${Math.round(size/1024)}KB)`);
              await imgTab.close().catch(() => {});
              await page.close().catch(() => {});
              
              console.log('\n✅ DONE');
              return;
            }
          }
          await imgTab.close().catch(() => {});
        } catch (tabErr) {
          console.log(`  ⚠ Tab screenshot failed: ${tabErr.message}`);
        }
      }
      // Close dialog and try next approach
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }

    // ── Approach 2: Find streetviewpixels thumbnail via new tab detection ────
    console.log('[Street View] Approach 2: check open tabs for streetviewpixels URL...');
    const pages = context.pages();
    for (const p of pages) {
      const url = p.url();
      if (url.includes('streetviewpixels-pa.googleapis.com/v1/thumbnail')) {
        console.log('  ✓ Found SV thumbnail tab:', url.slice(0, 80));
        const imgContent = await p.evaluate(() => {
          const img = document.querySelector('img');
          return img ? img.src : null;
        }).catch(() => null);
        const dlUrl = imgContent || url;
        execSync(`curl -sL "${dlUrl}" -o "${OUT_PATH}"`, { timeout: 20000 });
        const size = fs.statSync(OUT_PATH).size;
        if (size > 5000) {
          console.log(`  ✓ Saved ${path.basename(OUT_PATH)} (${Math.round(size/1024)}KB)`);
          await page.close().catch(() => {});
          
          console.log('\n✅ DONE');
          return;
        }
      }
    }

    // ── Approach 3: Direct Street View Static embed via Maps embed ───────────
    console.log('[Street View] Approach 3: Maps embed iframe...');
    await page.goto(`https://www.google.com/maps/embed/v1/streetview?key=&location=${encodeURIComponent(ADDRESS)}`, 
      { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Intercept image responses on the page
    const imageUrls = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .map(i => ({ src: i.src, w: i.naturalWidth, h: i.naturalHeight }))
        .filter(i => i.src && i.w > 300 && !i.src.includes('logo'));
    });
    
    if (imageUrls.length) {
      const best = imageUrls.sort((a, b) => (b.w * b.h) - (a.w * a.h))[0];
      console.log(`  ✓ Found image: ${best.src.slice(0, 80)} (${best.w}x${best.h})`);
      execSync(`curl -sL "${best.src}" -o "${OUT_PATH}"`, { timeout: 20000 });
      const size = fs.statSync(OUT_PATH).size;
      if (size > 5000) {
        console.log(`  ✓ Saved ${path.basename(OUT_PATH)} (${Math.round(size/1024)}KB)`);
        await page.close().catch(() => {});
        
        console.log('\n✅ DONE');
        return;
      }
    }

    // ── Approach 4: Street View direct URL + screenshot ─────────────────────────
    console.log('[Street View] Approach 4: Direct Street View URL + screenshot...');
    const svUrl = `https://www.google.com/maps/@?api=1&map_action=pano&query=${encodeURIComponent(ADDRESS)}`;
    await page.goto(svUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(4000); // SV takes a few seconds to render

    // Try to crop to just the street view canvas (full-screen SV hides UI)
    // Look for the canvas element
    const svCanvas = await page.$('canvas, #streetview-panorama, [id*="svpano"], div[style*="overflow: hidden"]');
    if (svCanvas) {
      await svCanvas.screenshot({ path: OUT_PATH, type: 'png' });
    } else {
      // Full page screenshot, crop to top 60% (avoids bottom UI)
      const viewport = page.viewportSize();
      await page.screenshot({
        path: OUT_PATH,
        type: 'png',
        clip: { x: 0, y: 0, width: viewport.width, height: Math.round(viewport.height * 0.75) }
      });
    }
    const size = fs.statSync(OUT_PATH).size;
    console.log(`  ✓ Screenshot saved ${path.basename(OUT_PATH)} (${Math.round(size/1024)}KB)`);

    await page.close().catch(() => {});
    
    console.log('\n✅ DONE (screenshot fallback)');

  } catch (err) {
    await page.close().catch(() => {});
    
    console.error('\n❌ FAILED:', err.message);
    process.exit(1);
  }
})();
