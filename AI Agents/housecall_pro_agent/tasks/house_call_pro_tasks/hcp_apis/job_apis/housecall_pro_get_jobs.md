# Housecall Pro - Get Jobs API Guide

**For AI Agents / Automation**

## Purpose
Use when trying o find jobs based on a certain request, like is {customer_name} has a job, if {employee_name} has a job a job for {customer_name}, or if asked to update schedule for an existing job.

## Endpoint
**GET** `https://api.housecallpro.com/jobs`

**Required Headers:**
- `Accept: application/json`
- `Authorization: Bearer YOUR_API_KEY`

## Common Query Parameters

| Parameter              | Type             | Description |
|------------------------|------------------|-----------|
| `customer_id`          | string           | Filter by customer |
| `employee_ids`         | array            | Filter by employees |
| `page`                 | integer          | Page number (default: 1) |
| `page_size`            | integer          | Results per page (default: 10) |
| `scheduled_start_min`  | ISO datetime     | Jobs starting after this date |
| `scheduled_start_max`  | ISO datetime     | Jobs starting before this date |
| `work_status`          | array            | e.g. `["scheduled", "completed"]` |
| `sort_by`              | string           | `created_at`, `updated_at`, etc. |
| `sort_direction`       | string           | `asc` or `desc` |
| `expand`               | array            | `attachments`, `appointments` |

## Example cURL

```bash
curl "https://api.housecallpro.com/jobs?page=1&page_size=20&work_status=scheduled&sort_by=scheduled_start" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"

## Notes:
- This API is not needed when simply asked to create a job, unlike estimates, jobs can be assumed to be new, unless specifically asked to check for existing jobs.