# Housecall Pro API: Get Estimate Option Line Items

**Endpoint:** `GET https://api.housecallpro.com/estimates/{estimate_id}/options/{option_id}/line_items`

This API retrieves the **actual line items** for a specific estimate option. It provides detailed material/service playbook catalog information, especially useful for **garage door** or **garage door-related estimates** for a customer.

Use this endpoint to list all line items (materials, labor, fixed costs, discounts, etc.) associated with an estimate option.

## Request

### Path Parameters
- `estimate_id` (string, required): The ID of the estimate.
- `option_id` (string, required): The ID of the estimate option.

### Query Parameters (optional)
- `page` (string, default: `1`): Paginated page number.
- `page_size` (number, default: `10`): Number of line items returned per page.

### Headers
- `Accept: application/json`
- `Authorization: Bearer <token>`

## Example Request (cURL)
```bash
curl --request GET \
  --url 'https://api.housecallpro.com/estimates/{estimate_id}/options/{option_id}/line_items?page=1&page_size=10' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN'
```

## Response (200 OK)
```json
{
  "page": 1,
  "page_size": 10,
  "total_pages": 1,
  "total_items": 5,
  "line_items": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "unit_price": 0,
      "unit_cost": 0,
      "unit_of_measure": "string",
      "quantity": 0,
      "kind": "labor",                // Allowed: materials, labor, fixed, gratuity, fixed discount, percent discount
      "taxable": true,
      "amount": 0,
      "order_index": 0,
      "service_item_id": "string",
      "service_item_type": "market_place"   // Allowed: market_place, organizational, pricebook_material
    }
  ]
}
```

## Notes for AI Agents
- This endpoint returns **detailed line items** from the estimate option, including catalog/playbook data for services and materials (ideal for garage door repairs/installs).
- Pagination is supported — check `total_pages` and `total_items`.
- `kind` indicates the type of line item (labor, materials, discounts, etc.).
- Use this when you need the full breakdown of costs and items for a specific estimate option.