/**
 * hcp_helpers.js — Shared Playwright helpers for HousecallPro estimate automation
 *
 * All step scripts require this. It handles:
 *  - CDP connection to the OpenClaw Chromium
 *  - Price book navigation (direct URL + card clicks)
 *  - Adding service/material items from modal rows
 *  - Reading back line items from the estimate page
 *  - Closing the price book modal safely
 *
 * CDP port: 18801 (OpenClaw 'automation' profile — isolated from main openclaw browser)
 */

const { chromium } = require('playwright');

const CDP_URL = process.env.CDP_URL || 'http://127.0.0.1:18801';
const HCP_BASE = 'https://pro.housecallpro.com';

// ─── Connection ───────────────────────────────────────────────────────────────

/**
 * Connect to the OpenClaw Chromium over CDP.
 * Returns { browser, page } where page is the active HCP tab.
 * Throws if no HCP tab is found.
 */
async function connect() {
  const browser = await chromium.connectOverCDP(CDP_URL);
  const context = browser.contexts()[0];
  let page = context.pages().find(p => p.url().includes('housecallpro.com'));
  if (!page) {
    page = await context.newPage();
    await page.goto(`${HCP_BASE}/app/home`, { waitUntil: 'domcontentloaded' });
  }
  return { browser, page };
}

// ─── URL Helpers ──────────────────────────────────────────────────────────────

function estUrl(estId, path = '') {
  return `${HCP_BASE}/app/estimates/${estId}${path}`;
}

function pbServiceUrl(estId, categoryId) {
  return estUrl(estId, `/price_book/categories/${categoryId}`);
}

function pbMaterialUrl(estId, categoryId) {
  return estUrl(estId, `/price_book/material_categories/${categoryId}`);
}

function pbMaterialRootUrl(estId) {
  return estUrl(estId, '/price_book/material_categories');
}

// ─── Modal Wait ───────────────────────────────────────────────────────────────

/** Wait for the price book modal to be open and settled. */
async function waitForModal(page, timeout = 10000) {
  await page.waitForSelector('[role=dialog]', { timeout });
  await page.waitForTimeout(500);
}

// ─── Navigation ───────────────────────────────────────────────────────────────

/**
 * Navigate directly to a price book URL and wait for modal.
 * Use this whenever you know the category ID — fastest path.
 */
async function navigatePB(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await waitForModal(page);
}

/**
 * Click a card inside the price book modal by text match.
 * Returns the card text that was clicked (trimmed, first 60 chars).
 *
 * If multiple cards match, picks the first visible one.
 * Throws with a list of available cards if nothing matches.
 */
async function clickCard(page, cardText) {
  console.log(`    → Card: "${cardText}"`);

  // Wait for at least one card to be visible
  await page.waitForFunction(
    () => {
      const d = document.querySelector('[role=dialog]');
      return d && d.querySelectorAll('div.MuiPaper-root').length > 0;
    },
    { timeout: 10000 }
  );

  const result = await page.evaluate((text) => {
    const d = document.querySelector('[role=dialog]');
    const cards = Array.from(d.querySelectorAll('div.MuiPaper-root'))
      .filter(el => el.getBoundingClientRect().width > 100);

    const match = cards.find(el =>
      el.textContent.trim().toLowerCase().includes(text.toLowerCase())
    );

    if (!match) {
      return {
        ok: false,
        available: cards.map(el => el.textContent.trim().slice(0, 60))
      };
    }

    const r = match.getBoundingClientRect();
    return { ok: true, x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), text: match.textContent.trim().slice(0, 60) };
  }, cardText);

  if (!result.ok) {
    throw new Error(`Card "${cardText}" not found. Available:\n${result.available.map(c => `  - ${c}`).join('\n')}`);
  }

  await page.mouse.click(result.x, result.y);
  await page.waitForTimeout(700);
  return result.text;
}

/**
 * List all currently visible cards in the modal.
 * Useful for debugging or when you need to discover what's at a level.
 */
async function listCards(page) {
  return page.evaluate(() => {
    const d = document.querySelector('[role=dialog]');
    if (!d) return [];
    return Array.from(d.querySelectorAll('div.MuiPaper-root'))
      .filter(el => el.getBoundingClientRect().width > 100)
      .map(el => el.textContent.trim().slice(0, 80));
  });
}

// ─── Adding Items ─────────────────────────────────────────────────────────────

/**
 * Add a service item from the current modal page by row text fragment.
 * Clicks the "Service" button in the matching row.
 */
async function addServiceItem(page, rowFragment) {
  console.log(`    + Service: "${rowFragment}"`);
  await _waitForRow(page, rowFragment);
  await _clickRowButton(page, rowFragment, 'Service');
  await page.waitForTimeout(600);
}

/**
 * Add a material item from the current modal page by row text fragment.
 * Clicks the "Material" button in the matching row.
 */
async function addMaterialItem(page, rowFragment) {
  console.log(`    + Material: "${rowFragment}"`);
  await _waitForRow(page, rowFragment);
  await _clickRowButton(page, rowFragment, 'Material');
  await page.waitForTimeout(600);
}

async function _waitForRow(page, fragment) {
  await page.waitForFunction(
    (frag) => {
      const d = document.querySelector('[role=dialog]');
      return d && d.innerText.toLowerCase().includes(frag.toLowerCase());
    },
    fragment,
    { timeout: 10000 }
  );
  // Note: waitForFunction(fn, arg, options) is valid Playwright syntax — arg is passed as-is to fn
}

async function _clickRowButton(page, rowFragment, buttonLabel) {
  const result = await page.evaluate(({ frag, label }) => {
    const d = document.querySelector('[role=dialog]');
    const rows = Array.from(d.querySelectorAll('tr'));
    const row = rows.find(r => r.innerText.toLowerCase().includes(frag.toLowerCase()));
    if (!row) return { ok: false, rows: rows.map(r => r.innerText.trim().slice(0, 60)) };
    const btn = Array.from(row.querySelectorAll('button')).find(b => b.textContent.trim() === label);
    if (!btn) return { ok: false, buttons: Array.from(row.querySelectorAll('button')).map(b => b.textContent.trim()) };
    btn.click();
    return { ok: true };
  }, { frag: rowFragment, label: buttonLabel });

  if (!result.ok) {
    const detail = result.rows
      ? `Rows visible:\n${result.rows.map(r => `  - ${r}`).join('\n')}`
      : `Buttons in row: ${result.buttons?.join(', ')}`;
    throw new Error(`Could not click "${buttonLabel}" for "${rowFragment}". ${detail}`);
  }
}

/**
 * List all rows currently visible in the modal (for debugging / dynamic discovery).
 */
async function listRows(page) {
  return page.evaluate(() => {
    const d = document.querySelector('[role=dialog]');
    if (!d) return [];
    return Array.from(d.querySelectorAll('tr'))
      .map(r => r.innerText.trim().replace(/\s+/g, ' ').slice(0, 100))
      .filter(Boolean);
  });
}

// ─── Modal Close ──────────────────────────────────────────────────────────────

/**
 * Close the price book modal using the X button.
 * Always use this — never navigate away directly.
 */
async function closePB(page) {
  await page.evaluate(() => {
    const d = document.querySelector('[role=dialog]');
    if (!d) return;
    const btns = Array.from(d.querySelectorAll('button'));
    const x = btns.find(b => b.getAttribute('aria-label') === 'close' || b.textContent.trim() === '×' || b.textContent.trim() === 'Close');
    if (x) x.click();
  });
  await page.waitForTimeout(600);
}

// ─── Line Item Verification ───────────────────────────────────────────────────

// H6 text values that are UI chrome, not line items
const SKIP_H6 = new Set([
  'Home','Dash','Inbox','Schedule','Customers','Pipeline','Payroll',
  'Reporting','Marketing','Price book','Customer','Tasks','Summary of work',
  'Line items','Cost breakdown','Total cost','Profit/Loss','Attachments',
  'Tags','Chats','AI Team','Support','Alex S','Fields','Private notes'
]);

/**
 * Navigate to the estimate and read back all h6 line item names.
 * Call this after closing the price book to confirm items were added.
 */
async function getLineItems(page, estId) {
  await page.goto(estUrl(estId), { waitUntil: 'domcontentloaded' });
  // Wait until "Line items" section heading is visible — confirms the estimate body has rendered
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll('h6')).some(h => h.textContent.trim() === 'Line items'),
    { timeout: 10000 }
  ).catch(() => {}); // non-fatal if slow
  await page.waitForTimeout(500);
  return page.evaluate((skipArr) => {
    const s = new Set(skipArr);
    return Array.from(document.querySelectorAll('h6'))
      .map(h => h.textContent.trim())
      .filter(t => t && !s.has(t) && !t.startsWith('Estimate'));
  }, [...SKIP_H6]);
}

// ─── Exports ──────────────────────────────────────────────────────────────────

module.exports = {
  connect,
  estUrl,
  pbServiceUrl,
  pbMaterialUrl,
  pbMaterialRootUrl,
  waitForModal,
  navigatePB,
  clickCard,
  listCards,
  addServiceItem,
  addMaterialItem,
  listRows,
  closePB,
  getLineItems,
};
