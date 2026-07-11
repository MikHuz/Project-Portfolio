# Housecall Pro API: Create an Estimate

## Overview

Creates a new estimate in Housecall Pro.

- **Method:** `POST`
- **URL:** `https://api.housecallpro.com/estimates`
- **Success Response:** `200 OK`

---

# Authentication

Use Bearer token authentication.

```http
Authorization: Bearer YOUR_API_TOKEN
```

---

# Request Body (application/json)
NEVER INVENT FIELDS, ONYL USE WHAT IS DISUSSED IN THIS FILE. Forget about the tax object and other fields, use only what is provided here.

## Top-Level Fields 

| Field | Type | Description |
|------|------|-------------|
| `note` | string | Internal note attached to the estimate. **Always include the full original task request in this field when creating a new estimate.**|
| `message` | string | Customer-facing message included with the estimate. This field is what the customer sees. |
| `customer_id` | string | REQUIRED. Existing customer ID. |
| `assigned_employee_ids` | array[string] | Employees assigned to the estimate. |
| `address_id` | string | Existing service address ID. |
| `lead_source` | string | Lead source for the estimate. |
| `address` | object | New service address (if not using `address_id`). |
| `options` | array | REQUIRED, Estimate options containing one or more line items. |
| `schedule` | object | REQUIRED ONLY IF APPOINTMENT IS REQUESTED, Schedule the estimate during creation. |

---
## Options Object (inside the 'options' top level array field)
```json
{
"name":"{name of the option(garage door) request"}
}
```
### Important info about the options field
This options array is a top-level field and is required, however all you need is the name field. As per the rules, you do not attempt to add actual line items inside the option at this stage. You may simply add:

"options": [
    {
      "name": "Option 1"
    },
    { 
	"name":"Option 2"
    }
  ],

**CRITICAL: Do NOT include `line_items` when creating a new estimate. Line items must be added in a separate `bulk_update` API call after the estimate is created.**
## Address Object

```json
{
  "street": "string",
  "street_line_2": "string",
  "city": "string",
  "state": "string",
  "zip": "string"
}
```

---

## Schedule Object

```json
{
  "start_time": "2026-07-05T09:00:00Z",
  "end_time": "2026-07-05T11:00:00Z",
  "arrival_window_in_minutes": 30,
  "notify_customer": true
}
```

### Schedule Fields

| Field | Type | Description |
|------|------|-------------|
| `start_time` | string | ISO-8601 scheduled start time. |
| `end_time` | string | ISO-8601 scheduled end time. |
| `arrival_window_in_minutes` | integer | Optional arrival window. |
| `notify_customer` | boolean | Whether Housecall Pro should notify the customer of the scheduled estimate. |

`start_time` and `end_time` must be ISO-8601 formatted timestamps.

Example:

```
2026-07-05T09:00:00Z
```

---

# Scheduling During Estimate Creation (IMPORTANT)

**An estimate can be scheduled as part of the initial `POST /estimates` request.**

If the estimate should already be scheduled, include the `schedule` object in the request body.

```json
"schedule": {
  "start_time": "2026-07-05T09:00:00Z",
  "end_time": "2026-07-05T11:00:00Z",
  "arrival_window_in_minutes": 30,
  "notify_customer": true
}
```

**Do NOT create the estimate first and then call the scheduling endpoint unless you need to modify the schedule later.**

The schedule object belongs inside the initial request body.
You may only call the update schedule option for estimate api fi you need to modify later, or if you already created the estimate and schedule failed for whatever reason.

---


# Common Mistakes

## ❌ Incorrect: Scheduling fields at the top level

```json
{
  "customer_id": "cus_123",
  "start_time": "2026-07-05T09:00:00Z",
  "end_time": "2026-07-05T11:00:00Z"
}
```

`start_time` and `end_time` **must** be inside the `schedule` object.

---

## ❌ Incorrect: Using response field names

```json
{
  "schedule": {
    "scheduled_start": "2026-07-05T09:00:00Z",
    "scheduled_end": "2026-07-05T11:00:00Z"
  }
}
```

These are **response fields**, not request fields.

---

## ✅ Correct

```json
{
  "customer_id": "cus_123",
  "schedule": {
    "start_time": "2026-07-05T09:00:00Z",
    "end_time": "2026-07-05T11:00:00Z",
    "arrival_window_in_minutes": 30,
    "notify_customer": true
  }
}
```

---

# Example Request 
This is a full example, a real case typically has elss fields.
```bash
curl --request POST \
  --url https://api.housecallpro.com/estimates \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "customer_id": "cus_abc123def456",
    "assigned_employee_ids": [
      "emp_123456"
    ],
    "message": "Here is your estimate for the garage door repair.",
    "lead_source": "Website",
    "address": {
      "street": "123 Main Street",
      "city": "Anytown",
      "state": "CA",
      "zip": "90210"
    },
    "options": [
      {
        "name": "Standard Service",
        "line_items": [
          {
            "name": "Garage Door Repair",
            "description": "Replace broken torsion spring",
            "unit_price": 350,
            "quantity": 1
          }
        ]
      }
    ],
    "tax": {
      "taxable": true,
      "tax_rate": 8.5,
      "tax_name": "CA Sales Tax"
    },
    "schedule": {
      "start_time": "2026-07-05T09:00:00Z",
      "end_time": "2026-07-05T11:00:00Z",
      "arrival_window_in_minutes": 30,
      "notify_customer": true
    }
  }'
```

---

# Example Success Response

```json
{
  "id": "est_123456789",
  "estimate_number": "EST-00123",
  "work_status": "open",
  "lead_source": "Website",
  "customer": {
    "id": "cus_abc123def456",
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@example.com",
    "mobile_number": "(555) 123-4567"
  },
  "address": {
    "id": "addr_987654",
    "type": "billing",
    "street": "123 Main Street",
    "city": "Anytown",
    "state": "CA",
    "zip": "90210"
  },
  "schedule": {
    "scheduled_start": "2026-07-05T09:00:00Z",
    "scheduled_end": "2026-07-05T11:00:00Z",
    "arrival_window": 30
  },
  "created_at": "2026-06-29T20:00:00Z",
  "updated_at": "2026-06-29T20:00:00Z"
}
```

---

# Notes

- `customer_id` is required.
- Provide either `address` or `address_id`.
- An estimate can be created **already scheduled** by including the `schedule` object.
- The scheduling fields (`start_time`, `end_time`, `arrival_window_in_minutes`, `notify_customer`) belong **inside** the `schedule` object.
- `assigned_employee_ids` assigns employees to the estimate.
- `assigned_employee_ids` is **separate from scheduling**. Assigning employees does not automatically schedule the estimate.
- The scheduling/update endpoint should only be used to **modify an existing schedule** after the estimate has been created.
- Request field names (`start_time`, `end_time`) differ from response field names (`scheduled_start`, `scheduled_end`).
- Store the returned estimate `id` for future operations such as updating, rescheduling, approving, or converting the estimate into a job.