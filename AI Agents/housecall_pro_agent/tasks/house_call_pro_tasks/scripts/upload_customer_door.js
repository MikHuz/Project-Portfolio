const { chromium } = require('playwright');

(async () => {
  const CDP_PORT = process.env.CDP_PORT || '18802';

  // Required
  const IMAGE_PATH = process.argv[2];
  if (!IMAGE_PATH) {
    console.error('Usage: node upload_hcp_image.js <image_path> [estimate_id]');
    process.exit(1);
  }

  // Optional estimate id
  const EST_ID = process.argv[3] || process.env.EST_ID;

  let browser;

  try {
    browser = await chromium.connectOverCDP(
      `http://127.0.0.1:${CDP_PORT}`
    );
    console.log(`✓ Connected to CDP ${CDP_PORT}`);
  } catch (err) {
    console.error(`Failed to connect to CDP ${CDP_PORT}`);
    console.error(err.message);
    process.exit(1);
  }

  try {
    const context = browser.contexts()[0];

    if (!context) {
      throw new Error('No browser context found.');
    }

    const pages = context.pages();

    let page;

    if (EST_ID) {
      const core = EST_ID.replace(/^(best_|est_)/, '');
      page = pages.find(p => p.url().includes(core));
    }

    if (!page)
      page = pages.find(p => !p.isClosed());

    if (!page)
      throw new Error('No suitable page found.');

    await page.bringToFront();
    await page.waitForTimeout(500);

    console.log(`Working on: ${page.url()}`);

    //
    // STEP 2 - Open Edit Option
    //

    console.log('Opening Edit Option...');

    await page
      .locator('button[data-testid="estimate-option-properties-edit-button"]')
      .click();

    //
    // Click Add Image OR Replace Image
    //

    const addImageButton = page.locator(
      '[data-testid="image-file-reader"] button:has-text("Add image")'
    );

    if (await addImageButton.isVisible().catch(() => false)) {

      console.log('Using Add Image...');

      await addImageButton.click();

    } else {

      console.log('Using Replace Image...');

      await page
        .locator('button[data-testid="image-uploader-edit-button"]')
        .click();

    }

    //
    // Switch to Upload tab
    //

    console.log('Opening Upload tab...');

    await page
      .locator('button[role="tab"]')
      .filter({ hasText: 'Upload' })
      .click();

    //
    // Wait for upload input
    //

    const input = page.locator(
      '[data-testid="upload-tab-dropzone-input"]'
    );

    await input.waitFor({
      state: 'attached',
      timeout: 10000
    });

    console.log('Upload dialog ready.');

    //
    // Upload image
    //

    console.log('Uploading image...');

    await input.setInputFiles(IMAGE_PATH, {
      force: true
    });

    await input.evaluate(el => {
      el.dispatchEvent(
        new Event('change', {
          bubbles: true
        })
      );

      el.dispatchEvent(
        new Event('input', {
          bubbles: true
        })
      );
    });

    const count = await input.evaluate(el => el.files.length);

    if (count === 0) {
      throw new Error('setInputFiles failed.');
    }

    console.log('✓ File injected.');

    //
    // Wait for Crop dialog
    //

    await page.waitForFunction(
      () =>
        [...document.querySelectorAll('[role="dialog"]')]
          .some(d => d.textContent.includes('Crop')),
      { timeout: 15000 }
    );

    console.log('Crop dialog detected.');

    //
    // Save Crop dialog
    //

    await page
      .getByRole('button', {
        name: /^Save$/
      })
      .click();

    console.log('✓ Crop saved.');

    //
    // Wait for Edit Option dialog
    //

    const editDialog = page
      .locator('[role="dialog"]')
      .filter({ hasText: 'Edit option' });

    await editDialog.waitFor({
      state: 'visible'
    });

    //
    // Final Save
    //

    await editDialog
      .getByRole('button', {
        name: /^Save$/
      })
      .click();

    console.log('✓ Option saved.');

    await page.waitForTimeout(1500);

    console.log('✓ Upload complete.');
  }
  catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
  finally {
    await browser.close();
  }
})();