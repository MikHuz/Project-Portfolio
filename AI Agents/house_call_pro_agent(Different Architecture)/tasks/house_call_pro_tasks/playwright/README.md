# Playwright Step Architecture

Modular Playwright scripts for HousecallPro estimate automation.
Each step does **one job**, fails loudly with useful info, and can be re-run independently.

```
playwright/
  lib/
    hcp_helpers.js        ← shared: CDP connect, navigation, add items, verify
  steps/
    step_services.js      ← add warranty + install fee (Service Price Book)
    step_door.js          ← walk card tree N levels deep → add door config
    step_material_direct.js ← navigate direct to known category ID → add item
    step_explore.js       ← debug: print cards/rows at any path or category
    step_verify.js        ← read back all current line items from estimate
  README.md
```

---

## How I Use These (as the AI agent)

When an estimate comes in:

1. **I generate a small run plan** — which steps, in which order, with which args
2. **I run steps one at a time** via `exec`
3. **If a step fails**, the error output shows exactly what WAS available (cards/rows)
   — I generate a corrected step and re-run just that step
4. **I run `step_verify`** at the end to confirm everything landed

---

## Env Var Pattern

All steps take their inputs as environment variables so I can parameterize them without
editing files each time. Example run:

```bash
EST_ID=est_abc123 \
SERVICE_CAT=pbcat_bbbe74dd... \
INSTALL_ITEM="Standard Two Car" \
node steps/step_services.js
```

---

## step_services.js

Adds warranty + installation fee.

| Var | Required | Description |
|-----|----------|-------------|
| EST_ID | ✓ | Estimate ID |
| SERVICE_CAT | ✓ | Service category ID (e.g. One Car Garage, Two Car Garage) |
| INSTALL_ITEM | ✓ | Row fragment for install fee (e.g. "Standard Two Car") |
| WARRANTY_ITEM | — | Row fragment for warranty (default: "Warranties") |

---

## step_door.js

Walks the material card tree up to N levels and adds a door item.
This is the script for deep paths (e.g. Brand → Size → Design → Windows → Insulation → Color).

| Var | Required | Description |
|-----|----------|-------------|
| EST_ID | ✓ | Estimate ID |
| CARD_PATH | ✓ | JSON array of card labels, in order |
| ITEM | ✓ | Final row fragment to add as Material |

Example:
```bash
EST_ID=est_abc \
CARD_PATH='["C.H.I. Doors","15x7","Flush","Long Windows","Insulated (Medium Duty)"]' \
ITEM="Black" \
node steps/step_door.js
```

On failure, prints all available cards at the level where it broke.

---

## step_material_direct.js

Navigate directly to a known material category ID and add an item.
Use for stable categories: tracks, openers, A-Z repair items.

| Var | Required | Description |
|-----|----------|-------------|
| EST_ID | ✓ | Estimate ID |
| MAT_CAT | ✓ | Material category ID |
| ITEM | ✓ | Row fragment to add |

---

## step_explore.js

Debugging / path discovery. Navigate anywhere and print what's there.

| Var | Required | Description |
|-----|----------|-------------|
| EST_ID | ✓ | Estimate ID |
| MAT_CAT | — | Material category ID |
| SVC_CAT | — | Service category ID |
| PB_URL | — | Full URL override |
| CARD_PATH | — | JSON array of cards to click before printing |

No MAT_CAT/SVC_CAT/PB_URL = starts at material root.

---

## step_set_quantity.js

Set the quantity of an existing line item on the estimate page.
Use this instead of trying to click quantity buttons via browser snapshots — it's far more reliable.

| Var | Required | Description |
|-----|----------|-------------|
| EST_ID | ✓ | Estimate ID |
| ITEM | ✓ | Name fragment of the line item (case-insensitive) |
| QTY | ✓ | New quantity as integer |

Example:
```bash
EST_ID=est_abc ITEM="Standard One Car" QTY=2 CDP_URL=http://127.0.0.1:18802 node step_set_quantity.js
EST_ID=est_abc ITEM="Copy of Warranties" QTY=2 CDP_URL=http://127.0.0.1:18802 node step_set_quantity.js
```

---

## step_apply_discount.js

Apply a percentage or fixed dollar discount to an estimate.

| Var | Required | Description |
|-----|----------|-------------|
| EST_ID | ✓ | Estimate ID |
| DISCOUNT | ✓ | Discount value (e.g. `15` for 15%) |
| DISCOUNT_TYPE | — | `percent` (default) or `fixed` |

Example:
```bash
EST_ID=est_abc DISCOUNT=15 CDP_URL=http://127.0.0.1:18802 node step_apply_discount.js
EST_ID=est_abc DISCOUNT=50 DISCOUNT_TYPE=fixed CDP_URL=http://127.0.0.1:18802 node step_apply_discount.js
```

---

## step_verify.js

Read back all current line items.

| Var | Required |
|-----|----------|
| EST_ID | ✓ |

---

## Known Stable Category IDs

All IDs are stable across estimates (only the `est_xxx` prefix in the URL changes).

### Service IDs
Service price book root: `/price_book`  
Industry level: `/price_book/industries/{pbind_id}`  
Category level: `/price_book/categories/{pbcat_id}`

```
pbind_c98cd2302c0c406e9a9e57843dbfaa6b  // Industry: Garage (discovered 2026-06-11)
pbcat_4e1f8f47b77c46bd8a3e71ce0bd79799  // Service: Garage Door Installation (parent - One Car, Two Car, Misc) (discovered 2026-06-11)
pbcat_bbbe74dd06e54ef597c6062d4d2c4ca8  // Service: One Car Garage (install + warranty) (discovered 2026-06-10)
pbcat_fba1a1920c4b4fac8e3d05c29b5f4f5e  // Service: Two Car Garage (install + warranty) (discovered 2026-06-11)
```

Install item names inside Two Car Garage:
- `Warranties` — warranty ($0)
- `Standard Two Car` — Standard Two Car Garage Door Installation ($695)
- `Large Two Car` — Large Two Car Garage Door Installation (for doors wider/taller than 16x7)
- `Tilt-up` — Two Car Tilt-up to Sectional Door Opening Conversion ($295)

Install item names inside One Car Garage (`pbcat_bbbe74dd06e54ef597c6062d4d2c4ca8`):
- `Copy of Warranties` — warranty ($0) ⚠️ NOTE: One Car uses "Copy of Warranties", Two Car uses "Warranties"
- `Standard One Car` — Standard One Car Garage Door Installation ($695)
- `Large One Car` — Large One Car Garage Door Installation
- `Tilt-up` — One Car Tilt-up to Sectional Door Opening Conversion ($195)

### Material IDs
Material root: `/price_book/material_categories`

```
// Installation Hardware
pbmcat_2d298335bcd54fecab92ff23c517420b  // Installation Hardware > Tracks (32", low headroom, etc.)
  // Item fragments confirmed in this category:
  // "7'0'' Low Headroom" → 7'0'' Low Headroom Track ($150) — use for doors 6'6"-7'0" with low headroom
  // "Low Headroom Tracks" → Low Headroom Tracks ($220) — standard low headroom
  // "32-inch" → 32-inch horizontal tracks ($224.63)

// C.H.I. Doors
pbmcat_a8afc9cbaac6457eb4567bcd0daad948  // C.H.I. FREE UPGRADES (15"/20" radius tracks, premium rollers, window black frames) (discovered 2026-06-11)

// Openers
pbmcat_68c335308e7744f4ac045d87c5c07007  // Openers > 7ft Rail (Chamberlain, LiftMaster Essential/Plus/Premium/Heavy Duty, Linear)
```

Opener item name fragments (in 7ft Rail category):
- `Essential` — Essential LiftMaster 2420L Chain Drive ($699)
- `Plus` — Plus LiftMaster 6580L Belt Drive ($849)
- `Premium` — Premium LiftMaster 6690L Belt Drive ($999)
- `Heavy Duty` — HeavyMaster 4690L ($1,099)
- `Chamberlain 1/2 HP` — Chamberlain 1/2 HP Smart Belt Drive ($550)

### C.H.I. 8x7 Door — Confirmed Path (2026-06-11)
- CARD_PATH: `["C.H.I. Doors", "8x7", "Raised Panel", "Long Panel", "Non-Insulated (Standard Duty)"]`
- Colors available: White, Almond
- Perimeter Seal available at same final level; ITEM fragment: `"Perimeter Seal"`
- Note: 8x6'6" is NOT in the price book — use 8x7 as closest substitute

### C.H.I. 16x7 Door — Confirmed Paths (2026-06-11)
- Non-Insulated: CARD_PATH `["C.H.I. Doors", "16x7", "Raised Panel", "Long Panel", "Non-Insulated (Standard Duty)"]`
  - Colors available: White, Almond, Black
  - Door item fragment: `"White"` (or color name)
  - Perimeter Seal: `"Perimeter Seal"` ($151.24), Wood Accent: `"Wood Accent Perimeter Seal"` ($302.48)
- Insulated Medium Duty: CARD_PATH `["C.H.I. Doors", "16x7", "Raised Panel", "Long Panel", "Insulated (Medium Duty)"]`
  - Colors available: White, Almond, EVERGREEN, Wood Accent ANY
  - Perimeter Seal: `"Perimeter Seal"` ($156.78), Wood Accent: `"Wood Accent Perimeter Seal"` ($313.56)
- Note: 16x7 is standard two-car size (NOT large two-car)

### Notes on Service Navigation
The service price book URL structure is different from materials:
- Root: `/price_book` (NOT `/price_book/categories`)
- Use `PB_URL` with `step_explore.js` when exploring service categories
- After discovering a `pbcat_xxx` ID, `step_services.js` uses `pbServiceUrl()` which correctly builds `/price_book/categories/{id}`
