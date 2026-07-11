# Housecall Pro API - Get Single Estimate by ID
**For AI Agents & Developers**

## Endpoint
**GET** `https://api.housecallpro.com/estimates/{estimate_id}`

### Authentication
Use Bearer token in the `Authorization` header:
```http
Authorization: Bearer YOUR_API_KEY
```

### Path Parameters
- `estimate_id` (string, required) — The unique ID of the estimate

### Query Parameters
- `expand` (array of strings, optional)  
  Allowed value: `attachments`

### Example Request (cURL)
```bash
curl --request GET \
  --url 'https://api.housecallpro.com/estimates/est_1234567890?expand=attachments' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

### Example Request (Python - requests)
```python
import requests

url = "https://api.housecallpro.com/estimates/est_1234567890"
headers = {
    "Accept": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
params = {"expand": ["attachments"]}

response = requests.get(url, headers=headers, params=params)
estimate = response.json()
print(estimate)
```

---

## Response Structure (200 OK)

```json
{
  "id": "string",
  "estimate_number": "string",
  "work_status": "string",
  "lead_source": "string | null",
  "customer": { ... },
  "address": { ... },
  "created_at": "ISO-8601 string",
  "updated_at": "ISO-8601 string",
  "company_name": "string",
  "company_id": "string",
  "work_timestamps": { ... },
  "schedule": { ... },
  "assigned_employees": [{ ... }],
  "estimate_fields": { ... },
  "options": [{ ... }]
}
```

### Key Fields for AI Agents

**1. Customer Information**
- `customer.first_name`, `customer.last_name`, `customer.email`, `customer.mobile_number`
- `customer.notes`

**2. Address**
- `address.street`, `address.city`, `address.state`, `address.zip`

**3. Scheduling**
- `schedule.scheduled_start` / `scheduled_end`
- `schedule.appointments[]`

**4. Estimate Options (Most Important)**
Each item in `options[]` contains:
- `name`
- `total_amount` (in cents)
- `approval_status` → e.g., "approved", "awaiting response", "declined"
- `message_from_pro`
- `notes[]`
- `attachments[]` (if expanded)

**5. Status Fields**
- `work_status`
- `status` (inside options)
- `approval_status`

---

## Sample Response (with realistic data)
See the attached JSON file: `housecall_pro_estimate_example.json`

## Tips for AI Agents
- Always check `options[].approval_status` to determine next actions.
- Use `expand=attachments` when you need files (photos, PDFs, etc.).
- Dates are in ISO-8601 format — parse with datetime libraries.
- `total_amount` is in **cents** (e.g., 125000 = $1,250.00).
- Handle null values gracefully (especially phone numbers, notes, etc.).

Would you like me to also create:
- A full OpenAPI/Swagger snippet?
- A Pydantic model for Python?
- Or a function template for your agent?
```

---

**Updated file for AI agent use created!**  
You now have a clear, agent-friendly documentation file.  

Download it here: