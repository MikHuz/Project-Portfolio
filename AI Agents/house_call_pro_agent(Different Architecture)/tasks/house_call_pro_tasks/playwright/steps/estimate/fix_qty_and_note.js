const { chromium } = require('playwright');

const EST_ID = 'est_da5b2aae88a34f10b9cab935df345e3a';
const NOTE_TEXT = `Option 1: 15x7 C.H.I. Short Panel Non-insulated, 12in rails, LiftMaster Essential chain drive (2420L), White
Option 2: 15x7 C.H.I. Short Panel Insulated Steelback (Medium Duty), LiftMaster Premium belt drive (6690L), White`;

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:18802');
  const context = browser.contexts()[0];
  const pages = context.pages();
  let page = pages.find(p => p.url().includes('pro.housecallpro.com'));
  if (!page) {
    console.log('No HCP page found, navigating...');
    page = await context.newPage();
  }
  
  // Navigate to the estimate
  console.log('Navigating to estimate...');
  await page.goto(`https://pro.housecallpro.com/app/estimates/${EST_ID}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  
  // Check current line items
  const h6s = await page.evaluate(() => {
    const skip = new Set(['Home','Dash','Inbox','Schedule','Customers','Pipeline','Payroll','Reporting','Marketing','Price book','Customer','Tasks','Summary of work','Line items','Cost breakdown','Total cost','Profit/Loss','Attachments','Tags','Chats','AI Team','Support','Alex S','Fields','Private notes']);
    return Array.from(document.querySelectorAll('h6')).map(h => h.textContent.trim()).filter(t => t && !skip.has(t) && !t.startsWith('Estimate') && !t.startsWith('Brian'));
  });
  console.log('Current line items:', h6s);
  
  // Check if Standard One Car quantity needs fixing
  const stdCarQtyInfo = await page.evaluate(() => {
    const h6s = [...document.querySelectorAll('h6')];
    const stdCar = h6s.find(h => h.textContent.includes('Standard One Car'));
    if (!stdCar) return null;
    // Find qty near this heading
    const container = stdCar.closest('li, [class*=hcp-ui]') || stdCar.parentElement.parentElement.parentElement.parentElement;
    const allText = container ? container.innerText : '';
    return {found: true, text: allText.slice(0, 200)};
  });
  console.log('Std Car info:', stdCarQtyInfo);
  
  await browser.close();
  console.log('Done');
})();
