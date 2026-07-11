# Housecall Pro API: Create Customer

## Overview
**Endpoint**: Create a new customer record in Housecall Pro.

- **Method**: `POST`
- **URL**: `https://api.housecallpro.com/customers`
- **Success Response**: `201 Created`

---

## Authentication
Use Bearer token authentication:

```http
Authorization: Bearer YOUR_API_TOKEN
```

## Request Body (application/json)

At least one of the following is required: `first_name`, `last_name`, `email`, `mobile_number`, `home_number`, or `work_number`. This is an OR, you don't need all of these, hence the "required" is listed as "No".

### Fields

| Field                  | Type             | Required | Description                     |
|------------------------|------------------|----------|---------------------------------|
| first_name            | string \| null   | No       | Customer's first name           |
| last_name             | string \| null   | No       | Customer's last name            |
| email                 | string \| null   | No       | Email address                   |
| company               | string \| null   | No       | Company name                    |
| notifications_enabled | boolean          | No       | Whether customer receives notifications |
| mobile_number         | string \| null   | No       | Mobile phone number             |
| home_number           | string \| null   | No       | Home phone number               |
| work_number           | string \| null   | No       | Work phone number               |
| tags                  | array[string]    | No       | List of tags                    |
| lead_source           | string \| null   | No       | Lead source                     |
| notes                 | string           | No       | Internal notes                  |
| addresses             | array[object]    | No       | List of addresses               |

### Address Object

```json
{
  "street": "string",
  "street_line_2": "string",
  "city": "string",
  "state": "string",
  "zip": "string",
  "country": "string"
}
``` Nothing is required  for the address object

## Example Request (cURL)

```bash
curl --request POST \
  --url https://api.housecallpro.com/customers \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@example.com",
    "mobile_number": "(555) 123-4567",
    "company": "Smith Plumbing",
    "notifications_enabled": true,
    "tags": ["residential", "plumbing"],
    "lead_source": "Website",
    "notes": "Prefers morning appointments.",
    "addresses": [
      {
        "street": "123 Main Street",
        "street_line_2": "Apt 2B",
        "city": "Anytown",
        "state": "CA",
        "zip": "90210",
        "country": "US"
      }
    ]
  }'
```

## Example Success Response (201)

```json
{
  "id": "cus_abc123def456",
  "first_name": "John",
  "last_name": "Smith",
  "email": "john.smith@example.com",
  "mobile_number": "(555) 123-4567",
  "company": "Smith Plumbing",
  "notifications_enabled": true,
  "lead_source": "Website",
  "notes": "Prefers morning appointments.",
  "created_at": "2026-06-29T19:45:12Z",
  "updated_at": "2026-06-29T19:45:12Z",
  "tags": ["residential", "plumbing"],
  "addresses": [
    {
      "id": "addr_987654",
      "type": "billing",
      "street": "123 Main Street",
      "city": "Anytown",
      "state": "CA",
      "zip": "90210",
      "country": "US"
    }
  ]
}
```

## Notes for AI Agents

- You only need the `first_name` or `last_name` to create a customer. Once created, rely on the returned `customer_id` for all subsequent operations.
- **Store the returned `id`** — it is required for all future operations on this customer.
- Always try to include **at least one address**.
- Use **consistent phone number formatting**.
- **Tags** are very useful for filtering and reporting.
- Handle cases where only **minimal data** (e.g., just email) is provided.
