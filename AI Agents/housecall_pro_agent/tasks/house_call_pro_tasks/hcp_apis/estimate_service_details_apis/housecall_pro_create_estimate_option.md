# Housecall Pro API: Create Estimate Option

**Endpoint:** `POST https://api.housecallpro.com/estimates/{estimate_id}/options`

## Important guidelines:
This API creates a **new option** on an existing estimate. It allows you to add detailed line items (materials, labor, etc.) along with tax settings. However, we removed all of that, house call pro handles the defaults for that, you simply add the name of the option. Each option in practice refers to an individual garage door and its associated service, installation ee, warranty, openers etc. You create a new option for each garage door. When using this api, remember that this creates a new option_id, and you may need to refer to it to then fill in the correct door details for the estimate.

## Request

### Path Parameters
- `estimate_id` (string, required): The UUID of the estimate.

### Headers
- `Accept: application/json`
- `Content-Type: application/json`
- `Authorization: Bearer <token>`

### Body (application/json)
```json
{
  "name": "string",                    // required - Name of the estimate option(garage door config, usually just the size + design +color)
  ```

## Example Request (cURL)
```bash
curl --request POST \
  --url https://api.housecallpro.com/estimates/{estimate_id}/options \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Option A" //That's it, simply pass the name of that option( Garage door Config)
   }'
```

## Response (201 Created)
```json
{
  "id": "string",
  "name": "string",
  "option_number": "string",
  "total_amount": 0,
  "approval_status": "awaiting response",   // pro declined, pro approved, declined, approved, awaiting response, expired
  "message_from_pro": "string",
  "tags": ["string"],
  "status": "open",                         // open, needs scheduling, etc.
  "notes": [],
  "created_at": "string",
  "updated_at": "string",
  "attachments": []
}
```
