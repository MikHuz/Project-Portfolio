# Housecall Pro - Update Job Schedule API Guide

**For AI Agents / Automation**

## Purpose
This API is used when asked to add or update a schedule appointment for a job that already exists or was created recently by the agent.

## Endpoint
**PUT** `https://api.housecallpro.com/jobs/{job_id}/schedule`

**Required Headers:**
- `Accept: application/json`
- `Authorization: Bearer YOUR_API_KEY`
- `Content-Type: application/json`

## Path Parameter
- `job_id` (required) – The ID of the job to update

## Request Body Example

```json
{
  "start_time": "2026-07-20T09:00:00",
  "end_time": "2026-07-20T11:30:00",
  "arrival_window_in_minutes": 30,
  "notify": true,
  "notify_pro": true
}
```

## Field Reference

| Field                        | Type          | Description |
|-----------------------------|---------------|-----------W|
| `start_time`                | string (req)  | ISO 8601 start datetime |
| `end_time`                  | string (req)  | ISO 8601 end datetime |
| `arrival_window_in_minutes` | number        | Arrival window in minutes (e.g. 0, 15, 30) |
| `notify`                    | boolean       | Notify the customer |
| `notify_pro`                | boolean       | Notify the assigned employee |
| `dispatched_employees`      | array         | employee id's |


## cURL Example

```bash
curl -X PUT \
  https://api.housecallpro.com/jobs/JOB_ID_HERE/schedule \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "start_time": "2026-07-20T09:00:00",
    "end_time": "2026-07-20T11:30:00",
    "notify": false,
    "notify_pro:false, 
     "disatched_employees:[employee_id1,employeeid2, etc.	]

  }'
```

**Important Notes:**
- This endpoint cannot update multi-day jobs with multiple appointments. Use the appointments endpoints instead.
- Dates must be valid ISO 8601 format.

---