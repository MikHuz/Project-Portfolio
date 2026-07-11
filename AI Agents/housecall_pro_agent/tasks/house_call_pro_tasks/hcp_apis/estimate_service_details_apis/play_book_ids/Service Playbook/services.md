# services.md
This file contains the service item ids for garage door installation fees, customer provided opener/motor installation fees, conversions and other smaller installation fees
# Door Installation Service IDs

Note that `unit_price` and `unit_cost` are stored in cents (e.g. `1000` = $10.00).

This section describes every major garage door installation labor service fee and warranty, separate from the door materials, windows, designs, or business-supplied openers.

Each service contains the following fields:
- Section header (the service name)
- `service_item_id`
- `Description`
- `unit_price`
- `unit_cost`

> **Important:** Match line items by **both the section header (name) and the description if needed** before selecting a `service_item_id`. Never assume a service ID without additional context. Read the description when the name doesn't obviously identify the correct item. Sometimes the description is generic or omitted because the name is sufficient.
>
> All services in this section have:
> - `kind: "labor"`
> - `service_item_type: "OrganizationalLineItemTemplate"` (convert this to `"organizational"` when building update requests).
>
> If a requested installation service is **not** documented in this section, stop and ask for the missing service item instead of inventing a `service_item_id`, description, or pricing.

---

## Warranties

**service_item_id:** `olit_9e445130cf6c42318619e65f0c0b5f14`
**Description:** `* Lifetime warranty on door panels (from C.H.I.)
* 6 years warranty on hardware (from C.H.I.)
* 3 years warranty on springs (from C.H.I.)
* 3 years warranty on labor (from Doorgi Garage Doors)

More info:
https://cdn2.hubspot.net/hubfs/2029938/Support/Warranty/CHI-Warranty-Two-Sided.pdf`
**unit_price:** `0`
**unit_cost:** `0`

---

## Large Two Car Garage Door Installation

**service_item_id:** `olit_533dcb123bde4763803e59dd9cad172a`
**Description:** `Disassembly, removal, haul-away and disposal of old door and all its components. Delivery and installation of the new door. Alignment, balancing, lubrication, opener bracket, photo eyes, opener J-Arm, bottom weather seal, perimeter weather seal, configure opener limits and safety check up.`
**unit_price:** `99500`
**unit_cost:** `0`

---

## One Car Tilt-up to Sectional Door Opening Conversion

**service_item_id:** `olit_7ff766b24fb845d6b4c0abef1b5b2612`
**Description:** `Narrow down opening to fit sectional door (sides and top). Add wood fillers on sides and top to flush and level. Excludes: caulking, painting.`
**unit_price:** `19500`
**unit_cost:** `5000`

---

## Large One Car Garage Door Installation

**service_item_id:** `olit_c0c7fd6797f0428995c8d36b17c08aee`
**Description:** `Disassembly, removal, haul-away and disposal of old door and all its components. Delivery and installation of the large one car door. Alignment, balancing, lubrication, opener bracket, photo eyes, opener J-Arm, bottom weather seal, perimeter weather seal, configure opener limits and safety check up.`
**unit_price:** `69500`
**unit_cost:** `0`

---

## Standard One Car Garage Door Installation

**service_item_id:** `olit_d4858913a1d34ef5a4c24063723c339e`
**Description:** `Disassembly, removal, haul-away and disposal of old door and all its components. Delivery and installation of the new door. Alignment, balancing, lubrication, opener bracket, photo eyes, opener J-Arm, bottom weather seal, perimeter weather seal, configure opener limits and safety check up.`
**unit_price:** `59500`
**unit_cost:** `0`

---

## Standard Two Car Garage Door Installation

**service_item_id:** `olit_db9763baba2640058dc87be5ba272c62`
**Description:** `Disassembly, removal, haul-away and disposal of old door and all its components. Delivery and installation of the new door. Alignment, balancing, lubrication, opener bracket, photo eyes, opener J-Arm, bottom weather seal, perimeter weather seal, configure opener limits and safety check up.`
**unit_price:** `69500`
**unit_cost:** `0`

---

## Two Car Tilt-up to Sectional Door Opening Conversion

**service_item_id:** `olit_456a9edd839945ab8d9d1aad1f6b969c`
**Description:** `Narrow down opening to fit sectional door (sides and top). Add wood fillers on sides and top to flush and level. Excludes: caulking, painting.`
**unit_price:** `29500`
**unit_cost:** `5000`

---

## One Panel Replacement - Full Service Package

**service_item_id:** `olit_fba5102808a24966ad86f40a291c6c8d`
**Description:** `Measure, order, pick up and delivery of the new garage door panel. Removal, haul-away and disposal of the old panel. Installation of the new panel. 12 months warranty on labor.`
**unit_price:** `40000`
**unit_cost:** `0`

---

## Re-frame and Re-trim door opening

**service_item_id:** `olit_60ffdfceb8844517a21d4346099ba3af`
**Description:** `Replace garage door frame. Replace garage door trim. Caulk. Paint.`
**unit_price:** `50000`
**unit_cost:** `0`

---

## HI-Lift custom conversion (up to 18 inch lift)

**service_item_id:** `olit_953cfd1b724748eba8a2167f040b63b6`
**Description:** `Labor to convert standard 7 ft door to a custom high lift configuration located as close to ceiling as possible (up to 18 inch lift).`
**unit_price:** `40000`
**unit_cost:** `0`

---

## Garage Door Installation (Customer Provided)

**service_item_id:** `olit_5b834c4bc6cf46e68e045cf58953fc2d`
**Description:** *(No description provided.)*
**unit_price:** `99500`
**unit_cost:** `0`

---

## Tilt-Up Door Installation

**service_item_id:** `olit_46703ea7dbfa4308aa094063597c94ba`
**Description:** `Align tilt-up door in a door opening, install hinges and springs, align and balance the door, install J-Arm bracket, connect door to a door opener, reprogram opener and test functionality.`
**unit_price:** `40000`
**unit_cost:** `20000`

---

## Low Headroom Conversion

**service_item_id:** `olit_4e328de468b64ccf95fec4787ad4a44c`
**Description:** `Modify vertical tracks, struts, top fixtures, install low headroom hinges to maximize usable space in low-headroom environments and allow unobstructed door opening. Includes labor and materials.`
**unit_price:** `25000`
**unit_cost:** `12500`

---

## Double car garage door paint. Clean, prime, paint, materials

**service_item_id:** `olit_9a480ce1316b45448158e92338f13e2e`
**Description:** `This service item is the fee cost for painting any double car door.`
**unit_price:** `50000`
**unit_cost:** `50000`

---

## Vent Installation

**service_item_id:** `olit_93056c603b8848f3aba18354590932b6`
**Description:** `Install two 4"x10" vent on the bottom of the garage door. If matching vent color not available, it's customer responsibility to paint.`
**unit_price:** `7500`
**unit_cost:** `3500`

---

## Mail slot installation

**service_item_id:** `olit_726c3003435d43baa4a7dc1a3572cc88`
**Description:** `Cut openings in the steel panel per customer request and install Mail Slot Facia.`
**unit_price:** `7500`
**unit_cost:** `4000`

# Customer Provided Opener/Motor Installation Fees

> **Important:** These service items are **ONLY** for situations where the **customer is supplying the garage door opener/motor**. Do **not** use these service IDs if Doorgi is selling and supplying the opener. IF the business doesn't mention that the customer supplied the opener, do not read this section and go to 
> All services in this section have:
> - `kind: "labor"`
> - `service_item_type: "OrganizationalLineItemTemplate"` (convert this to `"organizational"` when building update requests).
---

## Overhead Opener Replacement

**service_item_id:** `olit_9b8de9a22b344b02a0d34612134f5381`
**Description:** **Use only when replacing an existing overhead opener while reusing the customer's existing mounting hardware, wiring, rails, and related components.** Removal and disposal of the old opener. Installation of control panel using existing wiring. Installation of safety sensors using existing wiring. Assembly and installation of belt/chain rail and opener. J-arm mount, backup battery. Programming of limits, safety check. Installation and programming of keypad. 12-month labor warranty.
**unit_price** `29500`

---

## Overhead Opener New Installation

**service_item_id:** `olit_40df9388c81846d8b5ceee346b45f57c`
**Description:** **Use only for a complete new overhead opener installation that requires new mounting hardware, new wiring, and new installation materials.** Manufacturing and installation of new opener braces. New wiring and installation of control panel. New wiring and installation of safety sensors. Assembly and installation of belt/chain rail and opener. J-arm mount, backup battery. Programming of limits, safety check. Installation and programming of keypad. 12-month labor warranty.
**unit_price** `35000`

---

## Side Opener Installation

**service_item_id:** `olit_7b41fbcc72e44d7cb9a8e8484a06142c`
**Description:** **Use only for installing a customer-provided side-mount (jackshaft) opener.** Removal and disposal of the old opener and its components. Wiring and installation of control panel. Wiring and installation of safety sensors. Wiring and installation of automatic deadbolt. Installation of extension cord. Installation of ceiling light fixture. Backup battery. Programming of limits, safety check. Installation and programming of keypad. 12-month labor warranty.
**unit_price:** `35000`
