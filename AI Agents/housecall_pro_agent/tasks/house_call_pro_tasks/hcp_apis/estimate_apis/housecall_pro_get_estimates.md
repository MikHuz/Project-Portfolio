# Housecall Pro API: Get Estimates

## Overview
**Endpoint**: Retrieve a list of estimates.

- **Method**: `GET`
- **URL**: `https://api.housecallpro.com/estimates`
- **Success Response**: `200 OK`

---

## Authentication
Use Bearer token authentication:

```http
Authorization: Bearer YOUR_API_TOKEN
```

## Query Parameters

| Parameter      | Type          | Description |
|----------------|---------------|-----------|
| customer_id    | string        | **Required for most use cases** — Filter estimates by customer ID |
| employee_ids   | array[string] | Filter by assigned employee IDs |
| status         | string        | Filter by estimate status |
| created_after  | string        | ISO date |
| created_before | string        | ISO date |
| page           | integer       | Pagination page |
| per_page       | integer       | Results per page |

> **Important**: To use this endpoint effectively, you **must first** call the **Get Customers** endpoint to obtain a valid `customer_id`.

## Example Request (cURL)

```bash
curl --request GET \
  --url 'https://api.housecallpro.com/estimates?customer_id=cus_abc123def456&per_page=20' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN'
```

## Example Success Response (200)

```json
{
  "estimates": [
    {
      "id": "est_123456789",
      "estimate_number": "EST-00123",
      "work_status": "open",
      "customer": {
        "id": "cus_abc123def456",
        "first_name": "John",
        "last_name": "Smith"
      },
      "total_amount": 1250,
      "created_at": "2026-06-15T10:30:00Z",
      "status": "awaiting response"
    }
  ],
  "meta": {
    "total": 12,
    "page": 1,
    "per_page": 20
  }
}
```

## Notes for AI Agents

- **Always get a `customer_id` first** by calling the **Get Customers** endpoint (search by name/email).
- Use `customer_id` filter to avoid overly broad results.
- Combine with pagination for large result sets.
- Store estimate `id` for further operations (e.g., updating or converting to job).
