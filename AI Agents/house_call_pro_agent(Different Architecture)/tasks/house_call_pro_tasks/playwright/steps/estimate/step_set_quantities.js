/**
 * step_set_quantities.js
 * 
 * Sets quantities on existing line items in an estimate.
 * Also removes duplicate service items.
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

(async () => {
  const { browser, page } = await connect();
  
  try {
    await page.goto(estUrl(EST_ID), { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    console.log('On estimate page:', page.url());
    
    // Wait for line items to render
    await page.waitForFunction(
      () => document.querySelectorAll('h6').length > 5,
      { timeout: 10000 }
    ).catch(() => {});
    await page.waitForTimeout(500);
    
    // Get all h6 line item names and count duplicates
    const allH6 = await page.evaluate(() => 
      Array.from(document.querySelectorAll('h6')).map(h => h.textContent.trim())
    );
    console.log('All h6 elements:', allH6);
    
    // Items that should have qty=2 (single line, qty set)
    const QTY2_ITEMS = [
      'Copy of Warranties',
      'Standard One Car Garage Door Installation',
      'One Car Tilt-up to Sectional Door Opening Conversion',
      "8'0\"x7'0\" 4250 Long Panel/White/Non-insulated",
      'Solid Color Decorative Perimeter Seal',
      "7'0'' Low Headroom Track"
    ];
    
    // For each target item, find duplicate h6 elements and remove extras
    for (const itemName of QTY2_ITEMS) {
      const matchingH6s = await page.$$eval('h6', (els, name) => 
        els.filter(el => el.textContent.trim() === name).length,
        itemName
      );
      
      console.log(`Item "${itemName.substring(0, 40)}..." has ${matchingH6s} occurrences`);
      
      if (matchingH6s > 1) {
        // Delete the extra ones (all but first)
        for (let i = 1; i < matchingH6s; i++) {
          const deleted = await page.evaluate((name) => {
            const h6s = Array.from(document.querySelectorAll('h6')).filter(h => h.textContent.trim() === name);
            if (h6s.length > 1) {
              // Find the container row for the last occurrence
              const lastH6 = h6s[h6s.length - 1];
              const row = lastH6.closest('li, tr, [data-testid], div.MuiListItem-root');
              if (row) {
                // Find an X/delete button
                const deleteBtn = row.querySelector('button[aria-label*="delete"], button[aria-label*="remove"], button[aria-label*="Delete"], button[aria-label*="Remove"]');
                if (deleteBtn) {
                  deleteBtn.click();
                  return 'clicked aria-label delete btn';
                }
                // Look for × button (MUI icon button with SVG inside)
                const allBtns = row.querySelectorAll('button');
                for (const btn of allBtns) {
                  if (btn.innerHTML.includes('M19') || btn.innerHTML.includes('Close') || btn.title === 'Delete' || btn.title === 'Remove') {
                    btn.click();
                    return 'clicked SVG/title delete btn';
                  }
                }
              }
              // Fall back: look for the × (close) button near the h6
              const parent = lastH6.parentElement?.parentElement;
              if (parent) {
                const closeBtns = parent.querySelectorAll('button');
                if (closeBtns.length > 0) {
                  // Click the last button (often the X)
                  closeBtns[closeBtns.length - 1].click();
                  return 'clicked last btn in parent';
                }
              }
              return 'no delete button found';
            }
            return 'no duplicate found';
          }, itemName);
          
          console.log(`  Delete result: ${deleted}`);
          await page.waitForTimeout(500);
          
          // Check for confirmation dialogs
          const confirmBtn = await page.$('button:has-text("Confirm"), button:has-text("Delete"), button:has-text("Remove"), button:has-text("Yes")');
          if (confirmBtn) {
            await confirmBtn.click();
            await page.waitForTimeout(500);
            console.log('  Confirmed deletion');
          }
        }
      }
      
      // Now set qty=2 on the remaining item
      await page.waitForTimeout(300);
      
      // Find and update the quantity input
      const qtySet = await page.evaluate((name) => {
        const h6s = Array.from(document.querySelectorAll('h6')).filter(h => h.textContent.trim() === name);
        if (h6s.length === 0) return 'item not found';
        
        const h6 = h6s[0];
        // Look for quantity input in the row/container
        let container = h6.closest('li') || h6.closest('tr') || h6.parentElement?.parentElement?.parentElement;
        if (!container) return 'no container';
        
        // Look for input with current value near "Quantity"
        const inputs = container.querySelectorAll('input');
        for (const inp of inputs) {
          const label = inp.closest('div')?.previousElementSibling;
          if (label && (label.textContent.includes('Quantity') || inp.value === '1')) {
            inp.value = '2';
            inp.dispatchEvent(new Event('input', { bubbles: true }));
            inp.dispatchEvent(new Event('change', { bubbles: true }));
            return `set input value to 2 (was ${inp.value})`;
          }
        }
        
        // Alternative: look for a qty button/display
        const qtyBtns = container.querySelectorAll('button');
        return `found ${qtyBtns.length} buttons, ${inputs.length} inputs`;
      }, itemName);
      
      console.log(`  Qty set result for "${itemName.substring(0, 40)}": ${qtySet}`);
    }
    
    await page.waitForTimeout(1000);
    console.log('\nDONE');
    
  } finally {
    await browser.close();
  }
})().catch(e => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
