/**
 * step_verify.js
 * Navigate to the estimate and print all current line items (h6 elements).
 * Run this at any point to confirm what has and hasn't been added yet.
 *
 * Args (via env):
 *   EST_ID — estimate ID
 *
 * Example:
 *   EST_ID=est_abc node step_verify.js
 */

const { connect, getLineItems } = require('../../lib/hcp_helpers');

const EST_ID = process.env.EST_ID;

if (!EST_ID) {
  console.error('Missing required env var: EST_ID');
  process.exit(1);
}

(async () => {
  const { browser, page } = await connect();

  try {
    console.log(`\n✅ Line items for ${EST_ID}`);
    const items = await getLineItems(page, EST_ID);

    if (!items.length) {
      console.log('  (none yet)');
    } else {
      items.forEach(i => console.log(`  - ${i}`));
    }

    console.log('\nDONE');
  } catch (err) {
    console.error('\nERROR:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
