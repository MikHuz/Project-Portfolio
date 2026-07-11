/**
 * step_door.js
 * Navigates the material price book card tree to add a door configuration.
 * This is the deepest path — up to 6 levels of cards before the final item row.
 *
 * Args (via env):
 *   EST_ID     — estimate ID
 *   CARD_PATH  — JSON array of card labels to click in order
 *                e.g. '["C.H.I. Doors","15x7","Flush","Long Windows","Insulated (Medium Duty)"]'
 *   ITEM       — final row fragment to add as Material (e.g. "Black")
 *
 * The script will:
 *   1. Navigate to the material root
 *   2. Click each card in CARD_PATH in order
 *   3. At the final level, list visible rows (so you can confirm the item exists)
 *   4. Add the ITEM row
 *
 * On any failure it prints what cards/rows ARE available so you can correct the path.
 *
 * Example:
 *   EST_ID=est_abc \
 *   CARD_PATH='["C.H.I. Doors","15x7","Flush","Long Windows","Insulated (Medium Duty)"]' \
 *   ITEM="Black" \
 *   node step_door.js
 */

const {
  connect,
  pbMaterialRootUrl,
  navigatePB,
  clickCard,
  listCards,
  listRows,
  addMaterialItem,
} = require('../../lib/hcp_helpers');

const EST_ID    = process.env.EST_ID;
const CARD_PATH = JSON.parse(process.env.CARD_PATH || '[]');
const ITEM      = process.env.ITEM;

if (!EST_ID || !CARD_PATH.length || !ITEM) {
  console.error('Missing required env vars: EST_ID, CARD_PATH (JSON array), ITEM');
  process.exit(1);
}

(async () => {
  const { browser, page } = await connect();

  try {
    console.log(`\n🚪 Door path for ${EST_ID}`);
    console.log(`   Path: ${CARD_PATH.join(' → ')} → "${ITEM}"`);

    await navigatePB(page, pbMaterialRootUrl(EST_ID));

    // Walk the card path
    for (let i = 0; i < CARD_PATH.length; i++) {
      const label = CARD_PATH[i];
      try {
        await clickCard(page, label);
        console.log(`  [${i + 1}/${CARD_PATH.length}] ✓ ${label}`);
      } catch (err) {
        console.error(`\n  ✗ Failed at level ${i + 1}: ${err.message}`);
        process.exit(1);
      }
    }

    // Show what rows are at the final level before adding
    const rows = await listRows(page);
    console.log('\n  Rows at final level:');
    rows.forEach(r => console.log(`    - ${r}`));

    // Add the item
    await addMaterialItem(page, ITEM);
    console.log(`\n  ✓ Added: "${ITEM}"`);
    console.log('\nDONE');

  } catch (err) {
    console.error('\nERROR:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
