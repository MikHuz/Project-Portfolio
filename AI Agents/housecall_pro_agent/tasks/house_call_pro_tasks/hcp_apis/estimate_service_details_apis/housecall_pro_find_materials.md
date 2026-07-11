# Housecall Pro Price Book Material Discovery Workflow

This document explains the correct workflow for locating addable material line items that are NOT documented in the markdown files.

## Step 0 - Explanation
This API is used when no matching material items under \estimate_service_details_apis\play_book_ids\Materials Playbook` are found. It is primarily used for locating door models that are neither 16X7, or 8X7, or not C.H.I branded. IT it solely used for material playbook items, not services. 

This workflow is split into two sections "material categories" and simply "materials". Categories are as implied, named categories of related materials, they may contain sub catgeories under tit hata re also material catgroies. At some point the categories ends, and actual materials are are the leaf nodes. When this is the case, you switch to a second API(discussed int he steps later), to extract the relevant material and their fields to then add as line items to an estimate.

## Step 1 - Get Root Categories
Simply: 
GET `https://api.housecallpro.com/api/price_book/material_categories?page_size=50`
This API gets all price book material categories from root or under a parent category

Do not provide the query paremeter `parent_uuid`.

Categories with `parent_uuid = null` are root categories.

## Step 2 - Traverse the Tree
Filter matching categories by the 'name' field and extarxt it's 'uuid' field. Then,
Call:

`GET /api/price_book/material_categories?parent_uuid=<uuid>&page_size=50`

using the UUID from the previous category.

Continue recursively matching by category name based on the provided estimate request details, using the query parameter
"parent_uuid"

## Detecting a Leaf Category

If the response is something along the lines of with nothing in the "data" field:

```json
{
  "object": "list",
  "page": 1,
  "page_size": 10,
  "total_pages_count": 0,
  "total_count": 0,
  "data": [],
  "url": "/pricebook/material_categories"
}
```

then that category has **no child categories**, and indicates it is a leaf category or the one which exposes the final materials under it.

The UUID you queried is therefore a **leaf category**.

## Step 3 - Retrieve Materials
Now we are switching API's
Call:
GET `https://api.housecallpro.com/api/price_book/materials?material_category_uuid=<leaf_category_uuid>?page_size=50`
using the last leaf category UUID. The query parameter is literally "material_category_uuid"

This returns the actual addable materials.

## Mapping to Estimate Bulk Update(CRITICAL)

| Materials API | Bulk Update API |
|---|---|
| uuid | service_item_id |
| name | name |
| description | description |
| price | unit_price |
| cost | unit_cost |

Make sure to extract these fields, along with always adding the service_item_type when calling the bulk update item API whose documentation is located under `\hcp_apis\estimate_service_details_apis\housecall_pro_add_line_items.md` 

Likewise with get material s API, is get materials API returns empty data, it means the id you sued till contains sub categories under it, not final materials.
```

## Complete Workflow

```text
GET /material_categories
        ↓
Choose root category
        ↓
GET /material_categories?parent_uuid=<uuid>
        ↓
Children?
        ↓
Yes → Repeat
No  → Leaf category
        ↓
GET /materials?material_category_uuid=<leaf_uuid>
        ↓
material.uuid -> service_item_id
service_item_type = pricebook_material (Literally equal to "pricebook_material" when passing into bulk update api)
```

### Important

- Categories are folders.
- Leaf categories contain materials.
- Only material UUIDs are valid `service_item_id` values for material estimate line items.
- Never use a category UUID as a `service_item_id`.
