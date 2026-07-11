# HCP_APIS_README.md

# Overview

This directory contains the technical documentation for every Housecall Pro API used by the assistant.

Unlike `BUSINESS_TASK_WORKFLOWS.md`, which explains **what business process should be followed**, this directory explains **how to perform each API operation**.

Each markdown file contains:
- The purpose of the API
- Required IDs or dependencies
- Required request body fields
- Optional query parameters
- Important implementation notes
- Example request/response (when applicable)

Whenever you determine that a workflow requires interacting with Housecall Pro API, locate the appropriate API documentation in this directory and read it(contains more specific instructions and knowledge base about the api) before making the request.
# CRITICAL: Strict Adherence to API Documentation for Request Bodies
For all Housecall Pro API interactions, the API documentation within this directory (`hcp_apis/`) is the **absolute source of truth** for request body structures (JSON, form data, etc.), query parameters, and examples. You **must not** infer, assume, or suggest any structure that is not explicitly detailed or demonstrated in the corresponding markdown file for a given API. Any "bash" or "json" examples provided in these documents are sourced directly from actual Housecall Pro documentation and are to be followed precisely.

If there is any uncertainty regarding the exact structure of a request body, parameter, or command, you **must immediately consult the specific API's markdown file** within this directory and adhere to its instructions. Do not rely on general patterns or prior assumptions if a specific API's documentation is available. Do not add fields that aren't mentioned.
---

# Important Guidelines

## Timezone Handling (CRITICAL)
All `start_time` and `end_time` fields for scheduling and appointments in Housecall Pro API requests **must be provided in ISO-8601 UTC format (ending with 'Z')**. Even though internal requests or your operating environment may specify times in PDT (America/Los_Angeles), you **must convert these times to UTC** before sending them in any API payload. Failure to convert will result in incorrect scheduling within Housecall Pro, as the API will interpret the provided time as UTC.

To ensure correct conversion:
1. Determine the local PDT time requested.
2. Convert this local PDT time to its equivalent UTC ISO-8601 string (e.g., "2026-07-06T23:00:00Z").
3. Use the UTC string in the API request body.

### Notification Control (CRITICAL)
- **Customer Notifications:** Always set `notify_customer` fields (or similar flags) to `false` in API payloads. This prevents unintended communications.
- **Pro Notifications:** Where an API supports it, ensure `notify_pro` (or equivalent) fields are set to `true` to keep assigned employees informed. If no such field exists, assume the default system behavior.
---
## Strict Adherence to API Documentation for Request Bodies
For all Housecall Pro API interactions, the API documentation within this directory (`hcp_apis/`) is the **absolute source of truth** for request body structures (JSON, form data, etc.), query parameters, and examples. You **must not** infer, assume, or suggest any structure that is not explicitly detailed or demonstrated in the corresponding markdown file for a given API. Any "bash" or "json" examples provided in these documents are sourced directly from actual Housecall Pro documentation and are to be followed precisely.

If there is any uncertainty regarding the exact structure of a request body, parameter, or command, you **must immediately consult the specific API's markdown file** within this directory and adhere to its instructions. Do not rely on general patterns or prior assumptions if a specific API's documentation is available.

---
## Never spawn subagents
All task workflows are currently done with the main session agent, you NEVER spawn a subagent and leave it running. 

## API Key
If you are still unsure how to find the api key, refer to system/integrations/INTEGRATIONS.md,
Do not read this file if you already have it in memory from startup.

## Matching API
When you have request for apis explicitly, don't be verbose, parse the files and figure out which api is most likely to match by name or its text content. The intent is what matters.

## Keep important IDs

Many Housecall Pro APIs return IDs that are required by later API calls.

Common examples include:

- `customer_id`
- `estimate_id`
- `estimate_option_id`
- `employee_id`
- `location_id`

Always retain IDs that are relevant to the **current workflow**, as they are frequently reused by subsequent API operations.

Do **not** retain large API response bodies or unrelated records, as they unnecessarily consume context.

---

## API Documentation Structure

Each API markdown follows generally the same format:

- Purpose
- Dependencies and important instructions
- Query Parameters (if applicable) or path parameters
- Request Body (if applicable)
- Response Notes
- Examples
- Special considerations

---

# Directory Overview

## `customer_apis/`

Customer management APIs.

These APIs are used whenever a workflow involves:

- Finding customers
- Creating customers
- Updating customers
- Retrieving customer information

Current APIs:

- `housecall_pro_get_customers.md`
- `housecall_pro_get_customer_by_id.md`
- `housecall_pro_create_customer.md`
- `housecall_pro_update_customer.md`

# Housecall Pro - Customer APIs
**Category:** `hcp_apis\customer_apis`

Any action that directly involves a customer, manipulation of customer data, or data needed to be obtained from a certain customer or customers is found here.
---

## Available Endpoints

### 1. housecall_pro_get_customers.md
**Method:** `GET /customers`

**Purpose:**  
Retrieves a list of many customers, with optional search queries and pagination.  
Often this is the **first API** to use to check if a customer exists within the database first to determine next actions.

**Dependencies:**  
- None required.  
- Optional query parameters: `q`, `page`, `page_size`.

---

### 2. housecall_pro_get_customer_by_id.md
**Method:** `GET /customers/{customer_id}`

**Purpose:**  
Returns a single customer by using their known id.  
Can be obtained from customer creation, or found from `get customers`.  
An important ID to save in session memory and connect to the current customer involved.

**Dependencies:**  
- None required.  
- Optional query parameters for expansion (e.g., `attachments`, `do_not_service`).

---

### 3. housecall_pro_create_customer.md
**Method:** `POST /customers`

**Purpose:**  
Creates a new customer record that can later be used for jobs, estimates, invoices, and other customer-related resources.  
Often used when explicitly asked to create a customer, or if an existing customer wasn't found and the task depends on that customer.

**Dependencies:**  
- Requires the customer's required information in the request body (e.g., name and other required fields).  
- No existing IDs are required.

### 4. housecall_pro_update_customer.md POST /customers/{customer_id} 
**Purpose:** Updates an existing customer's information. Often used when prompted to update something about a customer 

**Dependencies:** 
- Requires customer_id. 
- Requires the fields to update in the request body.

### 5. housecall_pro_update_customer.md POST /customers/{customer_id} /addresses
**Purpose:** Updates the address of a customer. This API actually creates a new address, however there is no API to specifically patch an address, so this is the API to use for any "Add/update/change" customer address requests.

**Dependencies:** 
- Requires customer_id. 
- Requires all body parameters except latitude/longtitude and street_line2

**Next Steps Recommendation for Agents:**
1. Search for existing customer → `GET /customers` 
2. If not found → `POST /customers`
3. Save `customer_id` for all subsequent operations

---

## `estimate_apis/`

Estimate management APIs but NOT management of actual garage door service detaisl on that estimate.

These APIs are used whenever a workflow involves:

- Finding estimates
- Creating new estimates from scratch
- Updating things like files, attachments notes etc. info about estimates
- Scheduling estimates

Current APIs:

- `housecall_pro_get_estimates.md`
- `housecall_pro_get_estimate_by_estimate_id.md`
- `housecall_pro_create_estimate.md`
- `housecall_pro_update_schedule_for_estimate.md`
- `housecall_pro_add_estimate_note.md`

# Housecall Pro - Estimates APIs
**Category:** `hcp_apis\estimate_apis`

---

## Available Endpoints

### 1. housecall_pro_get_estimates.md
**Method:** `GET /estimates`

**Purpose:**  
Retrieves a list of estimates, with optional filtering and pagination.  
This API will be used to determine if an estimate exists for a current customer via their `customer_id`. Often used after `GET /customers`.

**Dependencies:**  
- None required.  
- Optional query parameters for filtering and pagination.

---

### 2. housecall_pro_create_estimate.md
**Method:** `POST /estimates`

**Purpose:**  
Creates a new estimate for a customer.  
Often used if a customer or estimate isn't found via `get customers`/`get estimates`, or when specifically asked to create a new estimate for a customer.

**Dependencies:**  
- Requires `customer_id`.  
- Requires estimate details in the request body (such as options, line items, pricing, etc.).

---

### 3. housecall_pro_get_estimate_by_id.md
**Method:** `GET /estimates/{estimate_id}`

**Purpose:**  
Retrieves the details of a specific estimate.

**Dependencies:**  
- Requires `estimate_id`.

---

### 4. housecall_pro_update_estimate_option_schedule.md
**Method:** `PUT /estimates/{estimate_id}/options/{estimate_option_id}/schedule`

**Purpose:**  
Updates the scheduled date/time for a specific estimate option.  
This API is often used when prompted to change a schedule on an existing estimate.

**Dependencies:**  
- Requires `estimate_id`.  
- Requires `estimate_option_id`.  
- Requires the new schedule information in the request body.

---

**Agent Workflow Recommendation:**
1. Search estimates → `GET /estimates`
2. Create if needed → `POST /estimates`
3. Get details → `GET /estimates/{estimate_id}`
4. Update schedule → `PUT /estimates/{estimate_id}/options/{estimate_option_id}/schedule`

---

## `estimate_service_details_apis/`

Management of actual garage door/service details for an estimate. This is what you use to actually fill/update things for the specific type of custom garage door that was requested among other service details.

These APIs are used whenever a workflow involves:

- Finding estimates
- Creating new estimates from scratch
- Updating things like files, attachments notes etc. info about estimates
- Scheduling estimates

Current APIs:

- `housecall_pro_get_estimate_line_items.md`
- `housecall_pro_add_line_items.md`
- `housecall_pro_create_estimate_option.md`

# Housecall Pro - Estimates APIs
**Category:** `hcp_apis\estimate_service_details_apis`

---

## Available Endpoints

### 1. housecall_pro_create_estimate_option.md
**Method:** POST https://api.housecallpro.com/estimates/{estimate_id}/options`

**Purpose:**  
Creates a new option which in practice means a new garage door the customer requested.

**Dependencies:**  
- Requires `estimate_id`.  
- Requires `name` in the estimate body, which refers to the constructed name from the request (Door size + Design + Color) 

### 2. housecall_pro_get_line_items.md
**Method:** `GET https://api.housecallpro.com/estimates/{estimate_id}/options/{option_id}/line_items`

**Purpose:**  
Get the actual door and service details (each detail is a line item) of the estimate, you use this to check what the current estimate holds to use in the next API

**Dependencies:**  
- `estimate_id` (string, required): The ID of the estimate.
- `option_id` (string, required): The ID of the estimate option we are targeting

### 3. housecall_pro_add_line_items.md (VERY IMPORTANT)
**Method:** `PUT https://api.housecallpro.com/estimates/{estimate_id}/options/{option_id}/line_items/bulk_update`

**Purpose:**  
This is the single most important API so play special attention to the details surrounding this one. This API is what will actually fill in the service and garage door details such as the door configuration(garage door size, color, design, windo, installation fee, opener fee etc.). IT ALSO serves not just as the api to add new line items, but also for updating, re-order, AND deletion.  You do not use any other api for handling line items, except thr add option api to handle an entirely different garage door for that customer's estimate.

**Dependencies:**  
- `estimate_id` (string, required)
- `option_id` (string, required)
- The knowledge of the current line items in the estimate via housecall_pro_get_line_items.md
-  `estimate_service_details_apis/price_book_ids.md`


### 4. The file `play_book_ids` (VERY IMPORTANT)
This is also the single most important folder to traverse when actually adding in the estimate details. You use the information from this folder before making any calls to the additional of NEW line items within an option. All estimate door detail requests map to this file 
`playbooks_ids_README.md` located under the directory.

**Purpose:**  
The folder defines not just the instructions for how to handle specific customer garage door details, learning the rules,quirks, and the language for garage door estimates, but also outlines ALL of the required service_ids that are needed to reference to the correct items based on those nuances of garage door estimate details.


### 5. housecall_pro_find_materials.md (IMPORTANT TO UDNERSTAND)
Two APIS here:
API 1 **Method:** GET `https://api.housecallpro.com/api/price_book/material_categories`
API 2 **Method:** GET `https://api.housecallpro.com/api/price_book/materials`

**Purpose**
These API's can expose all of the currently added materials the business has added in the  house call pro backend system. The purpose ius to use these two API's for materials that were failed to be found under the documented materials playbook `estimate_service_details_apis\play_book_ids\Materials Playbook`.  When parsing the fodlers and markdown files under there fails to yield results OR you are explicitly requested to add the materials through the get materials api's, you reference this fodler and call those API's before calling the `estimate_service_details_apis/housecall_pro_add_line_items.md` file

**Dependencies**
- The `uuid` field of the material category to use as the parent id for the categories API
- The `uuid` field of the last category to use as the parent category id to expose final materials for the materials API
- The query parameter of "page_size=50" for both apis to see all the categories or materials
- A failure to find any matching materials whatsoever

Details on when exactly it is appropriate to use this api are further found under `\estimate_service_details_apis\play_book_ids\playbooks_ids_README.md`

## `job_apis.`
### 1. housecall_pro_create_job.md
**Method:** **POST** `https://api.housecallpro.com/jobs`

**Purpose:**  
This API is only used to create a job and often associated schedule for it, alongside the note, you are not adding any line items or service options to it.


**Dependencies:**  
- `customer_id` (string, required)
- `address_id` (string, required)

### 2. housecall_pro_update_schedule.md
**Method** **PUT** `https://api.housecallpro.com/jobs/{job_id}/schedule`

**Purpose:**
This API is used when asked to add or update a schedule appointment for a job that already exists or was created recently by the agent.

**Dependencies:**  
- `job_id` (Path Parameter,  required)

### 3. housecall_pro_get_jobs.md
**Method** **GET** `https://api.housecallpro.com/jobs`

**Purpose**
Use when trying o find jobs based on a certain request, like is {customer_name} has a job, if {employee_name} has a job a job for {customer_name}, or if asked to update schedule for an existing job.


**Dependencies:**  
- None



## `employee_apis/`

Employee-related APIs.

These APIs are primarily used to retrieve employee information and employee IDs that may be required by other API operations.

Current APIs:

- `housecall_pro_get_employees.md`

### housecall_pro_get_employees GET /employees 

**Purpose:** Retrieves a list of employees within the Housecall Pro account. You will need the employee id for other api. HOWEVER, they are are so little they will be provided for you, you likely will never be using this api but its there. 
**Dependencies:** 
- None required. 
- Optional query parameters may be used for filtering and pagination.

---

# General Notes

Not every task requires only a single API.

Many business workflows require chaining multiple API calls together.

For example:

- Find customer → Create customer if needed → Create estimate
- Find customer → Find estimate → Update estimate
- Find customer → Find estimate → Update schedule

The business workflow determines **what** needs to happen, while the API documentation explains **how** each individual operation is performed.

Whenever possible, reuse information already obtained during the current workflow instead of making duplicate API calls. If an ID has already been retrieved (such as a `customer_id` or `estimate_id`), continue using it throughout the task rather than searching again.

---

# Troubleshooting Shell Command & JSON Escaping Issues

When executing `curl` commands with complex JSON payloads, especially those involving nested quotes or special characters, several common shell and JSON escaping issues can arise. This section documents issues encountered and their solutions.

## 1. Incorrect File Path Separators

**Issue**: Using backslashes (`\`) instead of forward slashes (`/`) in file paths when reading documentation or referencing files in a Linux environment.

**Example Error**: `ENOENT: no such file or directory, access '...\path\to\file.md'`

**Solution**: Always use forward slashes (`/`) for all file paths in a Linux environment. Backslashes are treated as escape characters in shell and will lead to incorrect path resolution.

## 2. Shell Syntax Errors with Nested Quotes and Special Characters

**Issue**: Shell (e.g., `bash`) misinterpreting special characters or nested quotes within a JSON payload when passed as a single-quoted string to `curl -d`.

**Example Errors**:
- `syntax error near unexpected token '('` (due to unescaped parentheses in description strings)
- `unexpected EOF while looking for matching '` (due to complex interaction of single quotes around the JSON and single quotes within JSON values)

**Solution**: To avoid complex and error-prone shell escaping, especially for multi-line JSON payloads or those containing numerous special characters, use a **"here document" (heredoc)** with `curl --data @-`.

**Example of correct usage (heredoc)**:

```bash
curl -X PUT "https://api.housecallpro.com/estimates/{estimate_id}/options/{option_id}/line_items/bulk_update" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $HOUSECALL_API_KEY" \
  -H "Content-Type: application/json" \
  --data @- << EOF
{
  "line_items": [
    {
      "name": "Example Item with 'quotes' and (parentheses)",
      "description": "This description contains \"double quotes\" and \\ backslashes."
    }
  ]
}
EOF
```

**Key benefits of heredoc**:
- The content between `EOF` markers is treated literally by the shell, simplifying JSON escaping.
- No need to escape single quotes, parentheses, or most other special characters that are valid within JSON strings.
- Only double quotes (`\"`) and backslashes (`\\`) within the JSON string itself need to be escaped as per standard JSON rules.

This approach ensures the JSON payload is passed to `curl` exactly as intended, preventing shell-related parsing issues.