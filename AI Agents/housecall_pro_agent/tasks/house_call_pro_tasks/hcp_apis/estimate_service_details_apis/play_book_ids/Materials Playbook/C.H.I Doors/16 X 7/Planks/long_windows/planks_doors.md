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

# 16x7 Planks No or Short Windows Insulated (Medium Duty)

### RULE (CRITICAL USAGE CONSTRAINT)
This door configuration (Planks + Medium Duty insulation) MUST ONLY be used if:
- The request explicitly specifies **Medium Duty insulation**, OR
- The request explicitly includes **R-10.29** OR
- No mention of insulation at all (planks door must be insulated)


Default assumption:
- No plank door insulation mentioned? Then it is medium insulation


### 16'0"x7'0" 2327 Planks/Natural Oak/R-10.29/Steelback
service_item_id: pbmat_ffe47d0b4a494c09934e86c78b540a5b  
unit_price: 321338  
unit_cost: 160669  
description: Brand: C.H.I.; Collection: Planks; Model number: 2327; Color: Natural Oak; Size: 16'0"x7'0"; R-Value: 10.29; Track: 12in; 2", 2-Sided Steel Sandwich; Medium Duty; Polystyrene Insulation - 1-13/16" Thick, 27 ga; https://www.chiohd.com/garage-doors/planks/2327  

### 16'0"x7'0" 2327 Planks/Almond/R-10.29/Steelback
service_item_id: pbmat_7929ef191cf6401b98e4bc3a986013b0  
unit_price: 230068  
unit_cost: 115034  
description: Brand: C.H.I.; Collection: Planks; Model number: 2327; Color: Almond; Size: 16'0"x7'0"; R-Value: 10.29; Track: 12in; 2", 2-Sided Steel Sandwich; Medium Duty; Polystyrene Insulation - 1-13/16" Thick, 27 ga; https://www.chiohd.com/garage-doors/planks/2327  

### 16'0"x7'0" 2327 Planks/Cedar/R-10.29/Steelback
service_item_id: pbmat_950b1fa274f84399b8463b42c3cfd493  
unit_price: 367242  
unit_cost: 183621  
description: Brand: C.H.I.; Collection: Planks; Model number: 2327; Color: Cedar; Size: 16'0"x7'0"; R-Value: 10.29; Track: 12in; 2", 2-Sided Steel Sandwich; Medium Duty; Polystyrene Insulation - 1-13/16" Thick, 27 ga; https://www.chiohd.com/garage-doors/planks/2327  

### 16'0"x7'0" 2327 Planks/Black/R-10.29/Steelback
service_item_id: pbmat_a21d3cbc06b349b5b49708fb84a7561a  
unit_price: 230068  
unit_cost: 115034  
description: Brand: C.H.I.; Collection: Planks; Model number: 2327; Color: Black; Size: 16'0"x7'0"; R-Value: 10.29; Track: 12in; 2", 2-Sided Steel Sandwich; Medium Duty; Polystyrene Insulation - 1-13/16" Thick, 27 ga; https://www.chiohd.com/garage-doors/planks/2327  

### 16'0"x7'0" 2327 Planks/White/R-10.29/Steelback
service_item_id: pbmat_65127cbff28b41939e4e35c06679efa8  
unit_price: 230068  
unit_cost: 115034  
description: Brand: C.H.I.; Collection: Planks; Model number: 2327; Color: White; Size: 16'0"x7'0"; R-Value: 10.29; Track: 12in; 2", 2-Sided Steel Sandwich; Medium Duty; Polystyrene Insulation - 1-13/16" Thick, 27 ga; https://www.chiohd.com/garage-doors/planks/2327  

---

### Wood Accent Perimeter Seal
service_item_id: pbmat_18807423f4504aec9d448c6f9df9e752  
unit_price: 31356  
unit_cost: 15678  
description: Wood accent colored vinyl perimeter seal.  

### Perimeter Seal
service_item_id: pbmat_bd8ca6d9b46e4519970a1d789ac1cdb7  
unit_price: 15678  
unit_cost: 7839  
description: Perimeter seal matching door color.  
-- END --


# 16x7 Planks No or Short Windows Insulated (Heavy Duty)

### RULE (CRITICAL USAGE CONSTRAINT)
This door configuration (Planks + Heavy Duty insulation) MUST ONLY be used if:
- The request explicitly specifies **Heavy Duty insulation**, OR
- The request explicitly includes **R-17.54** (or "17.54 R-value")

If neither Heavy Duty nor R-17.54 is explicitly mentioned, these line_items must NOT be used.

Default assumption:
- Do NOT assume Heavy Duty unless explicitly stated
- Do NOT assume R-17.54 unless explicitly stated

---

## 16'0"x7'0" 2328 Planks/White/R-17.54/Steelback
service_item_id: pbmat_5c697b3fb88f49e68ce82444cfcde0b1  
unit_price: 319614  
unit_cost: 159807  
description: Brand: C.H.I.; Collection: Planks; Model number: 2328; Color: White; Size: 16'0"x7'0"; R-Value: 17.54; Track: 12in; 2", 2-Sided Steel Sandwich; Heavy Duty; Polyurethane Insulation - 1-7/8" Thick, 27 ga; https://www.chiohd.com/garage-doors/planks/2328  

## 16'0"x7'0" 2328 Planks/Black/R-17.54/Steelback
service_item_id: pbmat_56af405146e64f7eb409b4da080a44d6  
unit_price: 319614  
unit_cost: 159807  
description: Brand: C.H.I.; Collection: Planks; Model number: 2328; Color: Black; Size: 16'0"x7'0"; R-Value: 17.54; Track: 12in; 2", 2-Sided Steel Sandwich; Heavy Duty; Polyurethane Insulation - 1-7/8" Thick, 27 ga; https://www.chiohd.com/garage-doors/planks/2328  

## 16'0"x7'0" 2328 Planks/Cedar/R-17.54/Steelback
service_item_id: pbmat_087a88dd61fc412fb48e217b0355fdda  
unit_price: 472122  
unit_cost: 236061  
description: Brand: C.H.I.; Collection: Planks; Model number: 2328; Color: Cedar; Size: 16'0"x7'0"; R-Value: 17.54; Track: 12in; 2", 2-Sided Steel Sandwich; Heavy Duty; Polyurethane Insulation - 1-7/8" Thick, 27 ga; https://www.chiohd.com/garage-doors/planks/2328  

---

## Perimeter Seal
service_item_id: pbmat_a0e4630659864adc8f5a3a0db5d65941  
unit_price: 17432  
unit_cost: 8716  
description: Perimeter seal matching door color.  

## Wood Accent Perimeter Seal
service_item_id: pbmat_50f1ec883bec41c3a5670e4ed090896d  
unit_price: 34860  
unit_cost: 17430  
description: Wood accent colored vinyl perimeter seal.  
