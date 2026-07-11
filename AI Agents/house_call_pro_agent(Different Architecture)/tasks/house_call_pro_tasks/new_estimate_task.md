# Housecall Pro - New Estimate Creation Task

## Task Trigger
This task is triggered **only** when the user sends a message through the session chat or Telegram that clearly indicates a request to create a **new estimate** (e.g. "new estimate", "create estimate for", "quote for customer", etc.) OR sends a new estimate details info that clearly shows info for a new estimate.

**This task should ONLY be executed when explicitly commanded by the user.**

> 📅 **SCHEDULING — Now Enabled**
> Once an estimate is open, scheduling is done from the **left sidebar** on the estimate page.
> - There is a section in the left sidebar to **assign a team member** and **set a date and time** for the job.
> - If the estimate message includes a date, time, or technician name → fill in the schedule fields in the left sidebar.
> - If no schedule info is provided → leave it blank.
> - "for ommited", "tomorrow at 6pm", "schedule for Monday" etc. are scheduling instructions — use them.

> ⚠️ **Multi-option estimates**: If the estimate describes multiple door options (e.g. "Option 1: Carriage House, Option 2: Skyline"), **do NOT use HCP’s built-in Options feature**. Add all items as a single flat list. Describe the options in Private Notes so the reviewer can separate them manually if needed.

## Important Platform Notes
- This is an **internal operational platform** used only by Garage Doors team. It is **not user-facing**.
- Because this is an internal tool, the agent is **explicitly allowed to ignore normal browser_bot_behavior guidelines**. You may click fast, use bot-like behaviors, navigate quickly, and optimize for speed rather than mimicking human patterns. You may ignore human mimicry as defined in system/browser_rules

## Required Reference Files
**Read these files immediately at the start of the task:**
- `price_book_structure.md` — business logic, insulation tiers, brand map, rules
- `playwright/README.md` — step scripts, env var reference, known stable category IDs

## Automation Architecture (Hybrid Approach)

This task uses a **hybrid browser automation strategy**. Do not use one approach for everything.

### OpenClaw Browser Tool (snapshot + act)
Use for the **outer shell** — anything before and after the price book:
- Navigate to HCP home
- Click New → Estimate
- Fill customer name and private notes
- Save the estimate (get stable `est_id`)
- Recovery/diagnosis: snapshot when a Playwright step fails to understand current state

### Playwright Step Scripts (CDP via exec)
Use for all **price book work** — faster, reliable with dynamic modal content:
- Located in `tasks/house_call_pro_tasks/playwright/steps/estimate/`
- All steps share logic from `tasks/house_call_pro_tasks/playwright/lib/hcp_helpers.js`
- Steps are parameterized by env vars — **never edit step scripts per estimate**
- Run via `exec` with the appropriate env vars

| Step script | When to use |
|---|---|
| `step_services.js` | Add warranty + install fee (requires `SERVICE_CAT` ID) |
| `step_door.js` | Walk card tree for door config (Brand→Size→Design→Windows→Insulation→Color) |
| `step_material_direct.js` | Jump directly to known category ID (tracks, openers, A-Z items) |
| `step_explore.js` | Debug: print cards/rows at any path when you need to discover structure |
| `step_verify.js` | Read back all line items to confirm what landed |

### Navigation Strategy
- **If a stable category ID is known** → use `step_material_direct.js` or `step_services.js` (fastest)
- **If no ID is known** → use `step_door.js` with `CARD_PATH` for card walking, OR `step_explore.js` to discover first
- **If a Playwright step fails** → snapshot with the browser tool to diagnose, then correct env vars and re-run

## 📝 Keeping Documentation Current (MANDATORY after every run)

After every estimate run — successful or partial — update the reference files with anything new learned:

### Update `playwright/README.md` when you discover:
- A new stable category ID (`pbcat_xxx` or `pbmcat_xxx`)
- A new item name fragment that was confirmed to work
- A new URL pattern or navigation quirk
- A bug fix or workaround applied to a step script

### Update `price_book_structure.md` when you discover:
- A new brand, design, or navigation path structure
- A sub-level that wasn't previously known (e.g. design → sub-style → insulation)
- A difference in item naming between categories (e.g. warranty names by door size)
- A category that contains something unexpected (e.g. tracks in FREE UPGRADES not Installation Hardware)
- Any rule about how items are structured, priced, or positioned in the price book

**Do this before reporting completion.** These files are the institutional memory for all future agents — if you learned it and don't write it down, the next agent starts from scratch.

---

## Storing Newly Discovered Stable Category IDs ⚠️

After any estimate run, **update `playwright/README.md`** with any new stable category IDs discovered.

**What to store (non-door-combo IDs only):**
- Service categories (install sizes, warranty, misc services)
- Material categories that are NOT door-specific combinations (tracks, openers, A-Z repair, seals)
- Brand root IDs and size-level IDs (e.g. "C.H.I. Doors root", "C.H.I. 15x7 root")
- Free Upgrades category IDs

**What NOT to store as stable IDs:**
- Deep door combos (Brand→Size→Design→Windows→Insulation→Color) — too many combinations, use `step_door.js` card walking for these

**Format to add to README.md Known Stable Category IDs section:**
```
pbcat_xxx   // Service: <description> (discovered YYYY-MM-DD)
pbmcat_xxx  // Material: <description> (discovered YYYY-MM-DD)
```

## Step 1 — Read the Full Estimate First ⚠️

## Typical Estimate Structure
When processing a new estimate request, expect the following information in the customer's message:

- Customer name
- Door type, size + track size. 
- Door brand + design name
- Window type and position
- Window inserts
- Insulation type (use tier names, not model numbers)
- Motor / opener type


This isn't set in stone — estimates come in many formats and orders.


**Before touching the browser or price book**, read the entire estimate message carefully and identify:

1. **Brand** — Match against the known brands below. Do this FIRST before navigating.
2. **Door size** (e.g. 15x7, 16x8) + possible track size
3. **Design / style name**
4. **Window type and position** (or no windows)
5. **Insulation level** — use the tier names: Non-Insulated (Standard Duty), Insulated (Medium Duty), Insulated (Heavy Duty), Insulated Vinyl Back (Standard Duty)
6. **Motor / opener type** (or "reinstall their motor" = no opener line item)
7. **Any repair/service items** (map to A-Z list below)
8. **Any items that clearly don't exist** — note them upfront, don't waste time hunting

## Step 2: Rules and Guidelines for Understanding What To Add and where(Important):
This step is not about action but about understanding the critical pieces of how the pricebooks will work, defaults, assumptions and paths.

### Door Size Installation/Service Fee (Service Playbook):
	- Add the appropriate **installation fee** from the **Service Price Book** based on door size (one-car, two-car, large two-car, tilt-up, etc.) This is MANDATORY. Consider "large two-car" versus "two-car" fees when applicable based on numerical dimensions. 16 x 7 dimensions is very common and is standard, anything more become a "large two car". 
	- Add the warranty/copy of warranty as well, this is MANDATORY
	- "Tilt up conversion" is optional and an additional add on for any door on top of the door installation fee located in the service playbook
	- Other conversions are also in the service playbook if requested, customer provided door installation fees are located in the "Misc" selector.
	- Any customer provided opener service is likely to be in the service playbook here too

### Door Design / Styles (Material Playbook)
This is most important section, it will typically make up the final door configuration based on the brand, design, insulation, window options, and color.
First find the brand, then the size.
Typical structure is Brand selector -> Size -> Design/Style name(may contain windows here as some designs depend on windows) -> Insulation -> Final Color + windows + small accessories selectors
Some structures have door colors before the window selectors, make sure to exhaust the paths here if you cannot find what you need
#### If you see a selector called "Doors", likely that is where the final color/configuration will be

#### Known Garage Door Brands we Uses
| Brand keyword in estimate | Price book section |
|---|---|
| C.H.I / (no brand given) | C.H.I. Doors |
| Aluma / Alumadoor | Alumadoor |
| Clopay | Clopay |
| Amarr | Amarr |
| G.D.S | G.D.S. Doors |
| Janus | Janus - Sheet Doors |
| Elegant / Custom | Elegant Custom Garage Door & Gate |

**Default: If no brand is specified, assume C.H.I.**

#### C.H.I. Design Language (common terms that indicate C.H.I.)
Words like **"raised panel", "planks", "flush", "shaker", "carriage", "overlay"** in the estimate almost always refer to C.H.I. door collections. Navigate to C.H.I. Doors first when you see these UNLESS another brand is specified.

### Perimeter seals
Seals are optional and if not specified you do not select a seal

### Color
 - Some color might not be available, this is okay, they are usually same price, choose the door that matches the other options best.
 - Wodotones are C.H.I specific, management is sightly different there

### Tracks & Other Hardware
Things that are related to actual door installation are likely to be in "Installation Hardware" in material playbook, commonly estimate might have track size, choose correct track size there.
Typically you might receive: 
- 15 inch radius FREE Upgrade 
- 20 inch Radius
- 32 inch Radius
- Low Headroom
- HI-LIFT
Not all tracks or other hardware are in installation hardware, under the brand selector there can be "FREE UPGRADES", which contains 20 inch tracks for example

> ⚠️ **Track size defaults:**
> - "Standard" tracks, "standard rails", or **no track mention at all** → **do nothing, add no track line item.** Standard 12" tracks are included with every door automatically — there is no line item for them.
> - Only add a track line item when a non-standard size is explicitly specified:
>   - "15 inch" → 15" FREE UPGRADE (C.H.I. FREE UPGRADES, pbmcat_a8afc9cbaac6457eb4567bcd0daad948)
>   - "20 inch" → 20" FREE UPGRADE (same category)
>   - "32 inch", "low headroom", "hi-lift" → Installation Hardware (pbmcat_2d298335bcd54fecab92ff23c517420b)

### Insulation — Use Tier Names, Not Model Numbers (Material playbook)
Estimate may provide a model number, but not always, Do NOT rely just on model number to determine insulation. Use context clues in the message:
- "non-insulated", "no insulation", "standard" → **Non-Insulated (Standard Duty)**
- "medium", "insulated" (generic) → **Insulated (Medium Duty)**(Only if medium exists otherwise choose first insulation option)
- "heavy", "heavy duty" → **Insulated (Heavy Duty)**
- "vinyl back" → **Insulated Vinyl Back (Standard Duty)**
- "steelback" / "steel back" → closed interior panel (both sides of door are steel). Higher-quality build. Map to **Insulated (Medium Duty)** minimum; use Heavy Duty if Medium is not available. Flag the assumption in Private Notes.
- IF NOT specified → default to NO insulation if option is available, or the first insulated tier(some doors require insulation) and flag it as assumed.

### Windows 
- Some windows are part of the design, window names/sizes might be the actual design choice. 
- If window are mentioned but not specified, default to "long windows" if there are multiple window design choices.
- Stylelite windows are separate design, they are neither long/short/oversized and contain no inserts
- Window inserts are optional, if inserts are not mentioned, you do not add any inserts
 
### Business provided Opener / Motor (Material playbook)
Most openers are going to be business provided and in the material playbook
   - **New opener (not customer-provided)**: find it in **Material Price Book → Openers**. The price listed there **already includes installation** — do not add a separate install fee.
   - All doors that are 7 foot height or below use the 7foot motor rail, the 8ft and 10ft rail is going to be be very rare. 
   - Side openers don't need a rail and are a separate selector. Usually motor number 98022 is the one(default)
   - Any small accessory like control or remote will be in the openers section here too
   - **Customer-provided opener or reinstall**: NOT the material playbook, find the appropriate service in the **Service Price Book**. These are labor-only items.
   - "No motor" or not mentioned → skip any opener selectors entirely.

### A-Z Repair / Service Items 
   If the estimate mentions any specific repair services/item, often this is the A-Z checklist, which you can find them in the **Material Price Book → A-Z Garage Door Repair** section. The checklist items and their approximate prices are:

   | Code | Item | Price |
   |---|---|---|
   | A | Emergency release / Deadbolt 
   | B | Torsion springs (x/wire/D/L) 
   | C | Torsion rod 
   | D | Center bearing 
   | E | End bearings 
   | F | Cable drums 
   | G | Load cables 
   | H | Rollers 
   | I | Hinges 
   | J | Tracks 
   | K | Brackets 
   | L | Struts
   | M | J-Arm / Plate / Bracket 
   | N | Trolley / Carriage 
   | O | Chain / Belt 
   | P | Photo eyes 
   | Q | Motor gear 
   | R | Panels condition
   | S | Garage door balance 
   | T | Nuts and bolts
   | U | Lubrication 
   | V | Limit Switches 
   | W | Wires
   | X | Switch / Remote / PIN Pad 
   | Y | Backup battery 
   | Z | Weather seal 
 Add the appropriate hardware part + installation estimate, you can also go to the service playbook and checkbox that this service contains an A-Z inspection

 ### VDS / Climate Seal / Perimeter Seal
- "VDS", "climate seal", "perimeter seal", and "weather seal" are all the same item: **Perimeter Seal** in the price book
- Found at the final door config level (same page as door colors). Add standard **Perimeter Seal** unless wood accent is specified.

### Non-Standard Door Sizes
- If the requested size doesn’t exist in the price book, **use the closest available size**
- Record the substitution in Private Notes: e.g. *"Door size 8x6'6" not found — using 8x7 as closest available"*
- Map service fee tier to the closest standard size (one-car, two-car, etc.)

### What to Ignore
   - Logistics / operational notes like "move door to neighboring house", "pick up from warehouse", etc. or something about the customer or their system — these are field notes for technicians, not price book line items. Skip them.

---

## Task Steps for a new estimate (Follow flexibly with reasoning)

### Phase 1: Find or Create Estimate Shell (OpenClaw Browser Tool)

> ⚠️ **Browser Profile**: Always use `profile="hcp"` for ALL browser tool calls in this task. This is a dedicated isolated Chromium instance (port 18802) with its own HCP login session. Never use `target: "host"` without specifying this profile.

1. **Open Chromium Browser**
   - Use `profile="hcp"` on all browser tool calls.
   - Navigate to: `https://pro.housecallpro.com/app/estimates`
   - Assume the correct user is already logged in via session cookies. If not, inform the user.

2. **Look for an Existing Unfinished Estimate First (DEFAULT PATH)**

   > 🚫 **DO NOT go to the Customers section** unless the message explicitly says "new customer" or "create customer". Do NOT navigate to the customer dashboard to look up the customer — go straight to the Estimates section.

   **Search in Estimates for an existing pending/unfinished estimate:**

   > 💡 **Strong signal**: If the message says "I just visited", "I was just at", "just came from", or otherwise implies the tech was recently at a customer's location — **an estimate almost certainly already exists**. Go straight to the Estimates page and search by city + last 7 days. Do not create a new estimate until you've confirmed none exists.

   - On the Estimates page, filter by:
     - **Date range**: last 7 days
     - **Search/name**: customer name or city from the estimate message
   - Scan the first page of results — phonetic name match is fine (voice notes are often misspelled)
   - Look for estimates in **"Scheduled"**, **"In Progress"**, or **draft/unfinished** status
   - Open the matching estimate and check: does it have line items already?
     - **If empty/unfilled** → use this estimate. Add a new Private Note. Skip to Step 4.
     - **If already filled** → create a new estimate (Step 3 below).
   - If no match found on first page → proceed to create a new estimate (Step 3).

3. **Create New Estimate (only if no existing estimate found)**

   > 📅 **Schedule section**: If the estimate message includes a date, time, or tech name, fill in the Schedule fields **while on the new estimate page (`/app/estimates/new`) BEFORE saving**. Do NOT use the Schedule button that appears after the estimate is saved — that opens a different scheduling dialog which should not be used.
   > - Set date, time, and assign the team member in the left sidebar of the new estimate form
   > - **Always uncheck "Notify customer"** before saving the schedule
   > - "ommitted" in estimate messages = **Roman H** in HCP
   > - If nothing is specified, leave schedule blank

   #### Detect: Is this a NEW customer or an EXISTING customer?

   | Signal | Meaning |
   |---|---|
   | Message explicitly says "new customer" or "create customer" | **New customer** — run `add_customer_task.md` first |
   | Phone number present | **Possible new customer** — run `add_customer_task.md` first |
   | Full name + street address + ZIP | **New customer** — run `add_customer_task.md` first |
   | Name + city only, no address, no phone | **Existing customer** — create estimate and type name in customer field |
   | No customer info at all | Use  as placeholder |

   #### If NEW Customer (full address/ZIP or phone provided):
   1. Run `add_customer_task.md` first with all available info.
   2. From the resulting customer page, use the **"+ Estimate"** button to start the estimate.
   3. Continue from Step 4 below.

   #### If EXISTING Customer (name + city only):
   - Click **New → Estimate** from the top nav.
   - In the customer field, type the customer name — pick the closest phonetic match from the dropdown.
   - If not found in dropdown → use  as placeholder. Do NOT go to the Customers section to look them up.

4. **Private Notes + Save**
   - Paste the full original estimate message into the **Private Notes** field.
   - If adding notes to an existing estimate, use the **Add Note** button to create a new private note — do not edit existing notes.
   - **Click Save immediately after.** Do not proceed to line items until the estimate has a saved ID.
   - Capture the `est_id` from the URL (format: `est_abc123...`). All Playwright steps need this.

### Phase 2: Add Line Items (Playwright Steps via exec)

Run from: `tasks/house_call_pro_tasks/playwright/steps/estimate/`  
All steps connect to the hcp-profile Chromium over CDP (port 18802, via `hcp_helpers.js`).

5. **Services: Warranty + Install Fee**
   ```bash
   EST_ID=<est_id> SERVICE_CAT=<pbcat_id> INSTALL_ITEM="Standard Two Car" node step_services.js
   ```
   - Look up `SERVICE_CAT` from `playwright/README.md` known IDs.
   - If not known, use `step_explore.js` to discover it, then save the ID to README.md.
   - ⚠️ **Warranty is always quantity 1, regardless of how many doors.** Only the install fee quantity should reflect the number of doors. Never set warranty qty > 1.

6. **Door Configuration**
   ```bash
   EST_ID=<est_id> CARD_PATH='["C.H.I. Doors","15x7","Skyline",...]' ITEM="Black" node step_door.js
   ```
   - Build `CARD_PATH` from the estimate details (brand → size → design → windows → insulation).
   - If a card label is uncertain, run `step_explore.js` first with a partial path to see what’s available.
   - Color is often unspecified — flag it to the user if so.

7. **Tracks, Opener, and Other Materials**
   ```bash
   EST_ID=<est_id> MAT_CAT=<pbmcat_id> ITEM="20 IN" node step_material_direct.js
   ```
   - Look up `MAT_CAT` from `playwright/README.md` known IDs.
   - If not known, use `step_explore.js` to discover the category ID, then save it to README.md.

   ### If a door brand/model CANNOT be found ⛔
   - **Stop adding door-specific items for that door**.
   - Add any other items that can be found. Save in current state.
   - Inform the user exactly what could not be found.

### Phase 3: Verify + Save

8. **Verify Line Items**
   ```bash
   EST_ID=<est_id> node step_verify.js
   ```
   - Confirm expected items appear. Flag anything missing.

9. **Save and Finalize**
   - Save the estimate once all available items are added.
   - **DO NOT send any estimate in the app to the customer.**
   - Update `playwright/README.md` with any newly discovered stable category IDs.
IMPORTANT Notes: 
IF duplicate items are added and the agent cannot find a way to delete them in short time, move on and add the other items.
If estimate has one customer and multiple doors, add all those doors under the same estimate.

**⚠️ Quantity Rule — Set Quantity BEFORE or IMMEDIATELY After Adding. Never Add Twice.**

**THE RULE:** Decide the quantity in your head FIRST. Add the item ONCE. Then immediately set quantity if > 1.

- ❌ **WRONG**: Add item → check count → add again → delete duplicate → fix quantity
- ✅ **RIGHT**: Decide quantity needed (e.g. 2) → add item ONCE → go to estimate page → click quantity button → set 2

The **quantity button** is on the estimate line item (next to the "+service" button), NOT inside the price book modal. After adding an item, close the price book, go to the estimate, and set quantity there.

- If multiple doors or items are identical → add ONCE, set quantity
- If items are genuinely different (different configs, sizes, etc.) → add as separate line items
- Never use "add again to increment count" — always use the quantity button after the first add

**⚠️ Multi-Option Estimates — Quantity Pre-Planning (MANDATORY)**

Before adding ANY line item on a multi-option estimate, **run step_verify.js first** to see what is already on the estimate. Then plan quantities upfront:

- **Shared items** (warranty, install fee, tracks) that apply to ALL options → add ONCE, set quantity = number of options
- **Option-specific items** (door configs, openers) → add each separately as distinct line items
- **Never add a shared item multiple times** — e.g. if there are 2 options, warranty is added ONCE with quantity 2, not added twice

Example for a 2-door estimate:
- Warranty: add once, **qty = 1 always** (never more than 1, regardless of door count)
- Install fee: add once, set qty = number of doors
- Door Option 1 (non-insulated White): add once, qty = 1
- Door Option 2 (insulated White): add once, qty = 1
- Tracks: add once, qty = 1 (shared)
- Opener Option 1 (Essential): add once, qty = 1
- Opener Option 2 (Premium): add once, qty = 1
---

## Final Output to User
After saving, send a clear message to Telegram (if message was received from there) or session chat that includes:
- Confirmation the estimate was created + estimate number/link
- Any items added with assumed values (e.g. assumed insulation level)
- Any items that **could not be found** in the price book
- Any information missing from the request that prevented a complete estimate

Partial estimates are acceptable — it is expected for the human to review, add, and finalize. Add what you can as best you can and clearly flag gaps. Do not make very long messages.

---

## Phase 4: Customer Door Visualization (run after estimate is saved)

After the estimate is complete and the final output message has been sent, **immediately begin the `add_customer_image` task** as defined in `tasks/house_call_pro_tasks/add_customer_image_task.md`.

This runs inline — do not spawn a separate sub-agent for it. Just continue the workflow.

Preconditions are checked inside that task — if the customer is Bot Agent or has no valid address, it will end silently with no action needed.

---
