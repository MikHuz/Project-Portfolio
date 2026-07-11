/**
 * step_material_direct.js
 * Navigate directly to a known material category ID and add an item.
 * Use this for stable categories where we already know the category ID
 * (tracks, openers, A-Z repair items) — no card clicking needed.
 *
 * Args (via env):
 *   EST_ID   — estimate ID
 *   MAT_CAT  — material category ID (e.g. pbmcat_xxx)
 *   ITEM     — row fragment to add as Material
 *
 * Example (openers):
 *   EST_ID=est_abc MAT_CAT=pbmcat_68c335... ITEM="Essential" node step_material_direct.js
 *
 * Example (tracks):
 *   EST_ID=est_abc MAT_CAT=pbmcat_2d2983... ITEM="20 IN" node step_material_direct.js
 */

const { connect, pbMaterialUrl, navigatePB, listRows, addMaterialItem } = require('../../lib/hcp_helpers');

const EST_ID  = process.env.EST_ID;
const MAT_CAT = process.env.MAT_CAT;
const ITEM    = process.env.ITEM;

if (!EST_ID || !MAT_CAT || !ITEM) {
  console.error('Missing required env vars: EST_ID, MAT_CAT, ITEM');
  process.exit(1);
}

(async () => {
  const { browser, page } = await connect();

  try {
    console.log(`\n📦 Material (direct) for ${EST_ID}`);
    console.log(`   Category: ${MAT_CAT}  Item: "${ITEM}"`);

    await navigatePB(page, pbMaterialUrl(EST_ID, MAT_CAT));

    // Print rows so failures are easy to debug
    const rows = await listRows(page);
    console.log('  Rows available:');
    rows.forEach(r => console.log(`    - ${r}`));

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
