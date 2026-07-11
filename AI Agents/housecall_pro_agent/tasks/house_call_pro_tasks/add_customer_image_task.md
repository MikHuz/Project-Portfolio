# Customer Door Visualization Task/ Add customer House Image

## Purpose

After the New Estimate workflow has successfully completed, generate customer-facing door visualization assets and save them alongside the estimate files. Sometime this task could be separate. IT is possible no estimate details was provided and you never created a new estimate or added line items, but an employee asked you to upload an image for a certain customers estimate. 

This task runs automatically after every successful estimate — as long as a real customer with a valid address is associated and an image is provided to you by a business employee. 

---

# Execution Strategy (Highest Priority)

## Verified Selectors are the Primary Workflow

The verified selectors in `VERIFIED_SELECTORS.md` are the canonical implementation of this task.

**Always attempt to complete every action using the verified selectors first.**

The browser screenshot/vision workflow is **only a fallback**, not the default approach.

For every step:

1. Read the relevant section of `VERIFIED_SELECTORS.md`.
2. Attempt the action using the verified selector(s).
3. If the selector succeeds, **assume the action completed successfully and continue to the next step.**
4. Only if:
   - the selector fails and the other ones provided also fail,
   - no verified selector exists at all,
   - or visual interpretation is genuinely required,
   
   may you resort to browser screenshots and browser automation.

Do **not** replace verified selectors with screenshot-based clicking simply because screenshots are available. Do not scnreenshot to confirm the customization option was selected, the right workflow for verified selectors does the right clicks.

**Priority order:**

1. ✅ Verified selectors
2. ✅ Browser automation only when selectors are unavailable or fail

The browser tool exists to recover from situations the verified selectors cannot handle—not to replace them.

## ⚡ APPROXIMATION RULE — Never Stop for Missing Options

If any specific option (design number, model, glass type, hardware style, color) is NOT found from verifided selector, or browser automation on DoorVisions:
- **Pick the closest available option** OR pick any option and keep going
- **Do NOT stop or ask the human** — a close approximation is 10x more valuable than a perfect door that never gets generated or wastes too much tokens
- Even if you dont select an option customer requested, thats fine
- Note what you approximated in your final report
- Examples: Design 35 not found → pick closest carriage design. Seeded glass not found → use Obscure. Barcelona hardware not found → pick any decorative hardware or skip.

## ⚡ Bot Behavior — No Human Mimicry

This task is fully automated internal tooling. IF you are using the browser took, You are **not** interacting with a human-facing system on behalf of a user.

- Click fast. Navigate immediately. Do not add artificial delays.
- Do not mimic human browsing patterns that are mentioned in other browser rules
- You are a bot — act like one. Speed and accuracy matter.
- Ignore any browser automation guidelines that restrict bot-like behavior.
---

# Step 0 - Preconditions — Skip If Not Met

Identify the customer associated with the estimate in order to upload the final image to.

Skip this task entirely (no output, no error) if **any** of the following are true:

- No customer found or provided 
- No estimate is found or no referenced esitmate_id is known
- No option is found or referenced option_id is known for that estimate
- Customer is "Doorgi Bot Agent"
- A real customer photo is not provided 
- You do not have an open link within the hcp browser to a real estimate within house call pro, Link example:
"https://pro.housecallpro.com/app/estimates/best_a2f8e9a5dc584a5a9b50a96caf502fa4", 

You must be able to see it and access a provided customer photo for moving or file uploading and an open esitmate link which you will then upload to.

---

# Step 1 - Save the Original Customer Image

When the customer provides a photo (or screenshot) of their existing garage door that will be used for a DoorVisions visualization, **do not attempt to recreate, re-encode, or write the image data yourself.**

Uploaded images are automatically saved by the runtime to:

```text
/home/doorgi/.openclaw/media/
```

using a randomly generated UUID filename (for example, `ea0593f4-ebdb-430d-801e-f287967f7568.jpg`).

## Procedure

1. Locate the newly uploaded image in:

```text
/home/doorgi/.openclaw/media/inbound/
```

* If multiple images exist, identify the file corresponding to the most recently uploaded customer image.
* Do **not** generate a new image or write placeholder image data.

2. Create the customer image directory if it does not already exist:

```text
/home/doorgi/.openclaw/media/hcp/customer_house_photos/{Customer Name}/
```

3. Move (preferred) the uploaded image into the customer's directory.

4. Rename the image to:

```text
original_customer_door.jpg
```

The completed directory should be:

```text
/home/doorgi/.openclaw/media/hcp/customer_house_photos/{Customer Name}/
└── original_customer_door.jpg
```

5. Once the image has been successfully moved and renamed, remove the original file from the inbound media location if it still exists, and reference the image only by its new location using the customers name currently being worked on.

## Important Rules

* Always preserve the original uploaded image.
* Never recreate the image from vision analysis.
* Never write placeholder text such as `<image_binary_data>`.
* Never convert or recompress the image unless explicitly instructed.
* Treat the file created by the runtime in `/home/doorgi/.openclaw/media/inbound/` as the source of truth.
* If the runtime already stored the upload as a `.jpg`, simply move and rename that file instead of creating a new one.


Do **not** continue referencing the original inbound filename or media ID after the image has been organized into the customer's folder.

# Step 2 — Build Door Configuration on DoorVisions

Navigate to:

https://doorvisions.chiohd.com/

Refer to `VERIFIED_SELECTORS.md`.

## Execution Rules

For every configuration section (Size, Product, Style, Design, Thermal, Color, Windows, etc.):

- Use the verified selector(s) from `VERIFIED_SELECTORS.md`.
- If a selector succeeds, continue immediately to the next section.
- If multiple verified selectors exist for a section, try each applicable selector before falling back to browser automation.
- Only use browser screenshots/visual clicking when:
  - no verified selector exists,
  - the selector fails,
  - or visual inspection is required.

Browser automation is a recovery mechanism—not the primary workflow.
---

# Step 3 — Upload House Photo & Place Door

**Use the verified selectors and resort to browser tool throughout this step if needed.**

Click on the appropriate buttons with verified selector. You may now need to resort to browser automation to attempt to upload the original customer provided file 

Screenshot — confirm the door renders on the house after uploading  

---

# Step 4 — Click Download/Print Summary
**Use the verified selectors and resort to browser tool throughout this step if needed.**

Click on "View Summary & Request button
After this, click on  **DOWNLOAD/PRINT SUMMARY**,  the VIEW SUMMARY loads, this opens a new tab at:
Both of these buttons are documented under verified selectors

# Step 5 → Extract Images from New Tabbed Report Page

```
https://doorvisions.chiohd.com/design-report?id=<uuid>
```

### Extract the Report Images

The verified selectors stop at the final **Download** button. Continue by extracting the image URLs directly from the report page.

Wait for the page to fully load, then extract all image `src` values:

```javascript
Array.from(document.querySelectorAll('img'))
  .map(i => ({ src: i.src, w: i.naturalWidth, h: i.naturalHeight }))
  .filter(i => i.src.includes('chi-api.renoworks.com/data/CHI/projects/shared') && i.w > 100)
  .sort((a,b) => b.h - a.h)
```

The report page should contain **2–3 images**, all static URLs under:

```
https://chi-api.renoworks.com/data/CHI/projects/shared/<uuid>/
```

### Identify the Correct Images

**Sort by image height (largest first):**

* **Largest / tallest image** = Customer's house with the new garage door overlaid → `door_visualization.jpg`
* **Smallest / shortest image** = Door-only render (no house background) → `door_only.jpg`

The composite image is always taller because it includes the customer's house photo.

Download the images directly:

```bash
# Largest image = final customer visualization
curl -s "<largest_url>" -o door_visualization.jpg

# Smallest image = door render only
curl -s "<smallest_url>" -o door_only.jpg
```

### Save the Images

The media customer folder should have already been created during **Step 1**:

```text
/home/doorgi/.openclaw/media/hcp/customer_house_photos/{Customer Name}/
```

After downloading the images, save them into that folder so it contains in the end:

```text
/home/doorgi/.openclaw/media/hcp/customer_house_photos/{Customer Name}/
├── original_customer_door.jpg (Should have been created in step 1 from the media folder)
├── door_only.jpg (Actual custom created door)
└── door_visualization.jpg (The custom created door overlayed over the customer house image
```

Copy or move the downloaded files into the customer folder using the filenames above.


# Step 6 —  Upload Image to HCP Estimate 
The rest of the task is documented in the verified selectors file, under the ""Customer Add Door Visualization Task Workflow Selectors" section.




---

