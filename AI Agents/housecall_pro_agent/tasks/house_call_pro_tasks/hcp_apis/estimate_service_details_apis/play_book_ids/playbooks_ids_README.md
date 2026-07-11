# Doorgi Garage Doors – Pricebook Rules

This is the main knowledge reference for interpreting garage door estimate requests and navigating the pricebook system. It is used to correctly break down business/customer requests for a garage door model plus other services into structured line items for doors, openers, repairs, and installation services. It also defines how to navigate markdown-based pricebook folders and how to correctly identify the service_item_id for API usage.

There are two playbooks:

Services:
- OPTIONAL: Tilt-Up/sectional Conversion (one car / two car)
- MANDATORY: Installation (one car / two car /custom sizes)
- OPTIONAL: Customer OPENER Installation
- MANDATORY: Warranty
- Includes installation fees, conversion fees, tilt-up fees, misc labor fees

Materials:
- MANDATORY: DOOR (Usually C.H.I)
- OPTIONAL: WINDOWS
- OPTIONAL: WINDOW DESIGNS / INSERTS
- OPTIONAL: TRACKS (15 inch free upgrade, 20 inch, 32 inch, low headroom, hi-lift, FREE Upgrades)
- OPTIONAL: PERIMETER SEAL / VDS / CLIMATE SEAL (same item)
- OPTIONAL: GARAGE DOOR OPENER / MOTOR (jackshaft, chain, belt)

# IMPORTANT TO READ THIS SECTION UNDER
All the markdown files under these two playbook folder are the documented ids and information of very commonly used requests, requiring  API requests. HOWEVER, there is plenty more materials that are not documented here that are still within the house call pro backend system, but are less common. The two API's that allow the agent to expose itself to them are documented under the parent "estimate_service_details_apis" folder, called "housecall_pro_find_materials.md". 

More information on when to call these api's based on the nuances of the estimate requests are detailed below. However as an upfront general outline, you should call these apis for the following details(including but not limited to)
- Any garage door brand that isn't C.H.I (aluma/alumadoor, Clopay, Amarr, etc.)
- Any size of a door that isn't C.H.I 16x7 or 8x7 (Primary use case)
- Gate Openers

## If a garage door estimate request clearly asks for something that is documented above(mainly garage door size), it is still valuable to read this file as it contains information on default assumptions and interpretations of requests.

## If there is a matching door playbook, all its details like color, design, window will be there, not just the garage door itself.

## Any request that is a 8x7 or 16x7 garage door must always sue the playbooks, even if doesn't find a match, ignore the get material apis if its single/double c.h.i door 
---

# Brands

| C.H.I / CHI | C.H.I. Doors |
| No brand specified | C.H.I. Doors (default) |
| Alumadoor / Aluma | Alumadoor |
| Clopay | Clopay |
| Amarr | Amarr |
| G.D.S | G.D.S. Doors |
| Janus | Janus - Sheet Doors |
| Elegant / Custom | Elegant Custom Garage Door & Gate |

Default: always assume C.H.I. Doors

If multiple designs exist and not specified → ask before choosing.
## IF it is not a C.H.I door, use the get material and get material categories apis insetad

---

# Warranty Rules
Warranty is always added for everything.
Single item only.

---

# Material Selection Structure
Before anything, break request into sections such as

- door size
- brand
- style
- repair items
- opener

Brand → Size → Design → Windows → Insulation → Color = Final Configuration

**CRITICAL Rule: Line Item Separation**
When you are instructed to create a new estimate and also add specific garage door details (line items), you MUST execute this as two separate steps:
1.  First, create the estimate using the `POST /estimates` API without any `line_items`. This creates the basic estimate record and associates it with the customer and schedule.
2.  Second, after the estimate is successfully created, use the `PUT /estimates/{estimate_id}/options/{option_id}/line_items/bulk_update` API to add all the garage door materials and services (line items) to the newly created estimate option. Do NOT include line items during the initial estimate creation API call.
Rules:
- 16x7 = two car
- 8x7 = one car
- always add warranty

---

# Typical Door Interpretation Order
1. Brand
2. Size
3. Design
4. Windows
5. Insulation
6. Tracks
7. Opener
8. Repair items

## You may also receive C.H.I only door full urls such as this:
"https://doorgi.com/door-builder/#/traditional/raised_panel/build/double/Long%20Panel/premium/solid%20color/black/glass/frosted/waterton/first%20row/"
"https://doorgi.com/door-builder/#/traditional/stamped_carriage_house/build/double/Long%20Panel/standard/solid%20color/black/glass/obscure/madison/first%20row/barcelona%20set%202/"

## The url format for this is typically as follows:
`#/{traditional/contemporary/carriage}/{C.H.I door name}/build/{size(assume 16X7 or 8X7 if no other info given)}/{insulation_type}/{colorType}/{color}/glass/{glass_type}/{window_inserts}/{window_position}/{hardware_sets}`
These might be accomponited by additional information nto in the url such as tracks, seals, openers etc.
---

# Design rules
### "traditional/contemporary/carriage" refers to C.H.I doors only. 
### "Raised panel" is a door model, not a design name of the raised panel. Default to short panel if design isn't specified.

### Carriage house doors(the ones with steel, fiberglass and wood overlays) contains tons of designs using numerical and letters examples: "10A, "33A". You won't find these in the api or playbooks, thats fine, simply follow based on other factors.


### planks and flush have "no or short windows" or "long windows" design, defult to no or short window if not specified.
## Some doors like recessed panel may contain very little info, just match what you can we will handle the details later


# Insulation Rules
You may often receive a model number, a four digit number, this refers to the actual door model and it relates to insulation, as different insulation use a different model number for the same design. You may also receive the "R" value or the thermal number, such as "R-Value: 10.29", is another identifier. 
## Proritize the model number references or the R value references when trying to match the correct door.
Otherwise if not provided, you may receive examples such as: 

non insulated → Non-Insulated (Standard Duty)
standard → Non-Insulated (Standard Duty) OR lowest trim 
insulated → Insulated (Medium Duty or closest available)
medium duty → Insulated (Medium Duty)
heavy duty → Insulated (Heavy Duty)
vinyl back → Insulated Vinyl Back
Steelback → Usually named but refers to a higher insulated door, at least medium
Premium → Medium insulation trim for that tier

Some doors are higher tier and have insulation by default, such as planks. ry to match as close as possible

If missing mention of any insulation:
- choose standard/non-insulated if available
- else choose lowest tier of insulation if standard isn't seen
- document assumption

---
# Window Rules

## Default Window Behavior

If windows are mentioned but no specific window type is provided:

- Default to the **plain cheapest matching window**.
- Do **not** add insert selections unless explicitly requested.
- The default window position is **TOP** unless otherwise specified.
- If the request specifies a different position (e.g. left or right), use that position. Otherwise, always use **TOP**.

---

## Insulated Windows

An **insulated door does NOT imply insulated windows**.

By default, assume the windows are **not insulated**, even if the door itself is insulated.

Only add **insulated windows** when:

- The customer explicitly requests insulated windows, **or**
- No matching plain window option exists for that door model (some models only provide insulated windows).

---

## StyleLite Windows

Use **StyleLite** windows **only** for **C.H.I. Flush** and **Plank** door systems.

Some StyleLite windows can be found in both:

- `Materials Playbook/C.H.I Doors/StyleLite Windows`
- The individual **Plank/Flush** door folders

For **Plank** and **Skyline** doors:

- If a window design is not specified, always default to the **Long** window design.

---

# Window Inserts Rules
IF inserts aren't mentioned, but windows are, dont add any inserts
IF a specific insert is mentioned but isn't found, simply add any insert (typically same exact price anyway)


# Color Rules
Color isn't especially critical, most are exact same price.
If not mentioned:
- Simply choose the door model by other factor like design, model, insulation. 
IF color mentioned but not found:
-Simply choose the closest color OR white or whatever maches the other more important factors like insulation
If woodtone:
-woodtones must match woodtone category if possible as they are different price. Some matches simply list "ANY COLOR, or ANY woodton, fi you find that choose it.


---

# Track Rules
## Default: 12 inch tracks included always
Doors usually showcase as using 12 inch in the description, if other tracks are being used, you simply add that from installation hardware

Do NOT add tracks unless explicitly requested:
- 15"
- 20"
- 32"
- low headroom
- hi-lift
- free upgrade variants

Tracks are found under "installation hardware" for material playbook.
---

# Opener Rules

## Business-provided:
- includes installation
- no labor added
- from material pricebook

## Customer-provided:
- labor only (service pricebook)

## Common Mapping:
"Premium" = LiftMaster 6690L belt drive
"Elite" =  Elite LiftMaster 98022MC 
"Essential" = LiftMaster 2420L chain drive
"Plus" = Other LiftMaster variants should have "plus" in their name

## Rules for opener rails 
Before finding openers you typically will need to match by the rail length. Default is 7feet. You can map by the height of the door "8x7, 17x7, 14x7" all have the height as 7 feet. If this height is taller use the appropriate rail length.


---

# Repair Mapping A–Z
These are hardware materials but also include the install fee with the purchased material
IF an estimate requests clearly outlines a separate  item such as "10 pack of rollers", "pair of cables", this item may likely be found under this folder `Materials Playbook/A-Z Garage Door Repair`.

## By default you do not add anything from here unless explicitly requested.

ONlY go here for the weather seal id's if you must use the get material and get material categories API to find other doors, otherwise seals are loghed together with C.H.I doors

---

# Seal Rules
VDS / Climate Seal / Perimeter Seal / Weather Seal = same

Default: DO NOT add unless requested

Wood accent seals only if requested

---

# Size Rules
8x7, 9x7, 14x7, 15x7, 16x7, 16x8, 18x8

## Common mapping when explicit numerical digits aren't given
"single" = 8x7
"double = "16x7"
"one car" = 8x7
"two car" = 16x7
"large single/one car" = Assume 8x7 still, HOWEVER the service playbook installation fee has a separate item for larger doors
"large double/two car" = Assume 17x7, HOWEVER the service playbook installation fee has a separate item for larger doors


If unavailable:
1. choose closest
2. document

If missing size:
STOP and request size

8x7 and 16x7 can be found entirely in the materials folder. Any other size must call the get material categories and get materials apis mentioned earlier

---

# Multiple Doors
Exact Same config → Simple create one line item and change the `quantity` field
different config → A different door is an entirely different option, which means you have to call the create option api, located under  `housecall_pro_create_estimate_option.md` and use that option id for the estimate. 
---

# Housecall Pro file and API Navigation & Rules

## File Structure for Door / Item Catalog
Typical path for a door or item file:
```
/brand/size/design/descriptive_name.md
```
Sometimes other files exist that point to a specific section like windows, or windows inserts, open those if needed, but always start with the doors/designs markdown
Each Markdown file represents a core section in the catalog.

## Critical Rule: HEADER = API NAME FIELD

The top-level header in each markdown file is **NOT** just documentation.

**It is the exact canonical name that MUST be used in API calls.**

### CRITICAL RULE: Explicit Line Item Matching Only; No Guessing
When a request includes specific garage door details or repair items (line items), you **MUST** find a **direct, explicit match** for each requested item within the `Materials Playbook` or `Services Playbook` directories. This means locating a Markdown file where the header **exactly** matches the requested item.

**If a direct, explicit match cannot be found for a requested line item (e.g., "damaged lower panel," "general tuneup," "broken spring," or any item not explicitly listed), DO NOT:**
- Add any generic, inferred, or arbitrary line items.
- Attempt to "cover" vague terms with unrelated existing items.
- Guess `service_item_id` values or create new item names.

Instead, proceed with the estimate creation and line item update process, **omitting any unmatched line items**. Only add items for which an **exact and explicit match** was found in the playbooks.

### Example
When you see this header:

```markdown
### Plus LiftMaster 6580L Belt Drive Overhead Opener with 7ft T-Rail
```

You **must** use this **exact string** as:
- The `name` field in API payloads
- The selection key when referencing the item
- The identifier to locate the correct `service_item_id`

**Never**:
- Paraphrase the header
- Shorten it
- Normalize it
- Reword it
- Guess a similar name

The header must match * what is in the markdown file.

## For doors, these headers  typically follow this structure:
{numerical_size + model number + Door model + Color + Specific model R value + Possibly steelback
Examples: "16'0"x7'0" 2327 Planks/Natural Oak/R-10.29/Steelback", "16'0"x7'0" 2250 Short Panel/Almond/Non-insulated"
These alone typically match the estimate request. 
## Fields in Each Item File

Each catalog file contains:
- **HEADER** → Canonical API name (required for selection)
- `service_item_id` → Primary unique identifier (MUST include `pbmat_` prefix for materials or `olit_` prefix for organizational items)
- `unit_price`
- `unit_cost`
- `description`

Ue the headers to match the estimate request, IF unsure, go deeper and read the description of that header
## Required API Fields (Mandatory)

### Every line item sent to Housecall Pro APIs as a NEW line item **must** include the following:
- `service_item_id`
- `service_item_type`
- 'name'(The header)
- `unit_price`
- `unit_cost`
- `description` (As copied, otherwise add your own short description)
- 'quantity (only if more than 1)
- `kind`
### Important consideration (READ)
Both the unit prices and unit costs are obviously not dollar amounts, "1000" equates to 10 dollars, if talking about price convert accordingly, otherwise pass to the API the original values.

## Type Mapping Rules
The to fields MUST be added when calling the add items api
### Material Playbook Items
(Physical products: doors, openers, hardware)

```json
"service_item_type": "pricebook_material",
"kind": "materials"
```

### Service Playbook Items
(Labor, installation, warranty, service work)

```json
"service_item_type": "organizational",
"kind": "labor"
```

## Source of Truth Hierarchy

1. **HEADER** = Canonical item name 
2. `service_item_id` = Unique execution identifier

## Non-Negotiable Rules

- **NEVER** guess a `service_item_id`
- **NEVER** substitute or rename headers
- **ALWAYS** use the exact header string as the "name" field for adding those items
- `service_item_id` must come directly from a matched header (including `pbmat_` or `olit_` prefix)

---
