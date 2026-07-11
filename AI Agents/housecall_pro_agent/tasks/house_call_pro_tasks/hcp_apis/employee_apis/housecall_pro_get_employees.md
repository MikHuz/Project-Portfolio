# Housecall Pro API: Get Employees

## Overview
**Endpoint**: Retrieve a list of active employees in the organization.

- **Method**: `GET`
- **URL**: `https://api.housecallpro.com/employees`
- **Success Response**: `200 OK`

---

## Authentication
Use Bearer token authentication:

```http
Authorization: Bearer YOUR_API_TOKEN
```

## Query Parameters

| Parameter       | Type            | Default     | Description |
|-----------------|-----------------|-------------|-----------|
| location_ids   | array[string]   | -           | Filter by location IDs (ignored if X-Company-Id header is set) |
| page           | number          | 1           | Current page for pagination |
| page_size      | number          | 10          | Number of employees per page |
| sort_by        | string          | created_at  | Attribute to sort by |
| sort_direction | string          | desc        | `asc` or `desc` |

## Example Request (cURL)

```bash
curl --request GET \
  --url 'https://api.housecallpro.com/employees?page=1&page_size=20&sort_direction=desc' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN'
```

## Example Success Response (200)

```json
{
  "page": 0,
  "page_size": 0,
  "total_pages": 0,
  "total_items": 0,
  "employees": [
    {
      "id": "string",
      "avatar_url": "string",
      "color_hex": "string",
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "mobile_number": "string",
      "role": "string",
      "created_at": "string",
      "tags": [
        "string"
      ],
      "permissions": {
        "can_add_and_edit_job": true,
        "can_be_booked_online": true,
        "can_call_and_text_with_customers": true,
        "can_chat_with_customers": true,
        "can_delete_and_cancel_job": true,
        "can_edit_message_on_invoice": true,
        "can_see_street_view_data": true,
        "can_share_job": true,
        "can_take_payment_see_prices": true,
        "can_see_customers": true,
        "can_see_full_schedule": true,
        "can_see_future_jobs": true,
        "can_see_marketing_campaigns": true,
        "can_see_reporting": true,
        "can_edit_settings": true,
        "is_point_of_contact": true,
        "is_admin": true
      }
    }
  ]
}```

## Notes for AI Agents

- Use this endpoint to get available employees for job assignment or scheduling.
- Implement pagination for complete results.
- Filter by `location_ids` when working with multi-location companies.
- Store employee `id` for use in other endpoints (e.g., assigning to estimates/jobs).
- Look at `permissions` to understand what each employee can do.
