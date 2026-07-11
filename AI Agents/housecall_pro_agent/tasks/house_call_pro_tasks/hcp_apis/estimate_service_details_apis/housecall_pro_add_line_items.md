# Housecall Pro API: Bulk Update Estimate Option Line Items

**Endpoint:** `PUT https://api.housecallpro.com/estimates/{estimate_id}/options/{option_id}/line_items/bulk_update`

## Critical Instructions for AI Agents (READ FIRST)
Read this entire file first before any first calls
Despite its name, **this is the ONLY API provided for modifying estimate line items.**

It is **not just an "add items" API**. This endpoint is used for **every line item operation**:

- ✅ Add new line items
- ✅ Update existing line items
- ✅ Delete existing line items (by omission)
- ✅ Reorder line items
- ✅ Replace the entire contents of an estimate option

This endpoint performs a **full replacement** of the estimate option's line items. The `line_items` array you send becomes the new source of truth.

There are **NO separate Add, Update, or Delete APIs.**

---

## Request Body Structure (Critical)

The request body **MUST** be a JSON object containing a top-level `line_items` field.

Correct:

```json
{
  "line_items": [
    {
      "name": "Example"
    }
  ]
}
```

Incorrect:

```json
[
  {
    "name": "Example"
  }
]
```

Sending the array directly instead of wrapping it in brackets `{ "line_items": [...] }` will cause the API to reject the request.

---

## How Each Operation Works

**The `name` field is always required for every line item.**

### Adding

Create a new object **without** an `id` and include the complete pricebook definition.

### Updating

For existing items, include:

- `id`
- `name`
- only the fields that changed

> This minimal-field pattern has been verified to work in practice and is the preferred request style.

### Keeping Unchanged

Include only:

- `id`
- `name`

### Deleting

Simply omit the item from the `line_items` array.

---

## Before Using This API

1. Call

```
GET /estimates/{estimate_id}/options/{option_id}/line_items
```

unless the current line items are already available.

2. Obtain pricebook definitions.

Never invent:

- service_item_id
- service_item_type
- unit_price
- unit_cost
- kind
- name

Descriptions may be supplied by the caller if appropriate.

---

## Mixed Operation Example

```json
{
  "line_items": [
    {
      "id": "existing_1",
      "name": "Existing Door"
    },
    {
      "id": "existing_2",
      "name": "Installation",
      "quantity": 2
    },
    {
      "service_item_id": "olit_x",
      "service_item_type": "organizational",
      "name": "Warranty",
      "description": "Lifetime warranty",
      "unit_price": 5000,
      "unit_cost": 0,
      "quantity": 1,
      "kind": "labor"
    }
  ]
}
```

This request:

- Keeps `existing_1`
- Updates `existing_2`
- Adds `Warranty`service
- Deletes every omitted existing item

---

## Item Categories

### Materials

```
service_item_type = "pricebook_material"
kind = "materials"
```

### Services

```
service_item_type = "organizational"
kind = "labor"
```

---

## Type Conversion

| Returned | Send |
|-----------|------|
| Pricebook::Material | pricebook_material |
| OrganizationalLineItemTemplate | organizational |

---

## Full Replacement Behavior

Every request represents the **entire desired final state**.

Include:

- every item to keep
- every item to update
- every new item

Every omitted item will be deleted.

---

## Troubleshooting

### "Could not parse request body"

This almost always means the API received **invalid JSON**.

Common causes:

- malformed JSON
- incorrect shell quoting
- improperly escaped `curl --data`

It is **not** caused by normal characters inside valid JSON strings such as:

- apostrophes (`'`)
- parentheses (`(` `)`)
- newline characters (`\n`) when properly encoded
- commas inside strings

### JSON Escaping

JSON only requires escaping characters such as double quotes (`\"`) and backslashes (`\\`) where appropriate.

For example:

```json
{
  "name": "16'0\"x7'0\" Door"
}
```

The apostrophes do **not** need escaping.

---

## Curl Best Practices

- Construct valid JSON first.
- Then send it with curl.
- Do not modify descriptions simply to remove punctuation.
- Prefer generating JSON programmatically rather than manually escaping large payloads.

---

## Request

### Headers

```
Accept: application/json
Authorization: Bearer <token>
Content-Type: application/json
```

### Body

```json
{
  "line_items": [
    {
      "id": "string",
      "service_item_id": "pbmat_string", // MUST include 'pbmat_' prefix for materials or 'olit_' prefix for organizational items,
      "service_item_type": "pricebook_material",
      "name": "string",
      "unit_price": 0,
      "unit_cost": 0,
      "quantity": 1,
      "kind": "labor",
      "taxable": false,
      "description": "string"
    }
  ]
}
```

---

## Final Rules

- Retrieve current line items before modifying them unless already available.
- Treat this as the universal Add / Update / Delete endpoint.
- Construct the complete desired final `line_items` array.
- Omitted items are deleted.
- Store IDs returned for newly created items.
