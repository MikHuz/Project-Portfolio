/**
 * set_qty.js — one-shot: set qty=2 on specific line items
 */
const { chromium } = require('playwright');

const EST_ID = process.env.EST_ID;
const ITEMS = [
  'Standard One Car Garage Door Installation',
  'One Car Tilt-up to Sectional Door Opening',
  '4250 Long Panel/White/Non-insulated',
  'Solid Color Decorative Perimeter Seal',
  "7'0'' Low Headroom Track"
];

const SKIP = new Set(['Home','Dash','Inbox','Schedule','Customers','Pipeline','Payroll','Reporting','Marketing','Price book','Customer','Tasks','Summary of work','Line items','Cost breakdown','Total cost','Profit/Loss','Attachments','Tags','Chats','AI Team','Support','Alex S','Fields','Private notes','Lead source','Roman H','Estimate for Meg Titchener']);

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:18800');
  const context = browser.contexts()[0];
  const page = context.pages().find(p => p.url().includes('housecallpro.com'));

  if (!page.url().includes(EST_ID)) {
    await page.goto('https://pro.housecallpro.com/app/estimates/' + EST_ID, { waitUntil: 'domcontentloaded' });
  }
  // Wait for line items to render
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll('h6')).some(h => h.textContent.includes('Standard One Car')),
    { timeout: 10000 }
  ).catch(() => {});
  await page.waitForTimeout(500);

  for (const frag of ITEMS) {
    console.log('→ qty=2 for:', frag);

    const result = await page.evaluate(({ frag, skipArr }) => {
      const skip = new Set(skipArr);
      const h6s = Array.from(document.querySelectorAll('h6')).filter(h => {
        const t = h.textContent.trim();
        return t && !skip.has(t) && !t.startsWith('Estimate #');
      });
      const target = h6s.find(h => h.textContent.includes(frag));
      if (!target) return { ok: false, msg: 'h6 not found' };
      target.scrollIntoView({ block: 'center', behavior: 'instant' });
      const rect = target.getBoundingClientRect();
      const allBtns = Array.from(document.querySelectorAll('button'));
      const editBtn = allBtns.find(b => {
        const br = b.getBoundingClientRect();
        const svgCls = (b.querySelector('svg') || {}).className;
        const clsStr = svgCls ? (svgCls.baseVal || svgCls || '') : '';
        return Math.abs((br.top + br.height / 2) - (rect.top + rect.height / 2)) < 80 &&
               br.left > 850 && clsStr.includes('colorPrimary');
      });
      if (!editBtn) return { ok: false, msg: 'edit btn not found' };
      editBtn.click();
      return { ok: true };
    }, { frag, skipArr: [...SKIP] });

    if (!result.ok) {
      console.log('  SKIP:', result.msg);
      continue;
    }

    try {
      await page.waitForSelector('[role=dialog]', { timeout: 5000 });
      await page.waitForTimeout(600);

      // Find qty input — first numeric input in dialog
      const inputs = await page.$$('[role=dialog] input');
      let qtyInput = null;
      for (const inp of inputs) {
        const val = await inp.inputValue().catch(() => '');
        if (/^\d+(\.\d*)?$/.test(val.trim())) { qtyInput = inp; break; }
      }

      if (!qtyInput) {
        console.log('  qty input not found — cancelling');
        await page.click('button:has-text("Cancel")').catch(() => {});
        await page.waitForTimeout(500);
        continue;
      }

      await qtyInput.click({ clickCount: 3 });
      await qtyInput.fill('2');
      await page.waitForTimeout(300);

      const saveBtn = page.locator('[role=dialog] button:has-text("Save")').first();
      await saveBtn.click();
      console.log('  ✓ saved');
      await page.waitForTimeout(800);

    } catch (err) {
      console.error('  ERROR:', err.message);
      await page.click('button:has-text("Cancel")').catch(() => {});
      await page.waitForTimeout(500);
    }
  }

  console.log('\nDONE');
  await browser.close();
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
