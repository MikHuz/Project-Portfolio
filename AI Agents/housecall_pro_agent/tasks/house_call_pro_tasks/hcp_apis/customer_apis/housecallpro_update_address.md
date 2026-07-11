# Housecall Pro API: Create Address for Customer

**Endpoint:** `POST https://api.housecallpro.com/customers/{customer_id}/addresses`

This API creates a new address on a customer. It is also the primary (and only available) API endpoint for handling address-related requests, including modifications to existing addresses by creating new ones as needed.  Use this endpoint when you need to associate a new address with a customer or update address information (by creating a replacement address).

## Notes
- All address fields (street, city, state, zip, country) are required for creation. You can assume the state and country based on the city and context, do not assume the zip code.
- `latitude` and `longitude` are optional numeric values.


## Request

### Path Parameters
- `customer_id` (string, required): The ID of the customer.

### Headers
- `Accept: application/json`
- `Content-Type: application/json`

### Body (application/json)
```json
{
  "street": "string",           // required
  "street_line_2": "string",    // optional, can be null
  "city": "string",             // required
  "state": "string",            // required
  "zip": "string",              // required
  "country": "string",          // required
  "latitude": number,           // optional
  "longitude": number           // optional
}
```

## Example Request (cURL)
```bash
curl --request POST \
  --url https://api.housecallpro.com/customers/{customer_id}/addresses \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "street": "123 Main St",
    "street_line_2": "Apt 4B",
    "city": "Anytown",
    "state": "CA",
    "zip": "12345",
    "country": "US",
    "latitude": 37.7749,
    "longitude": -122.4194
  }'
```

## Response (200 OK)
```json
{
  "id": "string",
  "type": "billing",  // or "service"
  "street": "string",
  "street_line_2": "string",
  "city": "string",
  "state": "string",
  "zip": "string",
  "country": "string",
  "customer_id": "string"
}
```
