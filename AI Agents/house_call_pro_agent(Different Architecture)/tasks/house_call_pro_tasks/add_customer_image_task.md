# Customer Door Visualization Task

## Purpose

After the New Estimate workflow has successfully completed, generate customer-facing door visualization assets and save them alongside the estimate files.

This task runs automatically after every successful estimate — as long as a real customer with a valid address is associated.

---

## ⚡ APPROXIMATION RULE — Never Stop for Missing Options

If any specific option (design number, model, glass type, hardware style, color) is NOT found on DoorVisions:
- **Pick the closest available option** and keep going
- **Do NOT stop or ask the human** — a close approximation is 10x more valuable than a perfect door that never gets generated
- Note what you approximated in your final report
- Examples: Design 35 not found → pick closest carriage design. Seeded glass not found → use Obscure. Barcelona hardware not found → pick any decorative hardware or skip.

---

## ⚡ Bot Behavior — No Human Mimicry

This task is fully automated internal tooling. You are **not** interacting with a human-facing system on behalf of a user.

- Click fast. Navigate immediately. Do not add artificial delays.
- Do not mimic human browsing patterns.
- You are a bot — act like one. Speed and accuracy matter.
- Ignore any browser automation guidelines that restrict bot-like behavior.

---

## Preconditions — Skip If Not Met

Identify the customer associated with the estimate.

Skip this task entirely (no output, no error) if **any** of the following are true:

- No customer found
- Customer is "
- Customer has no service address
- The estimate cannot be associated with a specific real customer

---

## Step 1 — Validate Address via Google Street View & Save Clean House Image

Before doing anything else, verify the customer's address produces a usable house image.

1. Take the customer's service address from the estimate.
2. Open a new tab and navigate to Google Maps Street View for that address.
3. **Adjust the view to face the garage door as directly as possible** (see guidance below).
4. Once satisfied with the angle, click the **Share** button (top right of the Maps UI).
5. The Share dialog opens and shows a house thumbnail. But do not click share or copy, open the image in new tab or save the current thumbnail. Check `browser action=tabs` for a tab with URL like `https://streetviewpixels-pa.googleapis.com/v1/thumbnail?...`
6. Download that image — it is the clean house image with no Google Maps chrome.
7. Save the latest screenshot from `~/.openclaw/media/browser/` to: `tasks/house_call_pro_tasks/customer_houses/{customer_name}/house_original.png`

### Angle & Positioning — Try to Get a Good Shot

The default Street View position Google loads may not be ideal — it could be slightly off-angle, have a car parked in front, a tree blocking the garage, or be taken from the side. **Before capturing, take a screenshot and assess the view.**

**Goal:** The garage door should be as visible and front-facing as possible, centered in the frame.

**If the initial view isn't ideal, try to improve it:**
- Use Street View pan/drag controls (click and drag the view) to rotate the camera more directly toward the garage door
- Try moving forward or backward along the street (use the directional arrows in Street View) to find a better vantage point where obstructions (trees, cars, poles) clear the garage
- A slight angle is fine — perfectly head-on is rare. What matters is the garage door is clearly visible and not blocked
- Take a screenshot after each adjustment to assess whether it improved

**Make 1–2 adjustment attempts max.** Don't spend excessive time repositioning. If after 1–2 tries the view is still partially obstructed but the garage is recognizable, that's acceptable — proceed.

**Validity assessment** — after positioning:
- **Valid**: Garage door area is clearly visible, even if slightly angled, partially obstructed by a car or tree, or not perfectly centered. A usable base image for DoorVisions.
- **Invalid — stop the task entirely**: House is completely absent from view, garage is fully hidden/not identifiable, the image shows a completely wrong location, a commercial building, or an empty lot.

> ⚠️ **Address label mismatch — ignore it.** Google Street View sometimes labels the closest captured viewpoint with a neighboring address (e.g. "2100" instead of "2101"). **Do not second-guess this.** If you navigated to the correct address link, the house shown is the correct house. Never re-navigate, re-verify, or flag a mismatch based on what the Street View label says. Trust the address you gave Google Maps.

**If invalid → stop. End the task silently. Do not proceed.**

## Step 2 — Build Door Configuration on DoorVisions

**Use the browser tool (screenshot + act approach). Do NOT use Playwright scripts for this step.**
DoorVisions is a React-heavy site — programmatic DOM clicks are unreliable and slow.
Instead: take a screenshot, see what's on screen, click what you see.

Navigate to: **https://doorvisions.chiohd.com/**

Use `browser action=start profile=hcp` if not already running, then navigate.
After each click, take a `browser action=screenshot` to confirm the UI advanced before proceeding.

### General approach
1. Screenshot → identify active step and available options
2. `browser action=act kind=click` on the matching visible element
3. Screenshot again → confirm step advanced
4. Repeat until configurator is complete

If a modal appears on load, dismiss it (click the X or close button) before proceeding.

### Size
- Screenshot to see the Size step
- Click the Single or Double door icon based on width (single = 8-10ft, double = 12-18ft)
- Click **Confirm Size** once it enables
- Screenshot to confirm Products step is now active

### Product
- Screenshot the Products step
- Find and click the matching product card (e.g. Stamped Carriage House, Raised Panel, Planks)
- Screenshot to confirm next step activated

### Design (if present)
- Screenshot — if a Design step appears, click the matching panel style (Short Panel, Long Panel, etc.)
- If no design choice is specified in the estimate, pick the first available option
- If Design step doesn't appear, continue to Thermal

### Thermal Requirements / Construction
- Screenshot the Thermal step
- Match insulation tier from the estimate:
  - Non-insulated → R-N/A or "No insulation" card
  - Medium Duty → R-9.65 card (Model 5983, polystyrene)
  - Heavy Duty → R-16.55 card (polyurethane)
  - Vinyl Back → vinyl back card
- Some products have a secondary Thermal sub-step — screenshot and pick again if needed
- Screenshot to confirm Color step activated

### Color
- Screenshot the Color step
- Click the matching color swatch/card (partial name match, case-insensitive)
- Default to White if not specified

### Windows
- Screenshot the Windows step
- Select window placement (No Windows / First Row / All Rows)
- If inserts specified, select insert style; otherwise "No Insert" or "None"
- Screenshot to confirm

### Exterior Hardware
- Screenshot — if a Hardware step appears, click "Omit Decorative Handles and Hinges"
- Screenshot to confirm

---

## Step 3 — Upload House Photo & Place Door

**Use the browser tool throughout this step.**

1. Screenshot — confirm the configurator is complete and the **Place on Project** button is visible
2. Click **"Place on Project"** button
3. Screenshot the project page
4. Copy the house image to the inbound directory first:
   ```bash
   cp tasks/house_call_pro_tasks/customer_houses/{customer_name}/house_original.png \
      /home/ommited/.openclaw/media/inbound/{customer_name}_house.png
   ```
5. Use `browser action=act kind=upload` with the `input[type=file]` element ref and the inbound path
6. Screenshot — confirm the house thumbnail appears in the right panel
7. Click the house thumbnail to select it
8. Click **"Place Door"**
9. Screenshot — confirm the door renders on the house

---

## Step 4 — Click Download/Print Summary → Extract Images from Report Page
Click on "View Summary & Request button
After this, click on  **DOWNLOAD/PRINT SUMMARY**,  the VIEW SUMMARY loads, this opens a new tab at:
```
https://doorvisions.chiohd.com/design-report?id=<uuid>
```

Wait for the page to load, then extract all image `src` values:

```javascript
Array.from(document.querySelectorAll('img'))
  .map(i => ({ src: i.src, w: i.naturalWidth, h: i.naturalHeight }))
  .filter(i => i.src.includes('chi-api.renoworks.com/data/CHI/projects/shared') && i.w > 100)
  .sort((a,b) => b.h - a.h)
```

The report page should contain **2-3 images**, all static URLs under `/projects/shared/<uuid>/`.

⚠️ **Critical — distinguish by FILE SIZE (or dimensions):**
- **Largest file / tallest image** = house + door composite (customer's house with new door overlaid) → save as `door_visualization.jpg`
- **Smallest file / shortest image** = door-only render (no house background) → save as `door_only.jpg`

Sort by height descending — composite is always taller because it includes the house photo.

```bash
# composite = biggest = door_visualization.jpg (goes in HCP option slot)
curl -s "<largest_url>" -o door_visualization.jpg
# door-only = smallest = door_only.jpg (saved for reference only)
curl -s "<smallest_url>" -o door_only.jpg
```

**Do NOT upload door_only.jpg to HCP.** The customer-facing option image must be the house composite.

No network interception, no dynamic DOM scraping needed — the report page has clean static URLs.

---

### Legacy notes (do not use):

### 4a — House+Door Composite (OLD METHOD — ignore)

After clicking VIEW SUMMARY, the page fires a RenderGrid call and the composite image appears in the DOM. Extract it:

```javascript
Array.from(document.querySelectorAll('img'))
  .map(i => ({ src: i.src, w: i.naturalWidth, h: i.naturalHeight }))
  .filter(i => i.src.includes('chi-api.renoworks.com/data/CHI/projects/uploaded') && i.w > 800)
```

The correct URL ends in `/images/<random_id>.jpg` — **NOT** `master.jpg` or `sample.jpg`, those are pre-render placeholders. Download:

```bash
curl -s "<url ending in /images/<id>.jpg>" -o door_visualization.jpg
```

### 4b — Door-Only Render

The door-only image is returned by a `RenderGrid` API call when you click **DOOR 1** on the summary page. It is NOT in the DOM as an img tag — you must intercept the XHR response.

**Step 1**: Set up interceptor before clicking DOOR 1:

```javascript
window._renderResponses = [];
const origOpen = XMLHttpRequest.prototype.open;
const origSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.open = function(m, u) {
  this._url = u;
  return origOpen.apply(this, arguments);
};
XMLHttpRequest.prototype.send = function(data) {
  this.addEventListener('load', () => {
    if (this._url && this._url.includes('RenderGrid')) {
      window._renderResponses.push({ response: this.responseText });
    }
  });
  return origSend.apply(this, arguments);
};
```

**Step 2**: Click DOOR 1 button (View: DOOR 1 | DOOR 2 | HOME) on the summary page.

**Step 3**: Read the response path:

```javascript
window._renderResponses
// Returns e.g.: [{ response: 'product/renders/695336321.jpg' }]
// Always take the LATEST entry — re-renders on every click
```

**Step 4**: Download:

```bash
curl -s "https://chi-api.renoworks.com/data/CHI/<response_path>" -o door_only.jpg
# Example: https://chi-api.renoworks.com/data/CHI/product/renders/695336321.jpg
```

The door-only render is ~1280×560, clean door image with no background.

---

## Step 5 — Save Files Locally

Save all files to:

```
tasks/house_call_pro_tasks/customer_houses/{customer_name}/
```

Required files:

| File | Description |
|---|---|
| `house_original.png` | Street View image of the property without google interfaces |
| `door_only.jpg` | Door-only render from Renoworks  |
| `door_visualization.jpg` | Full-size rendered house + new door composite without google interfaces |

---

## Step 6 — Upload Image to HCP Estimate

Run two shell commands — that's it:

```bash
# 1. Copy to inbound
cp tasks/house_call_pro_tasks/customer_houses/{customer_name}/door_visualization.jpg \
   /home/ommited/.openclaw/media/inbound/{customer_name}_door_visualization.jpg

# 2. Run the upload script
EST_ID="{estimate_id}" \
IMAGE_PATH="/home/ommited/.openclaw/media/inbound/{customer_name}_door_visualization.jpg" \
node tasks/house_call_pro_tasks/playwright/steps/customer_image/step_upload_image.js
```

`EST_ID` accepts both `est_xxx` and `best_xxx` formats.

The script handles everything: opens the dialog, clicks Upload tab, sets the file, triggers React, saves the crop. When it prints `✅ DONE` the image is in the Option slot. If it times out on the confirmation step but printed "Clicked Save" — check with a screenshot; the upload likely worked anyway.

> ⚠️ Do NOT use `browser action=upload` or the Attachments section. Neither works. Only this script works.

---

## Step 7 — Rename the Option

### Name format
```
{size} {brand} {model} {design} / {color}
```
Examples: `16x7 C.H.I. 4283 Long Panel / White` · `8x7 C.H.I. 5983 Short Panel / Almond` · `16x7 C.H.I. 2347 Planks / Cedar Woodtone`

### Exact steps — no exploration needed

**1. Open the Edit option dialog** — run this JS in a browser evaluate:
```javascript
// Clicks the Edit button with the highest Y on the page = the option body edit
Array.from(document.querySelectorAll('button[aria-label="Edit"]'))
  .sort((a, b) => b.getBoundingClientRect().y - a.getBoundingClientRect().y)[0]
  .click();
```
The **"Edit option"** dialog opens. It has an **Option name** field and an **Option description** field.

**2. Fill the name field and save:**
```javascript
// Use browser act kind=fill with the Option name textbox ref from snapshot
// OR use evaluate:
document.querySelector('[role="dialog"] input[type="text"]').value = '';
```
Then use `browser action=act kind=fill fields=[{ref: "<textbox ref>", value: "<name>"}]` and click Save.

The dialog ref for the name field is always the first textbox in the `[role="dialog"]`. Get it from a snapshot after the dialog opens, then fill and click Save.

---

## Completion

1. Verify all 3 files exist locally and are non-zero size.
2. Verify `door_visualization.jpg` was uploaded to the HCP estimate Option #1 image slot ("Replace" button visible).
3. Verify the option name was updated (no longer "Option #1").
4. Report back: customer name, address, files saved, option name used, and the path.
5. If any step failed (invalid address, door config not found, upload error), report exactly what was skipped and why.
