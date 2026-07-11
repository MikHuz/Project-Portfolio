/**
 * step_services.js
 * Adds warranty + installation fee from the Service Price Book.
 *
 * Args (via env):
 *   EST_ID        — estimate ID (est_abc123...)
 *   SERVICE_CAT   — price book category ID for the install size (e.g. two-car garage)
 *   INSTALL_ITEM  — row fragment for the install fee (e.g. "Standard Two Car")
 *   WARRANTY_ITEM — row fragment for the warranty (default: "Warranties")
 *
 * Example:
 *   EST_ID=est_abc SERVICE_CAT=pbcat_xxx INSTALL_ITEM="Standard Two Car" node step_services.js
 */

const { connect, pbServiceUrl, navigatePB, addServiceItem } = require('../../lib/hcp_helpers');

const EST_ID       = process.env.EST_ID;
const SERVICE_CAT  = process.env.SERVICE_CAT;
const INSTALL_ITEM = process.env.INSTALL_ITEM;
const WARRANTY     = process.env.WARRANTY_ITEM || 'Warranties';

if (!EST_ID || !SERVICE_CAT || !INSTALL_ITEM) {
  console.error('Missing required env vars: EST_ID, SERVICE_CAT, INSTALL_ITEM');
  process.exit(1);
}

(async () => {
  const { browser, page } = await connect();

  try {
    console.log(`\n🔧 Services for ${EST_ID}`);
    const url = pbServiceUrl(EST_ID, SERVICE_CAT);
    await navigatePB(page, url);

    await addServiceItem(page, WARRANTY);
    console.log(`  ✓ ${WARRANTY}`);

    await addServiceItem(page, INSTALL_ITEM);
    console.log(`  ✓ ${INSTALL_ITEM}`);

    console.log('\nDONE');
  } catch (err) {
    console.error('\nERROR:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
