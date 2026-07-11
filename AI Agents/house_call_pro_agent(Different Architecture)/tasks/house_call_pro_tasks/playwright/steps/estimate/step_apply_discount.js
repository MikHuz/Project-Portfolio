/**
 * step_apply_discount.js
 * Apply a percentage or fixed discount to an estimate.
 *
 * Finds the discount field on the estimate page and sets it.
 * HCP supports both percentage (%) and fixed ($) discounts.
 *
 * Args (via env):
 *   EST_ID        — estimate ID (est_abc123...)
 *   DISCOUNT      — discount value as a number (e.g. "15" for 15% or "50" for $50)
 *   DISCOUNT_TYPE — "percent" (default) or "fixed"
 *
 * Example:
 *   EST_ID=est_abc DISCOUNT=15 node step_apply_discount.js
 *   EST_ID=est_abc DISCOUNT=50 DISCOUNT_TYPE=fixed node step_apply_discount.js
 *
 * ## Snapshot ref patterns (for browser tool fallback reference)
 *   - Discount section: look for text "Add discount" or a discount row near the subtotal
 *   - The discount area is in the totals section at the bottom of line items, between Subtotal and Total
 *   - "Add discount" is usually a button or link — clicking it reveals the discount input row
 *   - Discount type toggle: two buttons "%" and "$" appear after clicking Add discount
 *   - Discount input: input[type=number] or text input in the discount row
 *   - After entering value, it auto-saves (no Save button) — wait 500ms and verify Total changed
 *   - If discount is already applied, the field may already be visible without needing to click "Add discount"
 */

const { connect, estUrl } = require('../../lib/hcp_helpers');

const EST_ID        = process.env.EST_ID;
const DISCOUNT      = parseFloat(process.env.DISCOUNT);
const DISCOUNT_TYPE = (process.env.DISCOUNT_TYPE || 'percent').toLowerCase(); // 'percent' or 'fixed'

if (!EST_ID || isNaN(DISCOUNT)) {
  console.error('Missing required env vars: EST_ID, DISCOUNT');
  console.error('Optional: DISCOUNT_TYPE=percent|fixed (default: percent)');
  process.exit(1);
}

(async () => {
  // Force connect to HCP tab
  const { chromium } = require('playwright');
  const cdpUrl = process.env.CDP_URL || 'http://127.0.0.1:18801';
  const browser = await chromium.connectOverCDP(cdpUrl);
  const context = browser.contexts()[0];
  let page = context.pages().find(p => p.url().includes('housecallpro.com'));
  if (!page) throw new Error('No HCP tab found in browser');
  await page.bringToFront();

  try {
    console.log(`\n💰 Apply ${DISCOUNT}${DISCOUNT_TYPE === 'percent' ? '%' : '$'} discount to ${EST_ID}`);

    // Navigate to estimate page
    await page.goto(estUrl(EST_ID), { waitUntil: 'domcontentloaded' });

    // Wait for estimate body
    await page.waitForFunction(
      () => Array.from(document.querySelectorAll('h6')).some(h => h.textContent.trim() === 'Line items'),
      { timeout: 10000 }
    ).catch(() => {});
    await page.waitForTimeout(800);

    // Step 1: Click "Add discount" if not already visible
    const discountVisible = await page.evaluate(() => {
      // Check if discount input already exists
      const inputs = Array.from(document.querySelectorAll('input'));
      const discountInput = inputs.find(i => {
        const container = i.closest('[class*="discount"], [class*="Discount"]');
        return !!container;
      });
      if (discountInput) return { alreadyVisible: true };

      // Look for "Add discount" button/link
      const addDiscount = Array.from(document.querySelectorAll('button, a, p, span'))
        .find(el => el.textContent.trim().toLowerCase() === 'add discount');
      if (addDiscount) {
        addDiscount.click();
        return { alreadyVisible: false, clicked: true };
      }

      return { alreadyVisible: false, clicked: false };
    });

    if (!discountVisible.alreadyVisible && discountVisible.clicked) {
      console.log('  ✓ Clicked "Add discount"');
      await page.waitForTimeout(600);
    } else if (!discountVisible.alreadyVisible && !discountVisible.clicked) {
      console.log('  ⚠ "Add discount" button not found — discount area may already be open or UI differs');
    }

    // Step 2: Select discount type (% or $)
    await page.waitForTimeout(400);
    const typeSet = await page.evaluate((discType) => {
      // Look for % and $ toggle buttons near the discount area
      const allButtons = Array.from(document.querySelectorAll('button'));
      const pctBtn = allButtons.find(b => b.textContent.trim() === '%');
      const fixedBtn = allButtons.find(b => b.textContent.trim() === '$');

      if (!pctBtn && !fixedBtn) return { ok: false, reason: 'type toggle buttons not found' };

      if (discType === 'percent' && pctBtn) {
        pctBtn.click();
        return { ok: true, type: 'percent' };
      } else if (discType === 'fixed' && fixedBtn) {
        fixedBtn.click();
        return { ok: true, type: 'fixed' };
      }

      return { ok: true, type: 'default (no toggle found — only one type available)' };
    }, DISCOUNT_TYPE);

    if (typeSet.ok) {
      console.log(`  ✓ Discount type: ${typeSet.type}`);
    } else {
      console.log(`  ⚠ ${typeSet.reason} — proceeding anyway`);
    }
    await page.waitForTimeout(300);

    // Step 3: Find and fill the discount input
    const filled = await page.evaluate((discValue) => {
      // Find input near discount-related text
      const allInputs = Array.from(document.querySelectorAll('input'));

      // Strategy 1: input inside a container with "discount" in class
      let discInput = allInputs.find(i => {
        const container = i.closest('[class*="iscount"]'); // matches discount/Discount
        return !!container;
      });

      // Strategy 2: input that is near "Discount" text (walk siblings)
      if (!discInput) {
        const discLabel = Array.from(document.querySelectorAll('*'))
          .find(el => el.children.length === 0 &&
                      el.textContent.trim().toLowerCase() === 'discount');
        if (discLabel) {
          let container = discLabel.parentElement;
          for (let i = 0; i < 4; i++) {
            discInput = container.querySelector('input');
            if (discInput) break;
            if (container.parentElement) container = container.parentElement;
          }
        }
      }

      // Strategy 3: the last input on the page before the Total row
      if (!discInput) {
        const totalRow = Array.from(document.querySelectorAll('*'))
          .find(el => el.textContent.trim() === 'Total' && el.tagName === 'P');
        if (totalRow) {
          // Find the last input before this element in DOM order
          const allInputsBefore = Array.from(document.querySelectorAll('input'))
            .filter(i => totalRow.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_PRECEDING);
          if (allInputsBefore.length > 0) discInput = allInputsBefore[allInputsBefore.length - 1];
        }
      }

      if (!discInput) {
        return {
          ok: false,
          reason: 'discount input not found',
          inputCount: allInputs.length
        };
      }

      // Clear and set value
      discInput.focus();
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(discInput, discValue.toString());
      discInput.dispatchEvent(new Event('input', { bubbles: true }));
      discInput.dispatchEvent(new Event('change', { bubbles: true }));
      discInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      discInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));

      return { ok: true, inputType: discInput.type, currentValue: discInput.value };
    }, DISCOUNT);

    if (!filled.ok) {
      console.error(`Could not fill discount input: ${filled.reason} (${filled.inputCount} inputs on page)`);
      process.exit(1);
    }

    console.log(`  ✓ Set discount to ${DISCOUNT} (input type: ${filled.inputType})`);
    await page.waitForTimeout(800);

    // Step 4: Tab/blur to trigger save (HCP auto-saves discount on blur)
    await page.evaluate(() => {
      const focused = document.activeElement;
      if (focused) focused.blur();
    });
    await page.waitForTimeout(1000);

    // Step 5: Verify — read Total and check it changed
    const verified = await page.evaluate(() => {
      const paras = Array.from(document.querySelectorAll('p'));
      const totalLabel = paras.find(p => p.textContent.trim() === 'Total');
      if (totalLabel) {
        const totalValue = totalLabel.nextElementSibling;
        return { found: true, total: totalValue?.textContent.trim() };
      }
      return { found: false };
    });

    if (verified.found) {
      console.log(`  ✓ New Total: ${verified.total}`);
    } else {
      console.log('  ⚠ Could not verify total — check estimate manually');
    }

    console.log('\n✅ DONE');
  } catch (err) {
    console.error('\nERROR:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
