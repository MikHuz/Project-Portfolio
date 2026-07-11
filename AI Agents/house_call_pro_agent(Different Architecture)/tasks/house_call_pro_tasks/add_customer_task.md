# Add Customer Task

## Purpose

Create a new customer in Housecall Pro.

This task may be triggered:

* Directly when a user requests a new customer to be created.
* By delegation from another Housecall Pro task.
* By any workflow that requires a customer record before proceeding.

---

## Browser Behavior

This task does **not** need to follow the browser behavior guidelines defined under `/system`.

Use all available automation capabilities to complete the task as efficiently as possible.

---

## Launch Housecall Pro

1. Connect to a Chromium browser session using `profile="hcp"` (port 18802, dedicated HCP login).
2. Navigate to:

https://pro.housecallpro.com/app/home

---

## Authentication Check

Assume Housecall Pro is already logged in.

If the account is not authenticated:

* Inform the user that Housecall Pro login is required.
* Do not attempt login, password recovery, MFA handling, or credential entry.
* Stop the task.

---

## Step 1 — Check If Customer Already Exists

Before creating anything, verify the customer doesn't already exist.

1. Navigate to **Customers** (top nav or `https://pro.housecallpro.com/app/customers`).
2. Use the search/filter to check for matches:

   **If a phone number is provided:**
   - Search by phone number first — this is the most reliable match signal.
   - If a result appears, click into it and verify: does the name sound like the one in the request? Does the address match or seem plausible for the same person?
   - If yes → **customer already exists. Do not create a duplicate.** Use this record and report back.

   **If no phone, or phone search returns nothing:**
   - Search by name, but **always filter by Created Date = last 30 days** before searching. A generic first name like "Mike" or "John" can return hundreds of results across all time — the date filter keeps results manageable and relevant.
   - Use last name if available — more specific than first name alone.
   - If a match appears, cross-check: city, address, or any other detail that confirms it's the same person.
   - If confident it's a match → use the existing record. Do not create a duplicate.
   - If the 30-day search returns nothing, try widening to 90 days before concluding no match exists.

   **If editing an existing customer:**
   - Once on the customer's profile page (after clicking from search results), locate the "Profile" tab in the main content area (it's usually active by default).
   - In the left sidebar of the profile, find the "Contact Info" section.
   - Click the **pencil icon** (edit button) next to the "Contact Info" heading to open the editable fields.
   - Proceed to update the necessary fields (First Name, Last Name, Address, etc.).
   - Remember to click **Save Customer** after making changes.

   **If no match found by either method:**
   - Proceed to create a new customer below.

---

## Step 2 — Create Customer

Once you've confirmed no existing record matches:

1. Locate the **New** button in the top-right corner.
2. Click **New**.
3. Select **Customer**.

Wait for the customer creation form to appear.

---

## Populate Customer Information

Fill all available customer information provided by the triggering task or user.

Fields may include:

* First Name
* Last Name
* Phone Number
* Address
* City
* State
* ZIP Code

Populate all supplied values exactly as provided, with the following exception:

> ⚠️ **HCP Phone Field Quirk — Leading `1` is always stripped**
> HCP's phone input unconditionally treats a leading `1` as a country code and strips it, leaving 9 digits which then fails validation.
> - If the number has 11 digits starting with `1` (e.g. `1-916-555-0001`) → strip the leading `1` and enter the 10-digit number
> - If the number has 10 digits but starts with `1` (e.g. `123-456-7890`) → HCP will still strip the `1`, making it 9 digits and invalid. Enter digits only, no dashes. If it still fails, note it and skip the phone field — do not block customer creation over it.
> - Numbers starting with any other digit → enter normally, no modification needed

---

## Save Customer

After all available customer information has been entered:

1. Review the form for completeness.
2. Click **Save**.
3. Wait for Housecall Pro to finish creating the customer.

The page will take you to the management of the new customer. **Stay on this page** — do not navigate away.

If this task was called from the new estimate workflow, your next step is to create the estimate directly from this customer page (look for a "+ Estimate" or "New Estimate" button on the customer record). Do not go back to the top nav New → Estimate flow.

---

## Completion Criteria

The task is complete when:

* The customer record has been successfully created.
* The customer page loads successfully after save.

If customer creation fails:

* Report the error encountered.
* Do not repeatedly retry the same action.
* Stop and await further instructions.
