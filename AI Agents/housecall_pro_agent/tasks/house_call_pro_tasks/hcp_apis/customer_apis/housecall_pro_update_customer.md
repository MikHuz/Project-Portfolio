# Housecall Pro API: Update Customer

## Overview
**Endpoint**: Update an existing customer record.

- **Method**: `PATCH (or `PUT`)
- **URL**: `https://api.housecallpro.com/customers/{customer_id}`
- **Success Response**: `200 OK`

---

## Authentication
Use Bearer token authentication:

```http
Authorization: Bearer YOUR_API_TOKEN
```

## Path Parameters

- `customer_id` (string, required) — The ID of the customer to update.

## Request Body (application/json)

Fields you can update (partial updates supported):

| Field                  | Type             | Description |
|------------------------|------------------|-----------|
| first_name            | string \| null   | Customer's first name |
| last_name             | string \| null   | Customer's last name |
| email                 | string \| null   | Email address |
| company               | string \| null   | Company name |
| notifications_enabled | boolean          | Enable/disable notifications |
| mobile_number         | string \| null   | Mobile phone number |
| home_number           | string \| null   | Home phone number |
| work_number           | string \| null   | Work phone number |
| tags                  | array[string]    | List of tags |
| lead_source           | string \| null   | Lead source |
| notes                 | string           | Internal notes |
| addresses             | array

Address Object
id (string, required if updating an address)
type (string)
Allowed values:
billing
service
street (string | null)
street_line_2 (string | null)
city (string | null)
state (string | null)
zip (string | null)
country (string | null)


## Example Request (cURL)

```bash
curl --request PATCH \
  --url https://api.housecallpro.com/customers/cus_abc123def456 \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "first_name": "Johnny",
    "mobile_number": "(555) 987-6543",
    "notes": "Updated contact preference: prefers afternoon appointments.",
    "tags": ["residential", "plumbing", "vip"]
  }'
```

## Example Success Response (200)

```json
{
  "id": "cus_abc123def456",
  "first_name": "Johnny",
  "last_name": "Smith",
  "email": "john.smith@example.com",
  "mobile_number": "(555) 987-6543",
  "company": "Smith Plumbing",
  "notifications_enabled": true,
  "lead_source": "Website",
  "notes": "Updated contact preference: prefers afternoon appointments.",
  "created_at": "2026-06-01T12:00:00Z",
  "updated_at": "2026-06-29T20:45:00Z",
  "tags": ["residential", "plumbing", "vip"],
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
```

## Notes for AI Agents

- Always include the `customer_id` in the URL.
- The `updated_at` field will change after a successful update.
- You can add/remove tags easily with this endpoint.
