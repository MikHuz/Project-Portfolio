/**
 * step_set_quantity.js
 * Set the quantity of an existing line item on an estimate.
 *
 * Finds the line item by name fragment on the estimate page, clicks its
 * edit (pencil) button, updates the quantity field, and saves.
 *
 * Args (via env):
 *   EST_ID    — estimate ID (est_abc123...)
 *   ITEM      — name fragment of the line item to update (case-insensitive)
 *   QTY       — new quantity (integer, e.g. "2")
 *
 * Example:
 *   EST_ID=est_abc ITEM="Standard One Car" QTY=2 node step_set_quantity.js
 *   EST_ID=est_abc ITEM="Copy of Warranties" QTY=2 node step_set_quantity.js
 *
 * ## Snapshot ref patterns (for browser tool fallback reference)
 *   - Line item heading: h6 containing the item name
 *   - Edit button: small pencil icon button immediately BEFORE the delete (X) button in the same row group
 *   - After clicking edit, a dialog opens with fields: "Item name", "Description", "Quantity", "Unit price"
 *   - Quantity input: input[type=number] or input with label "Quantity" inside [role=dialog]
 *   - Save button: button:has-text("Save") inside [role=dialog]
 *   - The edit button is NOT the team-assign button (e64-style) — that one has aria-label containing "team" or "assign"
 *   - Safe approach: find all buttons in the line item container, filter out aria-label="delete" and team buttons,
 *     the remaining one is the edit/pencil button
 */

const { connect, estUrl } = require('../../lib/hcp_helpers');

const EST_ID = process.env.EST_ID;
const ITEM   = process.env.ITEM;
const QTY    = parseInt(process.env.QTY, 10);

if (!EST_ID || !ITEM || !QTY || isNaN(QTY)) {
  console.error('Missing required env vars: EST_ID, ITEM, QTY');
  process.exit(1);
}

(async () => {
  // Force connect to HCP tab, not whatever tab happens to be first
  const { chromium } = require('playwright');
  const cdpUrl = process.env.CDP_URL || 'http://127.0.0.1:18801';
  const browser = await chromium.connectOverCDP(cdpUrl);
  const context = browser.contexts()[0];
  let page = context.pages().find(p => p.url().includes('housecallpro.com'));
  if (!page) throw new Error('No HCP tab found in browser');
  // Navigate to the estimate page
  await page.bringToFront();

  try {
    console.log(`\n🔢 Set quantity for "${ITEM}" → ${QTY} on ${EST_ID}`);

    // Navigate to estimate page
    const { estUrl: estUrlFn } = require('../../lib/hcp_helpers');
    await page.goto(estUrlFn(EST_ID), { waitUntil: 'domcontentloaded' });

    // Wait for line items section heading
    await page.waitForFunction(
      () => Array.from(document.querySelectorAll('h6')).some(h => h.textContent.trim() === 'Line items'),
      { timeout: 10000 }
    ).catch(() => {});
    // Scroll to render all line items (they may be below the fold)
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(1000);

    // Find the line item container by h6 text match, then click its edit button
    const found = await page.evaluate((itemFrag) => {
      const headers = Array.from(document.querySelectorAll('h6'));
      const h = headers.find(el => el.textContent.toLowerCase().includes(itemFrag.toLowerCase()));
      if (!h) {
        return {
          ok: false,
          available: headers.map(h => h.textContent.trim()).filter(t => t.length > 2)
        };
      }

      // Walk up to find the container that holds the edit button
      // Confirmed: edit pair is at level 6 above the h6 (MuiIconButton-colorPrimary + colorError)
      let container = h.parentElement;
      for (let i = 0; i < 10; i++) {
        const buttons = Array.from(container.querySelectorAll('button'));
        // Filter out: team/assign buttons (have SVG with people icon), delete buttons
        // Edit button is typically the first button that isn't a destructive/team action
        const editBtn = buttons.find(b => {
          // Edit button = MuiIconButton-colorPrimary (blue pencil)
          // Delete button = MuiIconButton-colorError (red X)
          const cls = b.className || '';
          if (cls.includes('colorError')) return false;
          if (!cls.includes('colorPrimary')) return false;
          const r = b.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return false;
          return true;
        });

        if (editBtn) {
          editBtn.click();
          return { ok: true, buttonText: editBtn.textContent.trim(), itemText: h.textContent.trim() };
        }
        if (container.parentElement) container = container.parentElement;
      }
      return { ok: false, reason: 'edit button not found in container', itemText: h.textContent.trim() };
    }, ITEM);

    if (!found.ok) {
      if (found.available) {
        console.error(`Item "${ITEM}" not found. Available h6 items:\n${found.available.map(i => `  - ${i}`).join('\n')}`);
      } else {
        console.error(`Could not click edit for "${ITEM}": ${found.reason} (item text: "${found.itemText}")`);
      }
      process.exit(1);
    }

    console.log(`  ✓ Clicked edit on "${found.itemText}"`);
    await page.waitForTimeout(600);

    // Wait for edit dialog
    await page.waitForSelector('[role=dialog]', { timeout: 8000 });
    await page.waitForTimeout(400);

    // Find and fill the quantity input
    const filled = await page.evaluate((qty) => {
      const dialog = document.querySelector('[role=dialog]');
      if (!dialog) return { ok: false, reason: 'no dialog found' };

      // Try: input with label "Quantity", or input[type=number], or input near text "Quantity"
      const inputs = Array.from(dialog.querySelectorAll('input'));
      
      // Find by nearby label text
      let qtyInput = null;
      for (const input of inputs) {
        // Check sibling/parent label
        const label = input.closest('label') || input.previousElementSibling || 
                      input.parentElement?.previousElementSibling;
        const labelText = (label?.textContent || '').toLowerCase();
        if (labelText.includes('quantity') || labelText.includes('qty')) {
          qtyInput = input;
          break;
        }
      }

      // Fallback: find input with type=number
      if (!qtyInput) {
        qtyInput = inputs.find(i => i.type === 'number');
      }

      // Fallback: second input (first is usually item name)
      if (!qtyInput && inputs.length >= 2) {
        qtyInput = inputs[1];
      }

      if (!qtyInput) {
        return {
          ok: false,
          reason: 'quantity input not found',
          inputs: inputs.map(i => ({ type: i.type, placeholder: i.placeholder, value: i.value }))
        };
      }

      // Set value via React-compatible approach
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(qtyInput, qty.toString());
      qtyInput.dispatchEvent(new Event('input', { bubbles: true }));
      qtyInput.dispatchEvent(new Event('change', { bubbles: true }));

      return { ok: true, oldValue: qtyInput.defaultValue };
    }, QTY);

    if (!filled.ok) {
      console.error(`Could not set quantity: ${filled.reason}`);
      if (filled.inputs) console.error('Inputs found:', JSON.stringify(filled.inputs));
      process.exit(1);
    }

    console.log(`  ✓ Set quantity to ${QTY} (was: ${filled.oldValue})`);
    await page.waitForTimeout(400);

    // Click Save
    const saved = await page.evaluate(() => {
      const dialog = document.querySelector('[role=dialog]');
      if (!dialog) return { ok: false };
      const saveBtn = Array.from(dialog.querySelectorAll('button')).find(b =>
        b.textContent.trim().toLowerCase() === 'save'
      );
      if (!saveBtn) {
        return {
          ok: false,
          buttons: Array.from(dialog.querySelectorAll('button')).map(b => b.textContent.trim())
        };
      }
      saveBtn.click();
      return { ok: true };
    });

    if (!saved.ok) {
      console.error('Save button not found. Buttons in dialog:', saved.buttons?.join(', '));
      process.exit(1);
    }

    console.log(`  ✓ Saved`);
    await page.waitForTimeout(800);

    // Confirm by reading back
    await page.goto(estUrl(EST_ID), { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const confirmed = await page.evaluate((itemFrag) => {
      const headers = Array.from(document.querySelectorAll('h6'));
      const h = headers.find(el => el.textContent.toLowerCase().includes(itemFrag.toLowerCase()));
      if (!h) return { found: false };
      // Find "Quantity" paragraph near this h6
      let container = h.parentElement;
      for (let i = 0; i < 5; i++) {
        const paras = Array.from(container.querySelectorAll('p'));
        const qtyLabel = paras.find(p => p.textContent.trim() === 'Quantity');
        if (qtyLabel) {
          const qtyValue = qtyLabel.nextElementSibling;
          return { found: true, qty: qtyValue?.textContent.trim() };
        }
        if (container.parentElement) container = container.parentElement;
      }
      return { found: true, qty: 'unknown' };
    }, ITEM);

    if (confirmed.found) {
      console.log(`  ✓ Confirmed quantity = ${confirmed.qty}`);
    }

    console.log('\n✅ DONE');
  } catch (err) {
    console.error('\nERROR:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
