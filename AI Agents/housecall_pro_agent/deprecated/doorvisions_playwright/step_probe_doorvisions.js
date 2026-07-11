/**
 * step_probe_doorvisions.js — Debug: probe DoorVisions wizard state after PLANKS
 * 
 * Navigates through the wizard up to PLANKS, then waits and prints
 * active step state at each stage so we can see what step names DoorVisions uses.
 */

'use strict';

const { chromium } = require('playwright');
const CDP_URL = process.env.CDP_URL || 'http://127.0.0.1:18800';

async function getActiveStep(page) {
  return page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.card.step'));
    return cards.map(c => {
      const heading = c.innerText.split('\n')[0].trim().slice(0, 60);
      const isActive = c.classList.contains('active');
      const linkedCards = Array.from(c.querySelectorAll('.linked-card'))
        .map(lc => lc.innerText.trim().slice(0, 40))
        .filter(Boolean)
        .slice(0, 10);
      const tabs = Array.from(c.querySelectorAll('button, li, [role="tab"]'))
        .map(t => (t.innerText || t.textContent || '').trim().slice(0, 30))
        .filter(Boolean)
        .slice(0, 8);
      return { heading, isActive, linkedCards, tabs };
    });
  });
}

(async () => {
  const browser = await chromium.connectOverCDP(CDP_URL);
  const context = browser.contexts()[0];
  const page = await context.newPage();

  try {
    await page.goto('https://doorvisions.chiohd.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Start over
    const startOver = await page.$('button:has-text("START OVER"), span:has-text("START OVER"), a:has-text("START OVER")');
    if (startOver) { await startOver.click({ force: true }); await page.waitForTimeout(1000); }

    // Dismiss modal
    await page.evaluate(() => {
      const modal = document.querySelector('.modal.show, .modal.d-block');
      if (modal) {
        const closeBtn = modal.querySelector('[aria-label="Close"], .close, button.btn-secondary, button:last-child');
        if (closeBtn) closeBtn.click();
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
        modal.classList.remove('show', 'd-block');
        document.body.classList.remove('modal-open');
      }
    });
    await page.waitForTimeout(500);

    console.log('\n=== STATE 0: Initial ===');
    console.log(JSON.stringify(await getActiveStep(page), null, 2));

    // Select 16x7 (double)
    const icon = await page.$('img[src*="doubleIcon"]');
    if (icon) { await icon.click({ force: true }); await page.waitForTimeout(600); }
    const confirmBtn = await page.waitForSelector('button:not([disabled]):has-text("CONFIRM SIZE")', { timeout: 8000 }).catch(() => null);
    if (confirmBtn) { await confirmBtn.click({ force: true }); await page.waitForTimeout(1200); }

    console.log('\n=== STATE 1: After Size Confirmed ===');
    console.log(JSON.stringify(await getActiveStep(page), null, 2));

    // Click PLANKS
    const steps = await getActiveStep(page);
    const activeCard = steps.find(s => s.isActive);
    if (activeCard) {
      console.log(`\nActive step: "${activeCard.heading}"`);
      console.log(`Cards: ${activeCard.linkedCards.join(' | ')}`);
    }

    // Find and click PLANKS
    const clicked = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.linked-card'));
      const planks = cards.find(c => c.innerText.toUpperCase().includes('PLANKS'));
      if (planks) {
        const r = planks.getBoundingClientRect();
        return { x: r.x + r.width/2, y: r.y + r.height/2, text: planks.innerText.trim() };
      }
      return null;
    });

    if (clicked) {
      await page.mouse.click(clicked.x, clicked.y);
      console.log(`  → clicked PLANKS at (${Math.round(clicked.x)},${Math.round(clicked.y)})`);
      await page.waitForTimeout(1500);
    }

    console.log('\n=== STATE 2: After PLANKS clicked ===');
    const state2 = await getActiveStep(page);
    console.log(JSON.stringify(state2, null, 2));

    // Wait 3 more seconds and check again
    await page.waitForTimeout(3000);
    console.log('\n=== STATE 3: 3s after PLANKS ===');
    const state3 = await getActiveStep(page);
    console.log(JSON.stringify(state3, null, 2));

    // Try clicking whatever the active card is
    const activeNow = state3.find(s => s.isActive);
    if (activeNow) {
      console.log(`\nActive now: "${activeNow.heading}"`);
      console.log(`Linked cards: ${activeNow.linkedCards.join(' | ')}`);
      console.log(`Tabs: ${activeNow.tabs.join(' | ')}`);

      // If there are linked cards, click the first one and see what happens
      if (activeNow.linkedCards.length > 0) {
        const firstCard = await page.evaluate((heading) => {
          const steps = Array.from(document.querySelectorAll('.card.step.collapsable.active'));
          const root = steps[0] || document;
          const lc = root.querySelector('.linked-card');
          if (!lc) return null;
          const r = lc.getBoundingClientRect();
          return { x: r.x + r.width/2, y: r.y + r.height/2, text: lc.innerText.trim().slice(0,40) };
        }, activeNow.heading);

        if (firstCard) {
          await page.mouse.click(firstCard.x, firstCard.y);
          console.log(`  → clicked first card: "${firstCard.text}"`);
          await page.waitForTimeout(1500);

          console.log('\n=== STATE 4: After clicking first card ===');
          const state4 = await getActiveStep(page);
          console.log(JSON.stringify(state4, null, 2));
        }
      }
    }

  } finally {
    await page.close().catch(() => {});
    await browser.disconnect().catch(() => {});
  }
})().catch(err => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
