/**
 * step_probe2_doorvisions.js — Probe: full PLANKS flow through thermal, see Color step
 */
'use strict';
const { chromium } = require('playwright');
const CDP_URL = process.env.CDP_URL || 'http://127.0.0.1:18800';

async function getState(page) {
  return page.evaluate(() => {
    const active = document.querySelector('.card.step.collapsable.active');
    if (!active) return { heading: '(none active)', cards: [], tabs: [] };
    const heading = active.innerText.split('\n')[0].trim();
    const cards = Array.from(active.querySelectorAll('.linked-card'))
      .map(c => c.innerText.trim().replace(/\s+/g,' ').slice(0,60)).filter(Boolean).slice(0,10);
    const tabs = Array.from(active.querySelectorAll('button, li, [role="tab"]'))
      .map(t => (t.innerText||t.textContent||'').trim().slice(0,40)).filter(Boolean).slice(0,10);
    return { heading, cards, tabs };
  });
}

async function clickCard(page, text) {
  const box = await page.evaluate((text) => {
    const active = document.querySelector('.card.step.collapsable.active') || document;
    const cards = Array.from(active.querySelectorAll('.linked-card'));
    const match = cards.find(c => c.innerText.toUpperCase().replace(/\s+/g,' ').includes(text.toUpperCase()));
    if (!match) return { err: `"${text}" not found. Cards: ${cards.map(c=>c.innerText.trim().slice(0,40)).join(' | ')}` };
    const r = match.getBoundingClientRect();
    return { x: r.x+r.width/2, y: r.y+r.height/2, text: match.innerText.trim().slice(0,40) };
  }, text);
  if (box.err) throw new Error(box.err);
  await page.mouse.click(box.x, box.y);
  console.log(`  → clicked "${box.text}" at (${Math.round(box.x)},${Math.round(box.y)})`);
  await page.waitForTimeout(1200);
}

(async () => {
  const browser = await chromium.connectOverCDP(CDP_URL);
  const ctx = browser.contexts()[0];
  const page = await ctx.newPage();
  try {
    await page.goto('https://doorvisions.chiohd.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2500);
    // Dismiss any modal
    await page.evaluate(() => {
      const modal = document.querySelector('.modal.show, .modal.d-block');
      if (modal) {
        const btn = modal.querySelector('[aria-label="Close"], .close, button:last-child');
        if (btn) btn.click();
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
        modal.classList.remove('show','d-block');
        document.body.classList.remove('modal-open');
      }
    });
    await page.waitForTimeout(400);
    const so = await page.$('button:has-text("START OVER"), span:has-text("START OVER")');
    if (so) { await so.click({ force: true }); await page.waitForTimeout(1000); }

    // Size: 16x7 double
    const icon = await page.$('img[src*="doubleIcon"]');
    await icon.click({ force: true }); await page.waitForTimeout(600);
    const confirmBtn = await page.waitForSelector('button:not([disabled]):has-text("CONFIRM SIZE")', { timeout: 8000 });
    await confirmBtn.click({ force: true }); await page.waitForTimeout(1200);

    // Products: PLANKS
    await clickCard(page, 'PLANKS');

    console.log('\n[STATE] After PLANKS:'); console.log(await getState(page));

    // Design: NO OR SHORT WINDOWS (for NO WINDOWS door)
    await clickCard(page, 'NO OR SHORT WINDOWS');
    console.log('\n[STATE] After Design (NO OR SHORT WINDOWS):'); console.log(await getState(page));

    // Thermal: R-10.29 / Medium Duty  
    await clickCard(page, 'R-10.29');
    console.log('\n[STATE] After Thermal (R-10.29):'); console.log(await getState(page));

    // Wait 2s and check again
    await page.waitForTimeout(2000);
    const state = await getState(page);
    console.log('\n[STATE] 2s after thermal:'); console.log(JSON.stringify(state, null, 2));

    // If color step active, print cards + tabs
    if (state.heading.toUpperCase().includes('COLOR') || state.heading.toUpperCase().includes('COLOUR')) {
      console.log('\n✓ COLOR STEP IS ACTIVE');
      console.log('Cards:', state.cards);
      console.log('Tabs:', state.tabs);
    } else {
      // print full state
      const full = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.card.step')).map(c => ({
          heading: c.innerText.split('\n')[0].trim().slice(0,50),
          isActive: c.classList.contains('active'),
          cards: Array.from(c.querySelectorAll('.linked-card')).map(lc=>lc.innerText.trim().replace(/\s+/g,' ').slice(0,50)).filter(Boolean).slice(0,8),
          tabs: Array.from(c.querySelectorAll('button, [role="tab"]')).map(t=>(t.innerText||t.textContent||'').trim().slice(0,30)).filter(Boolean).slice(0,6),
        }));
      });
      console.log('\nFULL STATE:');
      full.filter(s => s.isActive || s.cards.length > 0).forEach(s => {
        console.log(`  ${s.isActive ? '★' : ' '} "${s.heading}"`);
        if (s.cards.length) console.log(`    cards: ${s.cards.join(' | ')}`);
        if (s.tabs.length)  console.log(`    tabs:  ${s.tabs.join(' | ')}`);
      });
    }

  } finally {
    await page.close().catch(()=>{});
    await browser.close().catch(()=>{});
  }
})().catch(err => { console.error('FAILED:', err.message); process.exit(1); });
