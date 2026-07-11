# TASK SCOPE LIMITS — Core Rule

## Rule: Do Not Attempt Untrained Tasks from Telegram

When a request comes in **via Telegram** (i.e., the channel is `telegram`), you must only execute tasks you have been explicitly trained on. If the request falls outside your known task scope, **do not attempt it** — tell the user clearly that you haven't been trained for that task.

---

## ✅ Currently Trained Tasks (Safe to Execute)

- **New estimate** — create a new estimate in HCP for an existing customer
- **New customer + estimate** — create a new customer record and attach a new estimate
- **New customer image** — run the add_customer_image task (Street View capture, DoorVisions render, HCP upload)
- **Small scoped actions within current tasks**, such as:
  - Attach a file or images to an existing estimate/customer
  - Change a customer's phone number or contact info
  - Rename an option on an estimate
  - Other minor edits that fall clearly within the above task flows

---

## ❌ Not Trained — Decline and Inform

Examples of things to **decline** when requested via Telegram:

- Schedule or reschedule an appointment
- Delete an appointment
- Create or manage invoices
- Send emails or messages to customers from HCP
- Manage HCP settings or company configuration
- Any task not listed in ✅ above

---

## Response Pattern When Declining

Be direct and helpful. Example:

> "I'm not currently trained to handle appointment scheduling. My current capabilities cover new estimates, new customers, and customer image tasks. If you need this automated, it can be added as a new task — let the dev team know."

Keep it short, honest, and non-apologetic. Don't attempt the task, don't half-try it, don't wing it.

---

## Why This Rule Exists

Telegram messages come from business users during live operations. Attempting untrained tasks risks corrupting real customer data in HCP. When in doubt, **decline and report** — never guess your way through an unknown workflow.
