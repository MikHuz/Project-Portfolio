# MEMORY.md — Long-Term Memory (HCP Agent)

_Curated knowledge that persists across sessions. Last updated: 2026-06-19_

---

## Who I Am

- **Name**: HCP Agent 📋
- **Role**: Doorgi Garage Doors' dedicated House Call Pro automation agent
- **Domain**: HCP platform workflows, Playwright automation, DoorVisions integration, customer image tasks

## Who ommitted Is

---

# Technical Browser Navigation
Use and document new browser navigation patterns under here to speed up navigation for tasks.

## General Browser Automation Principles

- **UI Element Discovery**: Always rediscover elements using visible text/labels, accessibility properties (role, aria-label), semantic structure, spatial layout, and consistent page patterns. Avoid numeric refs, DOM indices, CSS selectors, XPath, pixel coordinates, or stale paths.
- **Snapshot Strategy**: Always take a fresh snapshot (`--format aria`) before complex actions or page changes. Re-snapshot after any significant UI change (form submit, modal open, navigation, SPA update). Prefer `--format aria` or role-based snapshots.
- **Execution Strategy**: State the goal element semantically. Scan the current snapshot for candidates using role + name + visible text + location. Validate the match before acting. Re-snapshot and broaden search if ambiguous.
- **Error Handling**: If an element cannot be found or a reference is stale, immediately re-snapshot, broaden semantic search (role + partial text match), check alternate regions or states (e.g., expand collapsed sections, switch tabs), or fall back to a natural language description for the next action.
- **Memory Update Rule**: Generalize reliable patterns observed at least twice (or after a verified fix) into concise, actionable entries for `MEMORY.md`. Avoid raw DOM selectors, XPath, CSS paths, or numerical ref identifiers, and single-session/one-off observations. Consolidate duplicates and update outdated entries.

## HCP Platform Knowledge

### **New Rule: HCP Search - Always Press Enter**
- When inputting text into search fields in House Call Pro, the system DOES NOT auto-search.
- **Always explicitly press 'Enter' or click a search button after typing into a search field to trigger the search.**

### add_customer_image_task — Key Learnings

#### HCP Option Image Upload (step_upload_image.js)
- Target: Option #1 image slot at top of option body — NOT the Attachments section at bottom
- Button selector: find `button[aria-label="manage option"]` (kebab) as anchor, then click the nearest unlabeled icon-only button to its LEFT at same Y level — that's the placeholder
- Dialog flow: placeholder click → "Add option image" dialog → Upload tab → `getByTestId('upload-tab-dropzone-input')` + `setInputFiles(path, { force: true })` + dispatch `change` event → Crop dialog → Save
- Confirmation: `button:has-text("Replace")` appears after save but Playwright times out matching it — upload works, confirmation selector needs improvement (check for img thumbnail instead)
- Script: `tasks/house_call_pro_tasks/playwright/steps/customer_image/step_upload_image.js`

#### DoorVisions Interaction
- Must resize browser to 1920px wide — right panel is off-viewport at 1200px
- `clickCoords` is the only reliable click method — `.click()` via evaluate doesn't fire React events off-viewport
- Color woodtone tabs: find via `document.querySelectorAll('a')` filtering x > 800, then `clickCoords`
- Color panel needs `scrollTop += 400` on `.tab-pane.active` to reveal woodtone/powder coat tabs
- File upload: same pattern as HCP — Playwright `setInputFiles({ force: true })` + dispatch `change` event

#### Option Rename
- Format: `{size} {brand} {model} {design} / {color}` e.g. `16x7 C.H.I. 4283 Long Panel / White`
- Reliable Edit button: `Array.from(document.querySelectorAll('button[aria-label="Edit"]')).sort by Y descending` → click highest Y (that's the option body edit, not header edits)

#### Street View Image Capture
- Address label on Street View panel may say neighbor's address — ignore it, trust the Google Maps link
- Assess default angle first — try 1–2 adjustments to face garage door directly, then capture
- Invalid only if garage is completely absent/unidentifiable

---

## DoorVisions Product Naming — Common Confusion

- **"Overlay Carriage Steel"** = TWO parts: **product** (Overlay Carriage House, under Carriage tab) + **design/material** (Steel Overlay within that product)
- Do NOT interpret "Steel" as a separate product category — it describes the overlay material on the Carriage House door
- Carriage tab on DoorVisions has: Shoreline, Overlay Carriage House — the latter is correct for this spec
- Never pick Planks/Raised Panel/Stamped for a carriage spec — those are completely different product lines

---

## Scheduling Rules

- **Always schedule from the NEW estimate page** (`/app/estimates/new`) — set date/time/team in the left sidebar BEFORE saving
- Do NOT use the "Schedule" button that appears after the estimate is already saved — wrong dialog
- **Always uncheck "Notify customer"** when setting a schedule
- **"Raman" = "Roman H"** in HCP — same person, different name spelling

---

## Estimate Workflow — Key Understanding

- **Existing estimate does NOT mean filled** — techs create estimate shells in the field; the bot fills in line items from the audio/text details
- **Full flow**: Private Notes → line items via Playwright → verify → door visualization
- **Multiple options**: Add as flat list, note in Private Notes. Do NOT use HCP Options feature
- **15x7 = one-car size** (not two-car)
- **Steelback = Insulated (Medium Duty)** minimum
- **User-provided house photos**: OpenClaw saves chat image uploads to `/tmp/openclaw/downloads/<id>.jpg` — check there first. Also check `~/.openclaw/media/inbound/` as fallback.
- **Task playbooks location**: tasks/house_call_pro_tasks/ — read new_estimate_task.md, price_book_structure.md, playwright/README.md before any estimate work
