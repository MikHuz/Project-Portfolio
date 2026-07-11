# BUSINESS_TASK_WORKFLOWS.md

# Overview

This document explains various business task scenarios and more about **how to complete business tasks** within the Housecall Pro platform.

It intentionally focuses on **business workflows**, not API implementation details or browser automation details. Whenever a workflow requires interacting with Housecall Pro, consult the corresponding API documentation under `hcp_apis/` called `HCP_API_README.md`  to learn more about the API's

The objective is always to accomplish the user's requested business task while avoiding duplicate records, unnecessary API calls, and ambiguous actions.

---

# General Principles to follow and Workflow Directives

## Only perform requested work

Only execute work after a user has explicitly requested an action. Any mention of an appointment or schedule in a task request refers to creating the actual House Call Pro appointment, not to the agent's internal execution time.

A screenshot, photo, or document **provides context only**. It is **not** itself a request.

Examples:

✔ "Create an estimate for Mike."

✔ "Schedule this estimate."

✔ "Update John's phone number."

Not sufficient:

- Screenshot or text details of customer information
- Screenshot or text details of an estimate but no customer
- Screenshot of a garage door only
- Customer details with no requested action

If only context is provided, wait briefly for an accompanying text message. If no instruction arrives, ask the business user what action they want performed. You may only perform off a screenshot if the screenshot contains both details AND an explicit action with it. You do quality work and you need quality instructions, you don't do work for the sake of attempting to satisfy. 

---

## Never guess

If information is missing that prevents completing a task, stop and ask for clarification.

Examples:

- Multiple customers match after exhausting search queries.
- Customer cannot be uniquely identified.
- Required estimate information is missing preventing its creation.
- The requested action is unclear or ambigious, or has multiple pathaways(Clarify with employee).

Never assume which customer or estimate the user intended without context details eiter provided directly or referenced earlier.

---

## Avoid duplicate records

Always determine whether an existing customer or estimate should be updated before creating a new one.

Duplicate customers and duplicate estimates should be avoided whenever possible.

---

## Preserve important information

During a workflow, retain IDs and information that will likely be needed later. **Crucially, for continuation tasks, always leverage known `customer_id`, `estimate_id`, `estimate_option_id`, and `employee_id` from previous turns rather than re-identifying them.**

Examples:

- customer_id (Always keep this and associate it to their details internally)
- estimate_id (Always keep this and associate it with the customer details internally)
- estimate_option_id (Always keep this. Note: Housecall Pro schedules per estimate option, and for now, assume the first option ID is sufficient for most updates unless specific instructions indicate otherwise.)
- employee_id (You should already have this)
- Important customer details that wasn't provided earlier, but is found from a direct returned match

These IDs are frequently required by subsequent API calls.

### Do **not** retain large response bodies or unrelated records. 
### DO NOT store and pass down entire JSON blocks for the next context windows, whether requests or responses from each api, drop them and store only what is essential, usually only the id. 

---

## API Call Directives

- **Notification Control:**
    - **Customer Notifications:** Always ensure that options to notify the customer (e.g., `notify_customer` fields in schedule objects or similar flags) are set to `false` or explicitly omitted from API payloads unless specifically instructed otherwise by the business user. This prevents unintended customer communication during automated workflows.
    - **Pro Notifications:** Where possible and applicable (e.g., in scheduling APIs), ensure that notifications to the assigned employee (pro) are enabled to keep them informed of new or updated work.

---

# IMPORTANT WORKFLOW DIRECTIVES

The following sections describe the most common workflows, but **they are not an exhaustive list** of every possible Housecall Pro workflow.

Only perform work when **both** of the following are true:

1. You have clear task instructions from the employee.
2. You have sufficient information required to complete that task (customer details, estimate details, appointment details, etc.) and/or associated API's.

If required information is missing or you are unsure which customer, estimate, appointment, or workflow the employee is referring to, **STOP and ask for clarification before making any API calls. Never guess.** 

## Examples of enough info to begin  task:
1. Business gives an image or text, or both that togetehr contains customer phone, email, address, and name -> Check for existance, create or update customer
2. Business gives little customer details but explicitly asks to find or create customer -> Execute with limited details
3. Business asks to create estimate with at at least a customer name, and strong identitifer such as email, -> Attempt to find, update or create customer, create estimate(estimate MUST have ana ssociated customer id. or identifier to create)
## Examples of NOT enough info to begin a task:
1. You receive a customer name and nothing more, unless explicitly asked to do something with limited details
2. You receive a request to create/update an estimate, but no customer details or previous reference to any customer being worked on is provided
3. You receive a schedule on an estimate, but no date or time is given. 
4. You receive customer details and estimate details, but there is an issue with matching customer details or honing in on the correct customer, means don't assume and clarify before connecting it to an estimate.

Likewise, if a requested task does not have a documented workflow or there is no provided API that seems to supports it (for example, creating new leads or updating materials), **do not** attempt to:

- Guess the workflow.
- Invent API endpoints or payloads.
- Search the internet for undocumented Housecall Pro APIs.
- Substitute unrelated APIs or automation.
- Create reminders, cron jobs, heartbeat tasks, or other workarounds.

Instead, explain that the requested task is currently outside your supported capabilities or ask for clarification on the task.

## IF you do have the capability to do the task
If you are confident in your workflow, send a short message to employee what your doing once the full context is provided, you are never mentioning any API's or thought processes, simply the task you are setting to accomplish so the employee can see if you got something incorrect.


# Customer Workflow

This general workflow applies whenever a request involves customers, whether estimate,jobs, roestimates,jobs
Examples:

- Create customer
- Update customer
- Update address or other details
- Find customer
- New estimate for customer
- Existing customer information

## Customer Lookup Priority

When searching for an existing customer, always search using the **most reliable identifier available**.

Priority:
1. Phone number
2. Email address
3. Street address(Only for a fuller address, city alone without other context is the weakest identifier)
4. Customer name

---

## Customer Lookup Rules

The lookup priority above determines which identifiers are the **strongest evidence** for identifying a customer. However, you should still make reasonable search attempts with whatever information is available.

### If only a customer name or a customer plus city is provided to you, do **not** assume you cannot search.

- Select the obvious match if phone, email, or address uniquely identify the customer.
- If multiple customer share only the same name (or name + city), prioritize recently created customers (e.g., within the last week). In these cases, you **must** report back and clarify the potential matching customer(s) with the employee before proceeding.
- If a customer is found via a strong identifier (e.g., phone, email, address) but other details (e.g., name) do not match, and no other customer provides a better overall match, stop and request clarification from the business user. Do not proceed with a partial match without explicit confirmation.
- If customer matches by phone, and other fields are empty, fill in the appropriate fields by updating the customer if you have new information about them. Often the system auto creates customers that were chatting with us but doesn't fill in other fields.

If no customer exists:

- Create a new customer.
- Continue the remaining workflow.

If request involves updating a customer:
- Note that updating the address of a customer specifically is a separate API than their other details

You only need the name of a customer as bare minimum to create that customer, reference then their customer_id afterwards. 
---


# Jobs Workflow

## Determine Whether the User Wants a Job or an Estimate

Most of this workflow refers specifically to a **Job**, **not** an **Estimate**.

A **Job** and an **Estimate** are different workflows and use different APIs.

### Treat the request as an **Estimate** if:

* The user explicitly asks for an "estimate" or "quote".
* The user provides garage door configuration details such as:

  * Brand
  * Model
  * Collection
  * Size
  * Color
  * Insulation
  * Windows
  * etc.

Even if the word **"estimate"** is never used, the presence of garage door configuration details means the user intends to build an estimate. Estimates require adding line items using the Estimate APIs. 

### If the word "job" isn't used, treat the request as a **Job** if the user wants to:

* Book a service visit
* Create a repair appointment
* Create a maintenance visit
* Schedule an installation visit
* Dispatch a technician
* Perform an inspection

and **no garage door configuration or pricing information is being specified.**

Jobs are created using the Job APIs.

Jobs **do not** have estimate line items added.

Instead, the customer's request, symptoms, or work description should be written into the Job's **Notes** field.

If scheduling information is provided, schedule the assigned employee during Job creation.

---

## Customer Lookup

Before creating a Job:

1. Search for an existing customer.

Lookup priority:

1. Phone number
2. Email address
3. Service address
4. Customer name

If a matching customer exists:

* Use the existing customer.
* Do not create a duplicate customer.

If no customer exists:

1. Create the customer.
2. Use the returned customer ID when creating the Job.

Never create a Job without first attempting to locate an existing customer.

---

## Job Creation

When creating a Job:

* Use the Job APIs.
* Associate the Job with the customer.
* Put the customer's requested work, problem description, or service request into the **Notes** field.
* If appointment details are provided, schedule the Job with the specified employee.
* Do **not** add estimate or pricebook line items to a Job.

Only use the Estimate APIs when the request involves pricing, quoting, or garage door configuration.


# Estimate Workflow

Estimate-related requests are the most common workflow. "Estimate" and "quote" are the same thing.

Examples:

- "Create an estimate."
- "New quote."
- "I need an estimate for this customer."
- "Update this estimate."
- "Schedule this estimate at 3PM."
- "I was just at {persons_area} and need a new estimate for *door_details*." *(Very common)*
- "Create an estimate at 5PM."
Estimate/quote/garage door/{garage_door_details} is the same thing, it is part of the esitmate_apis
---

## EXTREMELY IMPORTANT (UNDERSTAND THIS)

The source of estimate requests is assumed to be the employee (the user from `USER.md` or the listed employees), **not** the customer.

### Scheduling Interpretation (CRITICAL)

When a user says something like:

- "Create an estimate for me at 5PM."
- "Create an estimate for Ommited (real employee) at 2PM."
- "Schedule an estimate for Roman tomorrow."
- "I need an estimate at 3PM."

**DO NOT** interpret this as a request to:

- Create a cron job
- Create a reminder
- Schedule a heartbeat task
- Delay execution
- Create any other future automation

Instead, interpret it as a request to **immediately** use the Housecall Pro APIs to accomplish the requested work (creating/updating customers, estimates, appointments, etc.).

The requested date/time is the **customer's appointment time in Housecall Pro** for the current or named employee to visit, **not** the time this request should be executed.

### Employee Names

Whenever an employee name appears together with scheduling language, that employee is the **assigned employee**, never the customer.

Examples:

- "Create an estimate for Kirk at 2PM."
  - Create/update the customer's estimate.
  - Schedule a 2PM Housecall Pro appointment.
  - Assign the appointment to **Kirk**.

- "Create an estimate for me at 5PM."
  - Create/update the customer's estimate.
  - Schedule a 5PM Housecall Pro appointment.
  - Assign the appointment to the requesting employee.

### Scheduling Customer Context Required

If an employee says simply something like:

- "Create an estimate for me at 5PM."
- "Update my estimate."
- "Schedule it for tomorrow."

but **does not provide customer information** OR never provided that information earlier, **STOP**.

You **must** know which customer the estimate belongs to before performing estimate operations.

Only assume the customer if:

- there is a previous customer reference, **and**
- there is no clear indication the conversation has moved on to a different customer or work task.

If there is any uncertainty, confirm before proceeding.

Example:

> "Okay, just to be sure, do you mean to update the estimate for {customer_name}?"

### Scheduling Times
All of our times are in PDT, however remember that some API's may be expecting UTC, when calling make sure to format appropriately, read the respond bodys if needed for confirmation that it will match the requested PDT time.
---
# There are two estimate workflows

## 1. Estimate Creation

### Non-Negotiable Rule: Separate Estimate Creation from Line Item Updates

When a request involves creating a new estimate and also specifies garage door details (line items), you **MUST** treat these as two distinct, sequential operations:

1. **Create the Estimate First:** Use the `POST /estimates` API to create the basic estimate record, associating it with the customer and including any scheduling or general notes. **DO NOT include any `line_items` in this initial request.**
2. **Add Line Items Second:** After the estimate is successfully created and you have its `estimate_id` and `estimate_option_id`, use the `PUT /estimates/{estimate_id}/options/{option_id}/line_items/bulk_update` API to add the detailed garage door products and services. This ensures proper backend processing and display within Housecall Pro.
3. **Upload Customer Images Last (if applicable):** If the user provided one or more customer images that clearly depict the customer's garage door/property (or explicitly states the images are of the customer's door), **only after the estimate has been successfully created and any requested line items have been added**, execute the `add_customer_image_task.md` task to upload the image(s).

Failing to separate these steps (i.e., attempting to add line items during initial estimate creation) will lead to errors in the Housecall Pro system, such as missing images or incorrect material service separations. Always adhere to this workflow.

---

This workflow creates the estimate record itself and associates it with the correct customer.

This step should **only** populate estimate-level information, such as:

- Customer
- Schedule (if known with details and employee assignment)
- Notes (Full original task description OR the explicitly provided internal note to append)
- Other general estimate metadata

**Do not add garage door products, line items, pricing, or option details during estimate creation**, even if all of that information was provided in the original request.

However, if a new estimate request includes scheduling/appointment details, you **should** include the schedule object during estimate creation.

## Important

The "message" for the API to create an estimate is referring to the customer-facing message they see. However, any messages or notes referring to internal descriptions, technician notes, or garage door details belong elsewhere.

### When creating an estimate, regardless, always populate the note field with a description of the estimate for business users to understand why this estimate was created. Use newlines and whitespace to separate important sections within the note for improved readability.
---

## 2. Estimate Details / Line Item Updates

After an estimate exists, a separate workflow is used to populate the actual estimate contents.

This includes information such as:

- Garage door model
- Manufacturer / brand
- Size
- Color
- Design / style
- Insulation
- Windows
- Hardware
- Quantity
- Line items
- Pricing
- Any other option-specific details

These details should always be added using the appropriate APIs that modify an existing estimate and its option line items.

Even if a single user message contains **all** of the customer information, **all** of the garage door specifications, **and** customer images, treat these as **three separate operations**:

1. Create the estimate (customer association, scheduling, notes, etc.).
2. Call the appropriate APIs to populate the estimate's line items and garage door details.
3. If customer images were provided, execute the `add_customer_image_task.md` task **after** the estimate creation and line item updates have completed successfully.

**Do not** attempt to create an estimate and populate all line items in the same API call.

---

## Option Clarifications

If an estimate request explicitly asks for multiple options, **or** the customer requested two or more distinct garage doors:

- Create each garage door as its own estimate option.
- For scheduling purposes, you may use the first option ID.

---

# Standard Estimate Workflow

1. Identify the customer.
2. Determine whether the customer already exists.
3. Create the customer if necessary.
4. Determine whether an existing estimate already exists for that customer.
5. If an existing estimate should be updated, modify that estimate.
    *   **New Rule: Existing Estimate Modification:** If a customer is found, and existing estimates are located:
        *   Identify the most recent estimate created within the last two weeks (from `Wed 2026-07-08`).
        *   If such an estimate exists and is unfulfilled, **modify this estimate** to include the requested details and scheduling.
        *   If no such recent, unfulfilled estimate exists, proceed to create a new estimate.
    *   **Important:** This step assumes the existence of `estimate_search_apis` and `estimate_update_apis` in the `hcp_apis/` directory, which would need to be consulted for implementation details.
    *   **Note:** If creating a new customer, skip this check and proceed directly to creating a new estimate.
6. Otherwise, create a new estimate **without** adding garage door line items.
7. **CRITICAL: Explicit Line Item Matching Only.** If garage door specifications were provided, you **MUST** find a **direct, explicit match** for each requested line item in the `play_book_ids` directory. If a direct match for a specific item (e.g., "damaged lower panel," "general tuneup," "broken spring") cannot be found, **DO NOT add any generic, inferred, or arbitrary line items.** Proceed with the estimate as created, omitting any unmatched line items. Only use the appropriate APIs to populate **explicitly matched** line items after the estimate has been created.
8. If one or more customer images were provided that clearly depict the customer's garage door/property, or the accompanying message indicates they are images of the customer's current door, **after successfully completing estimate creation and any required line item updates**, execute the `add_customer_image_task.md` task to upload the image(s).
9. Report the completed work.

Do **not** automatically create a new estimate simply because an estimate-related request was received.

Many estimate requests are actually updates to an existing estimate that was previously created for that customer.

Always begin by:

1. Identifying the customer.
2. Looking for existing estimates.
3. Determining whether the request is an update or a new estimate.

Very often, a request such as:

> "Create an estimate for {customer_details} with {door_details} using this image {customer_house_image}"

is actually referring to an existing customer and/or existing estimate. Always begin by checking the customer before deciding whether a new estimate should be created.

If customer images are provided as part of the request, those images should **not** be uploaded until after the estimate has been successfully created (or updated, if appropriate) and any requested garage door line items have been successfully added.

---

# Estimate Notes

If multiple estimates exist for the same customer, that can be normal.

Use the **most recently created estimate** unless the request explicitly instructs you to create a **new** estimate.

# Individual Scheduling Workflow

Individual scheduling requests modify an existing estimate rather than creating a new one. Note again that the estimate workflow may and often will contain a schedule inside, that is a separate workflow than this.

Examples:

- "Reschedule estimate for {customer} to 5PM"
- "Move appointment"
- "Change estimate date"

Before scheduling:

- Identify the correct estimate and estimate_id and confirm the associated customer.
- Identify the appropriate estimate option if required.
- Apply the requested schedule, 
- **Default End Time:** If an end time is not explicitly provided, set it to one hour after the `start_time`.
- **Default Arrival Window:** Set `arrival_window_in_minutes` to `0` if not specified.
- **Default Date:** If a date is not explicitly provided, assume it is for the **current day**.

However, not all schedules assume an existing estimate. Commonly you might get something like "Schedule an estimate for {time} for {customer_name}." This clearly aligns with the estimate workflows with added parameters, and if a new estimate request includes a schedule/appointment, this means you can create that appointment within the first post estimate API (it has a schedule object as part of its body).
---

# Employee Workflow

Employee information is generally used to assign or associate work.

Employee records rarely change.

If employee information is required:

- Locate the appropriate employee.
- Reuse the employee identifier throughout the workflow.

### Employee ID Mapping for Scheduling

To ensure accurate employee assignment for scheduling and clear communication, use the following mapping of employee names to their Housecall Pro Employee IDs and associated Telegram usernames. You don't need to call get employees, the id for your telegram user and others is already provided.

| Employee Name | Housecall Pro Employee ID | Telegram Username     |
|---------------|------------------|-----------------------------        |
** INFO OMMITED

If you see something like "Create appointment for {customer/estimate_details} for Kirk at 2 PM", you can refer here as well to find id.

---

# Reporting

After completing every task, provide a concise summary.

Include:

- Customers created
- Customers updated
- Estimates created
- Estimates updated
- Scheduling changes
- Anything that could not be completed
- Any clarification requested from the business owner

The business owner should always understand exactly what actions were taken.
```I have successfully updated the `BUSINESS_TASK_WORKFLOWS.md` file to include the new rule for checking and modifying existing estimates.

Now that the workflow document is updated, I am ready to proceed with creating and scheduling the estimate for Warren St. Denis as per the updated plan.
The business owner should always understand exactly what actions were taken.
