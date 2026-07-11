const { chromium } = require('playwright');

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://127.0.0.1:18802');
    const context = browser.contexts()[0];
    let page = context.pages().find(p => p.url().includes('housecallpro.com'));
    if (!page) {
      page = await context.newPage();
      await page.goto('https://pro.housecallpro.com/app/estimates/est_da5b2aae88a34f10b9cab935df345e3a', {waitUntil: 'domcontentloaded'});
    } else {
      await page.goto('https://pro.housecallpro.com/app/estimates/est_da5b2aae88a34f10b9cab935df345e3a', {waitUntil: 'domcontentloaded'});
    }
    
    await page.waitForTimeout(3000);
    
    // Find Edit buttons with aria-label="Edit" and click the one at x > 900
    const result = await page.evaluate(() => {
      const editBtns = Array.from(document.querySelectorAll('button[aria-label="Edit"]'));
      const target = editBtns.find(b => b.getBoundingClientRect().x > 900);
      if (target) {
        target.click();
        return 'clicked edit btn at x=' + target.getBoundingClientRect().x;
      }
      return 'no btn found, total: ' + editBtns.length;
    });
    console.log('Click result:', result);
    
    await page.waitForTimeout(1000);
    
    // Check if dialog opened
    const dialogOpen = await page.evaluate(() => {
      return document.querySelector('[role=dialog]') ? true : false;
    });
    console.log('Dialog open:', dialogOpen);
    
    if (dialogOpen) {
      // Find and fill the Option name input
      const fillResult = await page.evaluate(() => {
        const dialog = document.querySelector('[role=dialog]');
        const input = dialog?.querySelector('input[type=text]');
        if (input) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(input, '15x7 C.H.I. Short Panel / White');
          input.dispatchEvent(new Event('input', {bubbles: true}));
          input.dispatchEvent(new Event('change', {bubbles: true}));
          return 'filled: ' + input.value;
        }
        return 'no input found';
      });
      console.log('Fill result:', fillResult);
      
      await page.waitForTimeout(500);
      
      // Click Save
      const saveResult = await page.evaluate(() => {
        const dialog = document.querySelector('[role=dialog]');
        const saveBtn = Array.from(dialog?.querySelectorAll('button') || []).find(b => b.textContent.trim() === 'Save');
        if (saveBtn) {
          saveBtn.click();
          return 'clicked save';
        }
        return 'no save btn';
      });
      console.log('Save result:', saveResult);
      
      await page.waitForTimeout(1000);
      console.log('✅ DONE - Option renamed');
    }
  } catch (err) {
    console.error('ERROR:', err.message);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
