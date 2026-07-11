# Housecall Pro API - Update Estimate Option Schedule
**For AI Agents & Developers**

## Endpoint
**PUT** `https://api.housecallpro.com/estimates/{estimate_id}/options/{option_id}/schedule`

**Purpose**: Update the schedule (time, employees, arrival window) for a **specific option** inside an estimate.

### Important Notes for AI Agents
- Most estimates have **only one main option**.  
  → **You can usually just use the first `option_id`** from the estimate response.
- Before calling this endpoint, **you should**:
  1. Call **Get Estimate by ID** (`housecall_pro_get_estimate_by_estimate_id.md`) to retrieve available `option_id`(s).
  2. (Optional) Call **Get Employees** (`housecall_pro_get_employees.md`) to choose valid `employee_id`(s).

### Path Parameters
- `estimate_id` (string, **required**)
- `option_id` (string, **required**)

### Request Body (application/json)

```json
{
  "start_time": "2025-07-05T10:00:00Z",          // ISO-8601, required
  "end_time": "2025-07-05T12:00:00Z",            // ISO-8601
  "arrival_window_in_minutes": 60,
  "notify": true,                                // Notify customer
  "notify_pro": true,                            // Notify employee(s)
  "dispatched_employees": [
    {
      "employee_id": "emp_001"                   // Required for assignment
    }
  ],
  "expand": ["dispatched_employees"]             // Optional
}
```

### Example Request (cURL)
```bash
curl --request PUT \
  --url 'https://api.housecallpro.com/estimates/est_1234567890/options/opt_001/schedule' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "start_time": "2025-07-05T10:00:00Z",
    "end_time": "2025-07-05T12:00:00Z",
    "arrival_window_in_minutes": 60,
    "notify": true,
    "notify_pro": true,
    "dispatched_employees": [{"employee_id": "emp_001"}]
  }'
```

### Example Request (Python)
```python
import requests

url = "https://api.housecallpro.com/estimates/est_1234567890/options/opt_001/schedule"
headers = {
    "Accept": "application/json",
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "start_time": "2025-07-05T10:00:00Z",
    "end_time": "2025-07-05T12:00:00Z",
    "arrival_window_in_minutes": 60,
    "notify": True,
    "notify_pro": True,
    "dispatched_employees": [{"employee_id": "emp_001"}]
}

response = requests.put(url, headers=headers, json=payload)
print(response.json())
```

---

## Response (200 OK)

```json
{
  "start_time": "string",
  "end_time": "string",
  "arrival_window_minutes": 0,
  "assigned_employees": [ { Employee object } ]
}
```

### Flow Recommendation for Agents
1. `GET /estimates/{estimate_id}` → extract `option_id`
2. (Optional) `GET /employees` → pick suitable employee(s)
3. `PUT /estimates/{estimate_id}/options/{option_id}/schedule` → update schedule

---

**Previous related files:**
- [Get Single Estimate](./housecall_pro_get_estimate_api_for_ai_agent.md)
- Sample Estimate JSON

Let me know if you need a Pydantic model, combined workflow script, or the next endpoint documented!