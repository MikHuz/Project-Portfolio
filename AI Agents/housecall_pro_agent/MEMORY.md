# MEMORY.md — Long-Term Memory (HCP Agent)

_Curated knowledge that persists across sessions. Last updated: 2026-06-22_

---

## Who I Am

- **Name**: HCP Agent 📋
- **Role**: Dedicated House Call Pro automation agent
- **Domain**: HCP platform workflows, Playwright automation, DoorVisions integration, customer image tasks


## About Doorgi Garage Doors

Ommitted

## Employees

### Scheduling Interpretation
Remember the employees we have right now :
**Information was ommitted** 
Whenever an employee name appears alongside a date, time, appointment, schedule, estimate, or job, that person is the **assigned employee**, never the customer.

For example:

- "Create an estimate for  at 2PM for {customer/estimate_details}..."
  → Create an estimate for the customer and schedule a 2PM Housecall Pro appointment assigned to .

- "Create an estimate for me at 5PM."
  → Create the estimate immediately and schedule a 5PM Housecall Pro appointment assigned to the requesting employee.

Never interpret these requests as creating cron jobs, delayed executions, reminders, heartbeat tasks, or future automation. The request should be executed immediately(provided the full task context is satisfied absed on the rules) using the Housecall Pro APIs, with the specified date/time becoming the scheduled appointment time.

---

# Technical Browser Navigation
Use document new headed browser navigation patterns under here to speed up navigation for tasks. This is not relevant for interacting with HCP via the provided api's




## HCP Platform Knowledge
## This knowledge is only relevant when doing headed browser automation

### API Interaction Directive: Absolute Source of Truth
For all Housecall Pro API interactions, the API documentation within the `hcp_apis/` directory is the **absolute source of truth** for request body structures (JSON, form data, etc.), query parameters, and examples. You **must not** infer, assume, or suggest any structure that is not explicitly detailed or demonstrated in the corresponding markdown file for a given API. Any "bash" or "json" examples provided in these documents are sourced directly from actual Housecall Pro documentation and are to be followed precisely.

If there is any uncertainty regarding the exact structure of a request body, parameter, or command, you **must immediately consult the specific API's markdown file** within `hcp_apis/` and adhere to its instructions. Do not rely on general patterns or prior assumptions if a specific API's documentation is available. This directive applies to all API calls, including customer creation, estimate creation, and any other API interaction.

---

### **New Rule: HCP Search - Always Press Enter**
- When inputting text into search fields in House Call Pro, the system DOES NOT auto-search.
- **Always explicitly press 'Enter' or click a search button after typing into a search field to trigger the search.**


### add_customer_image_task — Key Learnings

#### DoorVisions Interaction
- Must resize browser to 1920px wide — right panel is off-viewport at 1200px
- `clickCoords` is the only reliable click method — `.click()` via evaluate doesn't fire React events off-viewport
- Color woodtone tabs: find via `document.querySelectorAll('a')` filtering x > 800, then `clickCoords`
- Color panel needs `scrollTop += 400` on `.tab-pane.active` to reveal woodtone/powder coat tabs
- File upload: same pattern as HCP — Playwright `setInputFiles({ force: true })` + dispatch `change` event

#### Street View Image Capture
- Address label on Street View panel may say neighbor's address — ignore it, trust the Google Maps link
- Assess default angle first — try 1–2 adjustments to face garage door directly, then capture
- Invalid only if garage is completely absent/unidentifiable

---

## DoorVisions Product Naming — Common Confusion

- **"Overlay Carriage Steel"** = TWO parts: **product** (Overlay Carriage House, under Carriage tab) + **design/material** (Steel Overlay within that product)
- Do NOT interpret "Steel" as a separate product category — it describes the overlay material on the Carriage House door
- Carriage tab on DoorVisions has: Shoreline, Overlay Carriage House — the latter is correct for this spec
- Never pick Planks/Raised Panel/Stamped for a carriage spec — those are completely different product lines

---

