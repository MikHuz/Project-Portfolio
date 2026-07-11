/**
 * step_fix_quantities.js
 * 
 * Removes duplicate service lines and sets qty=2 on items that need it.
 * 
 * ENV:
 *   EST_ID — estimate ID
 */

const { connect, estUrl } = require('../../lib/hcp_helpers');

const EST_ID = process.env.EST_ID;

if (!EST_ID) {
  console.error('EST_ID required');
  process.exit(1);
}

// Items that need qty=2 (single line)
const QTY2_SERVICE_NAMES = [
  'Copy of Warranties',
  'Standard One Car Garage Door Installation',
  'One Car Tilt-up to Sectional Door Opening Conversion'
];

const QTY2_MATERIAL_NAMES = [
  "8'0\"x7'0\" 4250 Long Panel/White/Non-insulated",
  'Solid Color Decorative Perimeter Seal',
  "7'0'' Low Headroom Track"
];

async function scrollAndLoad(page) {
  // Scroll down slowly to trigger rendering of all items
  for (let i = 0; i < 15; i++) {
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(500);
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

async function getItemCount(page, name) {
  return page.evaluate((n) => 
    Array.from(document.querySelectorAll('h6')).filter(h => h.textContent.trim() === n).length,
    name
  );
}

async function deleteLastDuplicate(page, name) {
  const deleted = await page.evaluate((name) => {
    const h6s = Array.from(document.querySelectorAll('h6')).filter(h => h.textContent.trim() === name);
    if (h6s.length <= 1) return 'only one, skip';
    
    // Get the last h6 (the duplicate to delete)
    const lastH6 = h6s[h6s.length - 1];
    const rect = lastH6.getBoundingClientRect();
    
    // Walk up to find a container that has an X button to the right
    let node = lastH6;
    for (let i = 0; i < 15; i++) {
      node = node.parentElement;
      if (!node) break;
      
      const btns = Array.from(node.querySelectorAll('button'));
      for (const btn of btns) {
        const btnRect = btn.getBoundingClientRect();
        // X button should be to the right (x > 900) and near the h6 vertically
        if (btnRect.left > 900 && Math.abs(btnRect.top - rect.top) < 300 && btnRect.width > 0) {
          // Check for SVG (icon button) - typical delete button
          if (btn.querySelector('svg') || btn.innerHTML.includes('svg') || btn.innerHTML.includes('path')) {
            // Make sure it's not the pencil/edit button (pencil would be further left)
            // Usually X is the rightmost button
            btn.click();
            return `clicked btn at left=${btnRect.left} top=${btnRect.top}`;
          }
        }
      }
    }
    return 'no delete btn found';
  }, name);
  
  return deleted;
}

async function setQuantity(page, name, qty, isService) {
  const result = await page.evaluate(({ name, qty }) => {
    const h6s = Array.from(document.querySelectorAll('h6')).filter(h => h.textContent.trim() === name);
    if (h6s.length === 0) return 'item not found';
    
    const h6 = h6s[0];
    const h6rect = h6.getBoundingClientRect();
    
    // Walk up to find the container
    let node = h6;
    for (let i = 0; i < 10; i++) {
      node = node.parentElement;
      if (!node) break;
      
      // Look for the pencil/edit button (leftmost action button)
      const btns = Array.from(node.querySelectorAll('button'));
      const actionBtns = btns.filter(b => {
        const r = b.getBoundingClientRect();
        return r.left > 900 && r.left < 985 && Math.abs(r.top - h6rect.top) < 200 && r.width > 0;
      });
      
      if (actionBtns.length >= 1) {
        // First button (leftmost) should be the pencil
        actionBtns[0].click();
        return `clicked pencil btn at left=${actionBtns[0].getBoundingClientRect().left}`;
      }
    }
    return 'no edit btn found';
  }, { name, qty });
  
  return result;
}

(async () => {
  const { browser, page } = await connect();
  
  try {
    await page.goto(estUrl(EST_ID), { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    await scrollAndLoad(page);
    
    // ── Step 1: Delete duplicate service items ──────────────────────────────
    console.log('\n📋 Checking for duplicates...');
    
    for (const name of QTY2_SERVICE_NAMES) {
      let count = await getItemCount(page, name);
      console.log(`  "${name.substring(0, 45)}" count: ${count}`);
      
      while (count > 1) {
        console.log(`  → Deleting duplicate...`);
        const r = await deleteLastDuplicate(page, name);
        console.log(`    Result: ${r}`);
        await page.waitForTimeout(800);
        
        // Handle confirm dialog if it appears
        const confirmDialogText = await page.evaluate(() => {
          const dialog = document.querySelector('[role=dialog]');
          return dialog ? dialog.textContent.trim().substring(0, 100) : null;
        });
        
        if (confirmDialogText && confirmDialogText.includes('Delete')) {
          console.log('    Confirming deletion...');
          await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('[role=dialog] button'));
            const deleteBtn = btns.find(b => b.textContent.trim() === 'Delete');
            if (deleteBtn) deleteBtn.click();
          });
          await page.waitForTimeout(800);
        }
        
        count = await getItemCount(page, name);
        console.log(`    → New count: ${count}`);
      }
    }
    
    // ── Step 2: Set quantities ──────────────────────────────────────────────
    console.log('\n📏 Setting quantities...');
    
    await scrollAndLoad(page);
    
    const allQty2 = [...QTY2_SERVICE_NAMES, ...QTY2_MATERIAL_NAMES];
    
    for (const name of allQty2) {
      console.log(`  Setting qty=2 for: "${name.substring(0, 45)}"`);
      
      const r = await setQuantity(page, name, 2, QTY2_SERVICE_NAMES.includes(name));
      console.log(`    Click result: ${r}`);
      await page.waitForTimeout(500);
      
      // Look for qty input in a dialog or inline
      const qtyInputResult = await page.evaluate((qty) => {
        // Check for a modal dialog with quantity field
        const dialog = document.querySelector('[role=dialog]');
        if (dialog) {
          const inputs = dialog.querySelectorAll('input');
          for (const inp of inputs) {
            const label = inp.parentElement?.textContent?.toLowerCase();
            if (label?.includes('quantity') || inp.value === '1') {
              const oldVal = inp.value;
              inp.value = String(qty);
              inp.dispatchEvent(new Event('input', { bubbles: true }));
              inp.dispatchEvent(new Event('change', { bubbles: true }));
              return `dialog: set ${oldVal} → ${qty}`;
            }
          }
          return 'dialog open but no qty input found: ' + dialog.textContent.substring(0, 100);
        }
        
        // Check for inline editable quantity
        const allInputs = document.querySelectorAll('input');
        for (const inp of allInputs) {
          if (inp.value === '1' && inp.getBoundingClientRect().width > 0) {
            const r = inp.getBoundingClientRect();
            if (r.left > 600 && r.left < 800) { // qty input is in the middle area
              inp.value = String(qty);
              inp.dispatchEvent(new Event('input', { bubbles: true }));
              inp.dispatchEvent(new Event('change', { bubbles: true }));
              return `inline: set at left=${r.left}`;
            }
          }
        }
        
        return 'no qty input found';
      }, 2);
      
      console.log(`    Qty input result: ${qtyInputResult}`);
      await page.waitForTimeout(300);
      
      // If a modal opened, try to save it
      const savedDialog = await page.evaluate(() => {
        const dialog = document.querySelector('[role=dialog]');
        if (dialog) {
          const saveBtn = Array.from(dialog.querySelectorAll('button')).find(b => 
            b.textContent.trim() === 'Save' || b.textContent.trim() === 'Update' || 
            b.textContent.trim() === 'OK' || b.textContent.trim() === 'Confirm'
          );
          if (saveBtn) {
            saveBtn.click();
            return 'clicked save btn: ' + saveBtn.textContent.trim();
          }
          return 'dialog present, no save btn found. Btns: ' + Array.from(dialog.querySelectorAll('button')).map(b => b.textContent.trim()).join(', ');
        }
        return 'no dialog';
      });
      
      console.log(`    Save result: ${savedDialog}`);
      await page.waitForTimeout(500);
    }
    
    // ── Verify final state ──────────────────────────────────────────────────
    console.log('\n✅ Final state:');
    await scrollAndLoad(page);
    
    const finalItems = await page.evaluate(() => {
      const SKIP = new Set(['Home','Dash','Inbox','Schedule','Customers','Pipeline','Payroll','Reporting','Marketing','Price book','Customer','Tasks','Summary of work','Line items','Cost breakdown','Total cost','Profit/Loss','Attachments','Tags','Chats','AI Team','Support','Alex S','Fields','Private notes','Estimate for Meg Titchener','Roman H','Lead source']);
      return Array.from(document.querySelectorAll('h6'))
        .map(h => ({name: h.textContent.trim(), qty: (() => {
          // Find quantity in nearby paragraphs
          let node = h;
          for (let i = 0; i < 5; i++) {
            node = node.parentElement;
            if (!node) break;
            const ps = Array.from(node.querySelectorAll('p'));
            const qtyLabel = ps.findIndex(p => p.textContent.trim() === 'Quantity');
            if (qtyLabel >= 0 && ps[qtyLabel + 1]) {
              return ps[qtyLabel + 1].textContent.trim();
            }
          }
          return '?';
        })()}))
        .filter(i => i.name && !SKIP.has(i.name));
    });
    
    finalItems.forEach(i => console.log(`  - ${i.name.substring(0, 60)}: qty=${i.qty}`));
    
    console.log('\nDONE');
    
  } finally {
    await browser.close();
  }
})().catch(e => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
