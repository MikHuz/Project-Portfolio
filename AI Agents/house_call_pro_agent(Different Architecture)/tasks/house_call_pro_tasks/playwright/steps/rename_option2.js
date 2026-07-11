const { chromium } = require('playwright');

(async () => {
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://127.0.0.1:18802');
    const context = browser.contexts()[0];
    const page = await context.newPage();
    await page.goto('https://pro.housecallpro.com/app/estimates/est_da5b2aae88a34f10b9cab935df345e3a', {waitUntil: 'domcontentloaded'});
    
    await page.waitForTimeout(5000); // wait for React to render fully
    
    // Check what Edit buttons exist
    const btns = await page.evaluate(() => {
      const editBtns = Array.from(document.querySelectorAll('button[aria-label="Edit"]'));
      return editBtns.map((b, i) => {
        const r = b.getBoundingClientRect();
        return {i, x: Math.round(r.x), y: Math.round(r.y), visible: r.height > 0};
      });
    });
    console.log('Edit buttons:', JSON.stringify(btns));
    
    // Also try clicking the edit pencil icon for the option
    const allBtns = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button')).map((b, i) => {
        const r = b.getBoundingClientRect();
        return {i, text: b.textContent.trim().substring(0,20), ariaLabel: b.getAttribute('aria-label'), x: Math.round(r.x), y: Math.round(r.y)};
      }).filter(b => b.y > 300 && b.y < 700 && b.x > 900);
    });
    console.log('Buttons in option area:', JSON.stringify(allBtns));
    
  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    if (browser) await browser.close();
  }
})();
