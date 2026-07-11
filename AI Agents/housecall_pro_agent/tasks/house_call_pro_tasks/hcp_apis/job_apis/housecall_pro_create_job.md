# Housecall Pro - Create Job API Guide

**For AI Agents / Automation**

Purpose
This API is only used to create a job and often associated schedule for it, alongside the note, you are NOT adding any line items or service options to it, you are only creating a job, schedule, and documenting the notes to describe the job and any other notes that were given to you.

## Endpoint
**POST** `https://api.housecallpro.com/jobs`

**Required Headers:**
- `Accept: application/json`
- `Authorization: Bearer YOUR_API_KEY`
- `Content-Type: application/json`

## Key Fields

| Field                        | Type              | Notes |
|-----------------------------|-------------------|-------|
| `customer_id`               | string (req)      | Existing customer UUID |
| `address_id`                | string (req)      | Existing address UUID |
| `description`               | string            | Job title |
| `schedule.scheduled_start`  | ISO datetime      | Required for scheduling |
| `schedule.scheduled_end`    | ISO datetime      | End time |
| `assigned_employee_ids`     | array[string]     | Employees |
| `work_status`               | string            | scheduled, in_progress, etc. |
| `notes`                     | string (req here) | Input the service details here |
| `lead_source`               | string            | Source if it was given |


## Minimal Request Body EXAMPLE(JSON)

```json
{
  "customer_id": "customer_uuid_here",
  "address_id": "address_uuid_here",
  "description": "Job description or title",
  "schedule": {
    "scheduled_start": "2026-07-15T09:00:00",
    "scheduled_end": "2026-07-15T11:00:00"
  },
  "assigned_employee_ids": ["employee_uuid_here"],
  "work_status": "scheduled",
  "notes": `{input the actual service details here}`
}
```


## cURL Example

```bash
curl -X POST https://api.housecallpro.com/jobs \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -data '{
    "customer_id": "cust_123",
    "address_id": "addr_456",
    "description": "Sample Job",
    "schedule": {
      "scheduled_start": "2026-07-15T09:00:00",
      "scheduled_end": "2026-07-15T11:00:00",
      "arrival_window": 0
    },
"assigned_employee_ids": [
    "{employee_id}"
  ],
 "lead_source": "Yelp",
 "notes": "Customer requested a broken garage door panel replacement and new cables"
  }'
```

**Notes:**
- First ensure customer and address exist.
- Make sure to fill in the notes string, and the lead source if available
- Add the schedule object right away if you were given a schedule time and date, otherwise use the update job schedule api if requested later
- Dates should be in ISO 8601 format.
- Do NOT add any line items for the jobs api even if they are similar to estimate requests. only estimate requests need line items added

---

