#!/usr/bin/env node
/**
 * run_add_customer_images.js — Pipeline: Street View → DoorVisions → HCP upload
 *
 * ⚠️  STEP 2 (DoorVisions) IS NOT RUN FROM THIS SCRIPT.
 * DoorVisions is a React-heavy site that does not respond reliably to programmatic
 * Playwright DOM clicks — attempts took 20-30 min and still failed.
 *
 * CURRENT APPROACH:
 *   Step 1 (Street View) and Step 3 (HCP upload) are Playwright scripts.
 *   Step 2 (DoorVisions) is handled by the sub-agent using the browser tool
 *   (screenshot + act) as described in add_customer_image_task.md.
 *
 * This script handles Step 1 and Step 3 only.
 * The calling sub-agent handles Step 2 interactively via browser screenshots.
 *
 * Usage:
 *   EST_ID="best_04201e67dc2f4afcbdf2a9f94a13f3a4"
 *   CUSTOMER_NAME="john_doe"          # used for output folder name
 *   ADDRESS="183 Fleet St, Vallejo, CA 94591"
 *
 *   # Door config (passed through to step_doorvisions env, unused in this script):
 *   DOOR_PRODUCT="PLANKS"
 *   DOOR_DESIGN=""                    # optional; will auto-pick if blank
 *   DOOR_THERMAL="Medium Duty"
 *   DOOR_COLOR="CEDAR"
 *   DOOR_SIZE="16x7"
 *   DOOR_WINDOWS="NO WINDOWS"
 *   DOOR_INSERTS=""
 *
 *   node run_add_customer_images.js
 */

'use strict';

const { execSync, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ─── Config ───────────────────────────────────────────────────────────────────

const WORKSPACE = '/home/doorgi/.openclaw/workspace';
const STEPS_DIR = path.join(__dirname, 'steps', 'customer_image');
const CDP_URL   = process.env.CDP_URL || 'http://127.0.0.1:18800';

const EST_ID        = (process.env.EST_ID        || '').trim();
const CUSTOMER_NAME = (process.env.CUSTOMER_NAME || 'unknown_customer').trim().replace(/\s+/g, '_').toLowerCase();
const ADDRESS       = (process.env.ADDRESS       || '').trim();
const DOOR_PRODUCT  = (process.env.DOOR_PRODUCT  || 'PLANKS').trim();
const DOOR_DESIGN   = (process.env.DOOR_DESIGN   || '').trim();
const DOOR_THERMAL  = (process.env.DOOR_THERMAL  || 'Medium Duty').trim();
const DOOR_COLOR    = (process.env.DOOR_COLOR    || 'CEDAR').trim();
const DOOR_SIZE     = (process.env.DOOR_SIZE     || '16x7').trim();
const DOOR_WINDOWS  = (process.env.DOOR_WINDOWS  || 'NO WINDOWS').trim();
const DOOR_INSERTS  = (process.env.DOOR_INSERTS  || '').trim();

if (!EST_ID)   { console.error('ERROR: EST_ID is required'); process.exit(1); }
if (!ADDRESS)  { console.error('ERROR: ADDRESS is required'); process.exit(1); }

const OUT_DIR   = path.join(WORKSPACE, 'tasks/house_call_pro_tasks/customer_houses', CUSTOMER_NAME);
const HOUSE_IMG = path.join(OUT_DIR, 'house_original.png');
const INBOUND   = '/home/doorgi/.openclaw/media/inbound';

fs.mkdirSync(OUT_DIR,  { recursive: true });
fs.mkdirSync(INBOUND,  { recursive: true });

// ─── Helpers ─────────────────────────────────────────────────────────────────

function step(label, fn) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`▶  ${label}`);
  console.log('─'.repeat(60));
  fn();
  console.log(`✓  ${label} — COMPLETE`);
}

function runNode(script, envOverrides = {}) {
  const result = spawnSync('node', [script], {
    env: { ...process.env, ...envOverrides, CDP_URL },
    stdio: 'inherit',
    timeout: 120000,
  });
  if (result.status !== 0) {
    throw new Error(`${path.basename(script)} exited with code ${result.status}`);
  }
}

function checkFile(fpath, minKB = 1) {
  if (!fs.existsSync(fpath)) throw new Error(`File not found: ${fpath}`);
  const sizeKB = fs.statSync(fpath).size / 1024;
  if (sizeKB < minKB) throw new Error(`File too small (${Math.round(sizeKB)}KB): ${fpath}`);
  return sizeKB;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║      run_add_customer_images.js              ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`EST_ID:   ${EST_ID}`);
  console.log(`Customer: ${CUSTOMER_NAME}`);
  console.log(`Address:  ${ADDRESS}`);
  console.log(`Door:     ${DOOR_PRODUCT} / ${DOOR_COLOR} / ${DOOR_SIZE} / ${DOOR_THERMAL}`);
  console.log(`Out dir:  ${OUT_DIR}\n`);

  // ── Step 1: Street View ───────────────────────────────────────────────────
  step('Step 1: Get Street View house image', () => {
    runNode(path.join(STEPS_DIR, 'step_street_view.js'), {
      ADDRESS,
      OUT_PATH: HOUSE_IMG,
    });
    const sizeKB = checkFile(HOUSE_IMG, 5);
    console.log(`  house_original.png: ${Math.round(sizeKB)}KB`);
  });

  // ── Step 2: DoorVisions ───────────────────────────────────────────────────
  // ⚠️  NOT HANDLED HERE. DoorVisions is done by the sub-agent via browser tool
  // (screenshot + act). Playwright DOM clicks were too slow/unreliable (~30 min, no result).
  // This step just verifies the sub-agent already saved the output files before upload.
  step('Step 2: DoorVisions (verify sub-agent output)', () => {
    checkFile(path.join(OUT_DIR, 'door_only.jpg'), 10);
    checkFile(path.join(OUT_DIR, 'door_visualization.jpg'), 10);
    console.log(`  door_only.jpg:          ${Math.round(fs.statSync(path.join(OUT_DIR, 'door_only.jpg')).size / 1024)}KB`);
    console.log(`  door_visualization.jpg: ${Math.round(fs.statSync(path.join(OUT_DIR, 'door_visualization.jpg')).size / 1024)}KB`);
    console.log('  (completed by sub-agent via browser tool)');
  });

  // ── Step 3: Upload to HCP ─────────────────────────────────────────────────
  step('Step 3: Upload door_visualization.jpg to HCP estimate', () => {
    runNode(path.join(STEPS_DIR, 'step_upload_image.js'), {
      EST_ID,
      IMAGE_PATH: path.join(OUT_DIR, 'door_visualization.jpg'),
      IMAGE_LABEL: 'door_visualization',
    });
  });

  // ── Final report ──────────────────────────────────────────────────────────
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║                  ✅  DONE                    ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`Customer folder: ${OUT_DIR}`);
  console.log('Files saved:');
  for (const f of ['house_original.png', 'door_only.jpg', 'door_visualization.jpg']) {
    const fp = path.join(OUT_DIR, f);
    const kb = fs.existsSync(fp) ? `${Math.round(fs.statSync(fp).size / 1024)}KB` : 'MISSING';
    console.log(`  ${f.padEnd(30)} ${kb}`);
  }

})().catch(err => {
  console.error('\n╔══════════════════════════════════════════════╗');
  console.error('║                  ❌  FAILED                  ║');
  console.error('╚══════════════════════════════════════════════╝');
  console.error(err.message);
  process.exit(1);
});
