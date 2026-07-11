# plank_doors.md
This file does not contain the windows
Note that `unit_price` and `unit_cost` are stored in cents (e.g. `1000` = $10.00).

This section describes every major garage door installation labor service fee and warranty, separate from the door materials, windows, designs, or business-supplied openers.

Each service contains the following fields:
- Section header (the service name)
- `service_item_id`
- `Description`
- `unit_price`
- `unit_cost`

> **Important:** Match line items by **both the section header (name) and the description if needed** before selecting a `service_item_id`. Never assume a service ID without additional context. Read the description when the name doesn't obviously identify the correct item. Sometimes the description is generic or omitted because the name is sufficient.

All of the following materials and items have

> All `service_item_type` values in this section are `Pricebook::Material`. When converting to update line item requests, use `"pricebook_material"`.
> - `kind: "materials"`

You MUST add these fields on top of the provided ones for each price book material line item.

#8x7 Planks Long Windows Insulated (Medium Duty)

## Garage Door Options

### 8'0"x7'0" 2347 Planks / Cedar / R-10.29 / Steelback
- service_item_id: `pbmat_0a75024a4c144c05a0c44a7d51208667`
- Description: `Brand: C.H.I.; Collection: Planks; Model number: 2347; Color: CEDAR; Size: 8'0"x7'0''; R-Value: 10.29; Track: 12in; 2", 2-Sided Steel Sandwich; Medium Duty; Polystyrene Insulation - 1-13/16" Thick, 27 ga`
- unit_price: `199302`
- unit_cost: `99651`

### 8'0"x7'0" 2347 Planks / White / R-10.29 / Steelback
- service_item_id: `pbmat_6d3f73ac2e294abda4ad59f49cafda24`
- Description: `Brand: C.H.I.; Collection: Planks; Model number: 2347; Color: WHITE; Size: 8'0"x7'0''; R-Value: 10.29; Track: 12in; 2", 2-Sided Steel Sandwich; Medium Duty; Polystyrene Insulation - 1-13/16" Thick, 27 ga`
- unit_price: `130712`
- unit_cost: `65356`

### 8'0"x7'0" 2347 Planks / Black / R-10.29 / Steelback
- service_item_id: `pbmat_57cca1182b16456391572cc22ab6b7ed`
- Description: `Brand: C.H.I.; Collection: Planks; Model number: 2347; Color: BLACK; Size: 8'0"x7'0''; R-Value: 10.29; Track: 12in; 2", 2-Sided Steel Sandwich; Medium Duty; Polystyrene Insulation - 1-13/16" Thick, 27 ga`
- unit_price: `130712`
- unit_cost: `65356`

## Perimeter / Accessories

### Wood Accent Perimeter Seal
- service_item_id: `pbmat_01dc7474e76243739275847febeeeee3`
- Description: `Wood accent colored vinyl perimeter seal`
- unit_price: `23908`
- unit_cost: `11954`

### Solid Color Decorative Perimeter Seal
- service_item_id: `pbmat_f6954161f8234be3afd264dd72ee5a1c`
- Description: `Solid color vinyl perimeter seal matching door color`
- unit_price: `13724`
- unit_cost: `6862`

### (Null Item)
- service_item_id: `null`
- Description: `Nothing`
- unit_price: `0`
- unit_cost: `0`
-- END --

#8x7 Planks Long Windows Insulated (Heavy Duty)

## Garage Door Options

### 8'0"x7'0" 2348 Planks / White / R-17.54 / Steelback
- service_item_id: `pbmat_37e036707cd54d098700cecfe6f39e0b`
- Description: `Brand: C.H.I.; Collection: Planks; Model number: 2348; Color: WHITE; Size: 8'0"x7'0''; R-Value: 17.54; Track: 12in; 2", 2-Sided Steel Sandwich; Heavy Duty; Polyurethane Insulation - 1-7/8" Thick, 27 ga`
- unit_price: `182140`
- unit_cost: `91070`

### 8'0"x7'0" 2348 Planks / Black / R-17.54 / Steelback
- service_item_id: `pbmat_473cbd31426f493f83369fc0859531fe`
- Description: `Brand: C.H.I.; Collection: Planks; Model number: 2348; Color: BLACK; Size: 8'0"x7'0''; R-Value: 17.54; Track: 12in; 2", 2-Sided Steel Sandwich; Heavy Duty; Polyurethane Insulation - 1-7/8" Thick, 27 ga`
- unit_price: `182140`
- unit_cost: `91070`

### 8'0"x7'0" 2348 Planks / Cedar / R-17.54 / Steelback
- service_item_id: `pbmat_7510d7e8ba0b4be98be1a45715da69a9`
- Description: `Brand: C.H.I.; Collection: Planks; Model number: 2348; Color: CEDAR; Size: 8'0"x7'0''; R-Value: 17.54; Track: 12in; 2", 2-Sided Steel Sandwich; Heavy Duty; Polyurethane Insulation - 1-7/8" Thick, 27 ga`
- unit_price: `243146`
- unit_cost: `121573`

## Perimeter / Accessories

### Wood Accent Perimeter Seal
- service_item_id: `pbmat_9151f3cd920b4ba59cfa240636ec0c94`
- Description: `Wood accent colored vinyl perimeter seal`
- unit_price: `26582`
- unit_cost: `13291`

### Solid Color Decorative Perimeter Seal
- service_item_id: `pbmat_2d412f0b689d4fbd99b0e0a06f3d49a9`
- Description: `Solid color vinyl perimeter seal matching door color`
- unit_price: `14408`
- unit_cost: `7204`
