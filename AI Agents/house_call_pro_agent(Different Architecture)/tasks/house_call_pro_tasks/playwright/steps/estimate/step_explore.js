/**
 * step_explore.js
 * Exploration / debugging script. Navigate to any price book URL and
 * print what cards AND rows are visible. Use this to discover the right
 * path or item names before writing a real step.
 *
 * Args (via env):
 *   EST_ID       — estimate ID
 *   PB_URL       — full price book URL to navigate to (overrides below)
 *     OR
 *   MAT_CAT      — material category ID (builds URL automatically)
 *     OR
 *   SVC_CAT      — service category ID (builds URL automatically)
 *   CARD_PATH    — optional JSON array of cards to click after navigating
 *
 * Example — see what's inside a material category:
 *   EST_ID=est_abc MAT_CAT=pbmcat_xxx node step_explore.js
 *
 * Example — walk 3 levels and see what's at level 4:
 *   EST_ID=est_abc \
 *   CARD_PATH='["C.H.I. Doors","15x7","Flush"]' \
 *   node step_explore.js
 */

const {
  connect,
  pbMaterialRootUrl,
  pbMaterialUrl,
  pbServiceUrl,
  navigatePB,
  clickCard,
  listCards,
  listRows,
} = require('../../lib/hcp_helpers');

const EST_ID    = process.env.EST_ID;
const MAT_CAT   = process.env.MAT_CAT;
const SVC_CAT   = process.env.SVC_CAT;
const PB_URL    = process.env.PB_URL;
const CARD_PATH = JSON.parse(process.env.CARD_PATH || '[]');

if (!EST_ID) {
  console.error('Missing required env var: EST_ID');
  process.exit(1);
}

(async () => {
  const { browser, page } = await connect();

  try {
    // Determine URL
    let url;
    if (PB_URL)       url = PB_URL;
    else if (MAT_CAT) url = pbMaterialUrl(EST_ID, MAT_CAT);
    else if (SVC_CAT) url = pbServiceUrl(EST_ID, SVC_CAT);
    else              url = pbMaterialRootUrl(EST_ID);

    console.log(`\n🔍 Explore: ${url}`);
    await navigatePB(page, url);

    // Walk card path if given
    for (let i = 0; i < CARD_PATH.length; i++) {
      const label = CARD_PATH[i];
      try {
        await clickCard(page, label);
        console.log(`  [${i + 1}] Clicked: "${label}"`);
      } catch (err) {
        console.error(`  ✗ Failed at "${label}": ${err.message}`);
        break;
      }
    }

    // Print current state
    const cards = await listCards(page);
    const rows  = await listRows(page);

    if (cards.length) {
      console.log('\n📂 Cards (subcategories):');
      cards.forEach(c => console.log(`  - ${c}`));
    }

    if (rows.length) {
      console.log('\n📋 Rows (items):');
      rows.forEach(r => console.log(`  - ${r}`));
    }

    if (!cards.length && !rows.length) {
      console.log('\n⚠️  Nothing visible — modal may not have loaded or path is wrong');
    }

  } catch (err) {
    console.error('\nERROR:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
