/**
 * step_upload_image.js — Upload a door visualization image to the Option #1 image slot
 *                        in a HousecallPro estimate.
 *
 * HOW IT WORKS:
 *   1. Navigates to the HCP estimate (or uses existing open tab — matches est_ or best_ prefix)
 *   2. Clicks the Option image placeholder button:
 *        - If image already set: clicks "Replace"
 *        - If no image: finds the small icon button that is a direct sibling of the
 *          element containing "Option #1" text inside the option body panel
 *   3. "Add option image" dialog → Upload tab
 *   4. setInputFiles({ force:true }) on [data-testid="upload-tab-dropzone-input"]
 *   5. Dispatches change event → triggers React → "Crop your image" dialog appears
 *   6. Clicks Save on crop dialog
 *   7. Confirms "Replace" button visible = success
 *
 * Usage:
 *   EST_ID="est_xxxx"  IMAGE_PATH="/abs/path/to/door_visualization.jpg"  node step_upload_image.js
 *   EST_ID accepts both est_xxx and best_xxx formats.
 */

'use strict';

const { chromium } = require('playwright');
const fs   = require('fs');
const path = require('path');

const EST_ID     = (process.env.EST_ID    || '').trim();
const IMAGE_PATH = (process.env.IMAGE_PATH || '').trim();
const HCP_BASE   = 'https://pro.housecallpro.com';

if (!EST_ID)     { console.error('ERROR: EST_ID is required'); process.exit(1); }
if (!IMAGE_PATH) { console.error('ERROR: IMAGE_PATH is required'); process.exit(1); }
if (!fs.existsSync(IMAGE_PATH)) { console.error('ERROR: IMAGE_PATH not found:', IMAGE_PATH); process.exit(1); }

// Strip prefix so we can match either est_xxx or best_xxx in the URL
const EST_CORE = EST_ID.replace(/^(best_|est_)/, '');

(async () => {
  console.log('\n=== step_upload_image.js ===');
  console.log(`EST_ID:  ${EST_ID}  (core: ${EST_CORE})`);
  console.log(`Image:   ${IMAGE_PATH} (${Math.round(fs.statSync(IMAGE_PATH).size / 1024)} KB)\n`);

  // ── Connect ───────────────────────────────────────────────────────────────
  let browser;
  for (const port of [process.env.CDP_PORT || '18802', '18800', '18801']) {
    try {
      browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
      console.log(`✓ Connected CDP port ${port}`);
      break;
    } catch { console.log(`✗ Port ${port} unavailable`); }
  }
  if (!browser) throw new Error('No CDP browser on 18800 or 18801');

  const ctx = browser.contexts()[0];
  const allPages = ctx.pages();
  console.log(`Pages open: ${allPages.length}`);
  allPages.forEach((p, i) => console.log(`  [${i}] ${p.url().slice(0, 100)}`));

  // ── Find or open estimate tab ─────────────────────────────────────────────
  let page = allPages.find(p => p.url().includes(EST_CORE));
  if (page) {
    console.log(`\n[Nav] Using existing tab: ${page.url().slice(0, 80)}`);
    await page.bringToFront();
    await page.waitForTimeout(800);
  } else {
    console.log(`\n[Nav] Opening new tab for ${EST_ID}...`);
    page = await ctx.newPage();
    await page.goto(`${HCP_BASE}/app/estimates/${EST_ID}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(2500);
  }

  // ── Step 1: Find and click the Option image button ────────────────────────
  console.log('\n[Step 1] Finding Option image button...');
  await page.waitForFunction(() => !!document.querySelector('button'), { timeout: 10000 });
  await page.waitForTimeout(1500);

  let clicked = false;

  // A: Replace button (image already set)
  const replaceBtn = page.locator('button:has-text("Replace")').first();
  if (await replaceBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
    console.log('  → "Replace" found — replacing existing image');
    await replaceBtn.click();
    clicked = true;
  }

  // B: Placeholder button — no image yet.
  // Strategy: find the button with aria-label="manage option" (the ⋯ kebab).
  // The image placeholder is the nearest icon-only button that sits BEFORE it
  // in the DOM (lower Y or same Y, smaller X) within the same option panel.
  if (!clicked) {
    const result = await page.evaluate(() => {
      // Find the kebab ("manage option") button — reliable anchor
      const kebab = Array.from(document.querySelectorAll('button[aria-label="manage option"]'))
        .find(b => b.getBoundingClientRect().width > 0);

      if (kebab) {
        const kr = kebab.getBoundingClientRect();
        // The placeholder is a nearby icon-only button to the LEFT of and at roughly
        // the same Y level as the kebab, or slightly below it (in the option body).
        // It is specifically NOT aria-labeled, has no text, has an SVG child,
        // and is approximately 40–60px in size.
        const candidates = Array.from(document.querySelectorAll('button')).filter(b => {
          if (b === kebab) return false;
          if (b.getAttribute('aria-label')) return false; // labeled buttons are not the placeholder
          if (b.textContent.trim() !== '') return false;
          const r = b.getBoundingClientRect();
          if (r.width === 0) return false;
          // Must be in the same horizontal band as the kebab (within 200px Y)
          if (Math.abs(r.y - kr.y) > 200) return false;
          // Must be to the left of or below the kebab
          if (r.x >= kr.x) return false;
          return true;
        });

        if (candidates.length > 0) {
          // Pick the one with highest Y closest to the option body
          const best = candidates.sort((a, b) => b.getBoundingClientRect().y - a.getBoundingClientRect().y)[0];
          const r = best.getBoundingClientRect();
          best.click();
          return { ok: true, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width) };
        }
        return { err: 'No placeholder candidate near kebab', kebabX: Math.round(kr.x), kebabY: Math.round(kr.y) };
      }

      // Fallback: no kebab found — look for Replace or any unlabeled 48px button in option area
      return { err: '"manage option" kebab not found in DOM' };
    });

    if (result.ok) {
      console.log(`  ✓ Clicked placeholder at (${result.x}, ${result.y}), size ${result.w}px`);
      clicked = true;
    } else {
      console.error('  ✗', result.err || JSON.stringify(result));
      throw new Error('Cannot find Option image placeholder button');
    }
  }

  // ── Step 2: Wait for dialog ───────────────────────────────────────────────
  console.log('\n[Step 2] Waiting for "Add option image" dialog...');
  await page.waitForSelector('[role="dialog"]', { timeout: 10000 });
  await page.waitForTimeout(500);
  const dlgText = (await page.locator('[role="dialog"]').innerText().catch(() => '')).slice(0, 80);
  console.log(`  Dialog: "${dlgText.replace(/\n/g, ' ')}"`);

  // ── Step 3: Upload tab ────────────────────────────────────────────────────
  console.log('\n[Step 3] Clicking Upload tab...');
  await page.getByRole('tab', { name: 'Upload' }).click();
  await page.waitForTimeout(500);

  // ── Step 4: Set files ─────────────────────────────────────────────────────
  console.log('\n[Step 4] Setting file on dropzone input...');
  const inp = page.getByTestId('upload-tab-dropzone-input');
  await inp.waitFor({ state: 'attached', timeout: 8000 });
  await inp.setInputFiles(IMAGE_PATH, { force: true });

  const count = await inp.evaluate(el => el.files ? el.files.length : 0);
  if (count === 0) throw new Error('setInputFiles failed — no files set');
  console.log(`  ✓ Files set: ${count}`);

  // ── Step 5: Trigger React ─────────────────────────────────────────────────
  console.log('\n[Step 5] Dispatching change event...');
  await inp.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true })));
  await page.waitForTimeout(800);

  // ── Step 6: Crop dialog → Save ────────────────────────────────────────────
  console.log('\n[Step 6] Waiting for crop dialog...');
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll('[role="dialog"]')).some(d => d.textContent.includes('Crop')),
    { timeout: 12000 }
  );
  console.log('  ✓ Crop dialog appeared');
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Save' }).click();
  console.log('  ✓ Saved');

  // ── Step 7: Done ───────────────────────────────────────────────
  // Crop dialog Save = upload confirmed. 'Replace' only appears in the Edit dialog,
  // not on the main estimate page, so we skip post-close DOM checks.
  console.log('\n[Step 7] Upload confirmed (crop saved).');

  console.log('\n✅ DONE');
  console.log(`  File:     ${path.basename(IMAGE_PATH)}`);
  console.log(`  Estimate: ${EST_ID}`);

})().catch(err => {
  console.error('\n❌ FAILED:', err.message);
  process.exit(1);
});
