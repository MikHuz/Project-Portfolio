# Doorgi Garage Doors - Pricebook Structure

This file outlines the structure of the pricebook but isn't meant to act as a set in stone guide, be intelligent in navigating the system. 

## Services / Services Pricebook

This pricebook contains many(but not all) **service-related** pricing and fees for Doorgi Garage Doors, but particularly is important for actual door installation fee.

It includes:
- Garage door installation labor fees, differentiated by:
  - One-car garage door
  - Two-car garage door
  - Tilt-up / single panel doors
  - Other specialty installations
- All warranty-related labor and service fees or selectors
- Customer-provided garage door opener installation fees
- Other misc labor/installation, service calls, sensors, or installation charges
- A-Z repair selector (but not the individual prices)

This book is used for quoting labor, repairs, and service work that is not tied to selling a full new door system.

---

## Materials / Material Pricebook

This is the primary pricebook used for configuring and quoting complete garage door systems and related hardware and what is most likely to be have most items added.

It holds the full configuration of customer-requested doors across various brands and contains pricing for:

- Complete garage door systems (various brands, sizes, and configurations)
- All surrounding hardware and add-ons needed for the door integrated with installation fee
- Business-provided garage door openers (with installation fees integrated into the pricing)
- A-Z common repair services plus material pricing such as springs, cables, garage door drums, tracks, etc.

### Typical Structure of the Material Pricebook

The material pricebook is organized with an outer navigation section containing notable sections including:
- Garage Door Brand Selectors
- Garage Door Opener Installation 
- A-Z Repair+Parts pricing selector
- Common hardware installations

Inside the **Garage Door Brand Selector** you will typically see this in depth order:
1. Numerical size selector (width × height)
2. Design / style names — some designs have sub-levels (see CHI notes below)
3. Window selector and options
4. Insulation levels and types + Window insert options

Finally, it presents a comprehensive list of many possible combinations that combine the above options with their corresponding prices. It shows the final door differentiated by color (so effectively you are just choosing color at the end), plus window position + style selectors if customer requested.

### Warranty Item Name Differs by Door Size
⚠️ **One Car Garage** service category uses: `"Copy of Warranties"`
⚠️ **Two Car Garage** service category uses: `"Warranties"`
Do NOT assume both are the same — always match to the size you're working in.

### Tilt-Up Conversion
- Available in **both** One Car and Two Car service categories
- Item fragment to search: `"Tilt-up"`
- One Car price: $195 | Two Car price: $295
- It is a separate SERVICE add-on — must be added in addition to the install fee and warranty

### C.H.I. Door Design Tree — Key Structural Notes

**Raised Panel has sub-levels (not direct to insulation):**
```
C.H.I. Doors → {size} → Raised Panel → Long Panel → {insulation} → items
                                      → Short Panel → {insulation} → items
```
"Long Panel" and "Short Panel" are subcategories inside Raised Panel, not separate top-level designs.

**Skyline and other flush-style designs go directly to windows:**
```
C.H.I. Doors → {size} → Skyline → No or Short Windows → {insulation} → items
                                 → Long Windows → {insulation} → Doors
                                                              → Windows on Top
                                                              → Windows on Left
                                                              → Windows on Right
```
The "Doors" subcategory = door color selection. "Windows on Top/Left/Right" = separate window glass type items (Plain, Obscure, Tinted, Frosted) — these are SEPARATE line items from the door itself.

**FREE UPGRADES (tracks) location:**
- 20" and 15" radius tracks are in `C.H.I. Doors → FREE UPGRADES`, NOT in Installation Hardware
- Installation Hardware only has: Low Headroom, 8'-12" Double Track, 32" tracks, and seals
- CHI FREE UPGRADES ID: `pbmcat_a8afc9cbaac6457eb4567bcd0daad948`

**Track size defaults — critical:**
- **Standard 12" tracks are bundled with the door — no line item exists for them, don't go looking**
- "Standard tracks", "standard rails", or no track mention → skip entirely, nothing to add
- Only add a track line item when explicitly specified as non-standard: 15", 20", 32", low headroom, or hi-lift

### Multiple Doors in One Estimate
- All doors go in the same estimate (do not create separate estimates per door)
- **If doors share the same config** (same brand/size/design/insulation/color): add the door item ONCE, then use the quantity button (next to the "+service" button on the line item) to set quantity = number of doors
- **If doors have different configs**: add each as a separate line item
- Same rule applies to any repeated material/service (tracks, seals, warranties, install fees, tilt-up): if identical, add once + set quantity
- **Different openers**: always add separately (they are distinct items)

### Multiple Options — DO NOT USE the HCP Options Feature
- HCP has a "New option" button that creates Option 1 / Option 2 tabs on an estimate
- **Do not use this feature.** Price book item routing to specific options via Playwright is unreliable — items do not isolate to the active tab as expected
- If an estimate has multiple door options (e.g. "Option 1: Stamped Carriage House, Option 2: Skyline"), add ALL items as a flat single list in one estimate
- Label items in Private Notes so the human reviewer knows what belongs to each option
- The human can split into HCP options manually if needed

### VDS / Climate Seal / Perimeter Seal
- "VDS", "climate seal", "perimeter seal", and "weather seal" all refer to the **Perimeter Seal** item in the price book
- It is found at the final door configuration level (same page as door colors)
- Two variants exist at most levels: standard **Perimeter Seal** (solid color, ~$111–$174) and **Wood Accent Perimeter Seal** (higher price)
- Default to standard **Perimeter Seal** unless wood accent is specified

### Non-Standard Door Sizes
- If the requested door size does not exist in the price book, **find the closest available size** and use it
- Add a note to Private Notes explaining the substitution (e.g. "8x6'6" not in price book — using 8x7 as closest available")
- Common CHI sizes available: 8x7, 9x6-9, 14x7, 15x7, 16x7, 16x8, 17x7, 18x8
- For service fees, map to the appropriate install tier by the closest standard size (one-car, two-car, etc.)
- **16x7 = Standard Two-Car** (not large two-car). Large Two Car is for sizes wider or taller than 16x7.

### Stockton Window Inserts — Two Variants Exist
- At some size/design levels, both "Stockton Window Inserts" and "4 Piece Arched Stockton Window Inserts" exist as separate items at the same price
- Fragment `"Stockton Window Inserts"` will match the non-arched version if it appears first
- Fragment `"4 Piece Arched"` targets the arched version specifically
- When in doubt, use `"Stockton Window Inserts"` (non-arched) as the default; flag to user if unsure