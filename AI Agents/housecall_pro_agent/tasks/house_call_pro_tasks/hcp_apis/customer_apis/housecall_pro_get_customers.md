# Housecall Pro API: Get Customers

## Overview
**Endpoint**: Retrieve a list of customers.

- **Method**: `GET`
- **URL**: `https://api.housecallpro.com/customers`
- **Success Response**: `200 OK`

---

## Authentication
Use Bearer token authentication:

```http
Authorization: Bearer YOUR_API_TOKEN
```

## Query Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| `q` | string | Search customers by a **single field**: name, email, mobile number, or address. Housecall Pro will determine the best match. |
| `sort_by` | string | Customer attribute to sort by (default: `created_at`). |
| `sort_direction` | string | Sort order: `asc` or `desc` (default: `desc`). |
| `page` | number | Page number for pagination. |
| `page_size` | number | Number of customers per page. |
| `location_ids` | array[string] | Filter customers by location ID(s). |
| `expand` | array[string] | Expand related objects in the response. |

sort_by:
created_at	Oldest/newest customers first (depending on sort_direction).
updated_at	Customers ordered by when they were last modified.
first_name	Alphabetical by first name.
last_name	Alphabetical by last name.

Typically, sort_by is paired with sort_direction:

GET /customers?sort_by=last_name&sort_direction=asc

Returns customers from A → Z by last name.

GET /customers?sort_by=created_at&sort_direction=desc

Use this to fitler customers created 
## Example Request (cURL)

```bash
curl --request GET \
  --url 'https://api.housecallpro.com/customers?search=John&per_page=50&page=1' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN'
```

## Example Success Response (200)

```json
{
  "customers": [
    {
      "id": "cus_abc123def456",
      "first_name": "John",
      "last_name": "Smith",
      "email": "john.smith@example.com",
      "mobile_number": "(555) 123-4567",
      "company": "Smith Plumbing",
      "created_at": "2026-06-01T12:00:00Z",
      "updated_at": "2026-06-29T19:45:12Z",
      "tags": ["residential", "plumbing"],
      "addresses": [
        {
          "id": "addr_987654",
          "street": "123 Main Street",
          "city": "Anytown",
          "state": "CA",
          "zip": "90210"
        }
      ]
    }
  ],
  "meta": {
    "total": 245,
    "page": 1,
    "per_page": 50
  }
}
```

## Notes for AI Agents

- Use the `search` parameter for flexible lookups.
- Implement pagination using `page` and `per_page`.
- Filter by `tags` for better segmentation.
- Store customer `id` for subsequent calls (Get Customer by ID, Update, etc.).
