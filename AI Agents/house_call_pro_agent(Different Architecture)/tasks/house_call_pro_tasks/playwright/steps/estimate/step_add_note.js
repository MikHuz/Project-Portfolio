/**
 * step_add_note.js — Add a private note to an estimate
 * 
 * ENV:
 *   EST_ID   — estimate ID (e.g. best_xxx)
 *   NOTE     — note text to add
 */

const { connect, estUrl } = require('../../lib/hcp_helpers');

async function run() {
  const estId = process.env.EST_ID;
  const noteText = process.env.NOTE;
  
  if (!estId || !noteText) {
    console.error('EST_ID and NOTE are required');
    process.exit(1);
  }

  const { browser, page } = await connect();
  
  try {
    // Navigate to estimate
    const url = estUrl(estId);
    const currentUrl = page.url();
    if (!currentUrl.includes(estId)) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
    }
    
    console.log('On estimate page:', page.url());
    
    // Scroll to find Private notes section
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(500);
    
    // Find the "Private notes" paragraph and click the + button next to it
    const addNoteBtn = await page.evaluate(() => {
      const paragraphs = document.querySelectorAll('p');
      for (const p of paragraphs) {
        if (p.textContent.trim() === 'Private notes') {
          const container = p.closest('div');
          if (container) {
            // Look for buttons in the container
            const buttons = container.querySelectorAll('button');
            for (const btn of buttons) {
              const rect = btn.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0 && rect.top > 0) {
                return { left: rect.left, top: rect.top, width: rect.width, height: rect.height, title: btn.title || btn.textContent.trim() };
              }
            }
          }
        }
      }
      return null;
    });
    
    console.log('Add note button info:', JSON.stringify(addNoteBtn));
    
    if (addNoteBtn) {
      // Click the first button in the private notes container
      await page.mouse.click(addNoteBtn.left + addNoteBtn.width / 2, addNoteBtn.top + addNoteBtn.height / 2);
      await page.waitForTimeout(500);
    } else {
      console.log('Could not find private notes section, trying coordinate click');
      // Try clicking where the + button should be
      await page.mouse.click(300, 400);
      await page.waitForTimeout(500);
    }
    
    // Look for a textarea or input that appeared
    const noteInput = await page.$('textarea[placeholder], input[placeholder="New note"]');
    if (noteInput) {
      console.log('Found note input');
      await noteInput.fill(noteText);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      console.log('Note added successfully');
    } else {
      // Try finding any newly appeared input
      const inputs = await page.$$('textarea, input[type="text"]');
      console.log('Found inputs:', inputs.length);
      if (inputs.length > 0) {
        // Click the last one (most recently added)
        const lastInput = inputs[inputs.length - 1];
        await lastInput.fill(noteText);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);
        console.log('Note added via last input');
      } else {
        console.log('ERROR: Could not find note input field');
      }
    }
  } finally {
    await browser.close();
  }
}

run().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
