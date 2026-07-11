# Housecall Pro API: Create Estimate Option Note

## Overview
**Endpoint**: Add a note to a specific estimate option.

- **Method**: `POST`
- **URL**: `https://api.housecallpro.com/estimates/{estimate_id}/options/{option_id}/notes`
- **Success Response**: `201 Created`

---

## Authentication
```http
Authorization: Bearer YOUR_API_TOKEN

## Path Parameters

estimate_id (string, required)
option_id (string, required)

## Request Body
{
  "content": "Your note text here"
}

## Example Request (cURL):

```bash
curl --request POST \
  --url https://api.housecallpro.com/estimates/est_123/options/opt_456/notes \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "content": "Customer requested to add surge protector installation."
  }'
```

```json
## Example Success Response
json
{
  "id": "note_789",
  "content": "Customer requested to add surge protector installation."
}
```

## Notes for AI Agents

Requires valid estimate_id and option_id.
Useful for adding internal or customer-facing comments on estimate options.

