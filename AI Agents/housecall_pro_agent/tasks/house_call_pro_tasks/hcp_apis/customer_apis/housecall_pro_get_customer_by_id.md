# Housecall Pro API - Get Customer by ID

**For AI Agents & Developers**

## Endpoint
**GET** `https://api.housecallpro.com/customers/{customer_id}`

**Purpose**: Retrieve full customer details including contact info, addresses, tags, and optional attachments / do-not-service flag.

### Path Parameters
- `customer_id` (string, **required**)

### Query Parameters
- `expand` (array of strings, optional)  
  Allowed values:  
  - `attachments`  
  - `do_not_service`

### Example Request (cURL)
```bash
curl --request GET \
  --url 'https://api.housecallpro.com/customers/cus_987654321?expand=attachments,do_not_service' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

### Example Request (Python)
```python
import requests

url = "https://api.housecallpro.com/customers/cus_987654321"
headers = {
    "Accept": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
params = {
    "expand": ["attachments", "do_not_service"]
}

response = requests.get(url, headers=headers, params=params)
customer = response.json()
print(customer)
```

---

## Response Structure (200 OK)

```json
{
  "id": "string",
  "first_name": "string | null",
  "last_name": "string | null",
  "email": "string | null",
  "mobile_number": "string | null",
  "home_number": "string | null",
  "work_number": "string | null",
  "company": "string | null",
  "notifications_enabled": boolean,
  "lead_source": "string | null",
  "notes": "string | null",
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601",
  "company_name": "string",
  "company_id": "string",
  "tags": ["string"],
  "addresses": [ { Address object } ],
  "attachments": [ { Attachment object } ],     // only if expanded
  "do_not_service": boolean                     // only if expanded
}
```

### Key Fields for AI Agents

- **Contact**: `first_name`, `last_name`, `email`, `mobile_number`
- **Addresses**: Array of billing/service addresses
- **Flags**: `notifications_enabled`, `do_not_service` (critical!)
- **Tags**: Useful for segmentation
- **Notes**: Often contain important context

---

## Tips for AI Agents
- Always check `do_not_service` flag before any scheduling or communication.
- Use `expand=attachments,do_not_service` when full context is needed.
- Store `customer_id` for future operations (create job, estimate, invoice, etc.).
- Handle null values for optional fields like phone numbers and company.

**Related files:**
- [Get Single Estimate](./housecall_pro_get_estimate_api_for_ai_agent.md)
- [Update Estimate Option Schedule](./housecall_pro_update_estimate_option_schedule_for_ai_agent.md)

Would you like the next endpoint documented? (e.g. Create Job, Get Employees, etc.)