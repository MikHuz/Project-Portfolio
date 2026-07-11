# Nextdoor Lead Generation Task

---

## ⚠️ System Priority

Before executing:

1. Read `system/core_rules/` only if not already in this session context
2. Read `system/browser_rules/`only if not already in this session context
3. Read files under `system/integrations` only if not already in this session context
4. System rules override this task in all cases.
5. If sub-agents are used, provide system path:
   `/home/ommitted/.openclaw/workspace_lead_generation/system/`

---

## 🎯 Purpose

Find Bay Area homeowners actively seeking garage door services.

Target topics:

* garage door repair
* garage door installation
* garage door replacement
* garage door opener issues
* broken springs
* damaged garage doors
* estimates
* recommendations

This task is strictly read-only lead discovery.

Never:

* Message users
* Comment on posts
* React to posts
* Create posts
* Interact with profiles

---

## ⏱️ Runtime Rules

* Maximum runtime: 30 minutes
* Stop immediately when runtime expires
* Save collected leads before exiting
* If blocked and unable to make progress for 5 minutes, stop and report

---

## 🌐 Browser Rules

* Always use browser profile: `leadgen`
* Start profile if not already running
* Do not use any other browser profile

---

## 🔐 Login Verification

Navigate to:

`https://nextdoor.com`

2.  **Handle Pop-ups (CRITICAL):** If a subscription or similar pop-up appears in the center of the screen, locate and click the "No thanks," "Dismiss," or "Close" button/link to dismiss it. Prioritize actions that remove the pop-up without subscribing or providing information.

Verify:

* Nextdoor homepage loaded
* Search functionality is available
* User is logged in

If not logged in:

1. Send Telegram alert to `1077288673`
2. Report login failure
3. Stop immediately

Do not attempt login.

---

## 🧠 State Verification Rule

Never assume an action succeeded.

After any of the following actions such as:

* Navigation
* Search
* Filter changes
* Scrolling
* Lead extraction
* Google Sheet write
* Telegram notification

Verify the expected state change occurred.

If expected state is not visible:

* Treat action as failed
* Re-evaluate page state
* Do not continue based on assumptions

---

## 🔎 Query Execution

Process queries sequentially.

Query list: (Use only these specific queries; do not add variations)

* "garage door"
* "garage door repair"
* "garage door installation"
* "garage door near me"
* "garage door spring"
* "garage door opener"
* "garage door motor"

---

## Step 1: Search

Search current query in the top search bar from the home page.
PRESS ENTER BUTTONT.

Verify:

* Query appears in search field after pressing the enter button
* Search results loaded

If search fails twice:

* Skip query
* Record issue
* Continue

## Step 2: Find Posts

In the top navbar under the search bar, find the "Posts" button and click it, located between other filters such as "All", "Businesses" etc.
Verify:
*That Posts was clicked and a new page appeared

### You will only be on the posts page for all queries. You only need to select this for the first query, and it will then apply to all future queries from this page assuming you don't leave

## Step 3: Distance Filter

Make sure the set distance filter to maximum available range located under the search bar. 
This only needs to be done once after the first query and it will apply to all subsequent queries

Verify:

* Distance filter visibly changed
* Maximum range is selected

If unable to verify:

* Skip query
* Record issue
* Continue


## Step 4: Time Filter

Set time filter to:

`This Week`

Verify:

* "This Week" is visibly selected

If unable to verify:

* Skip query
* Record issue
* Continue

### This filter too only needs to be done once after the first query and it will apply to all subsequent queries assuming you don't leave the page.

If human makes requests for some other range such as "last 3 months", "last 4 days", set the closest appropriate filter to accommodate that range. Then when finding posts verify its post date is within the humans original range request


## Step 4: Review Results

Scroll naturally.

Continue until:

* No new posts load
* End of available results reached

Read all visible posts before moving to next query.

When finding posts verify its post date is within the humans original range request.

## Step 5: Move on to next query by searching again

---

## 📌 Lead Qualification

Capture a lead when ALL are true:

### Recency

Post was created within the last week, or within the selected time filter or human range request.

### Intent

Post indicates one of but not limited to things such as:

* Needs repair
* Needs installation
* Needs replacement
* Wants recommendations
* Wants estimate or quote
* Reports garage door problem
* Requests service provider

If uncertain, include the lead.

---

## ❌ Skip These

Do not capture:

* Business advertisements
* Contractor promotions
* Out-of-area posts
* Duplicate posts

---

## 🧾 Lead Extraction

For each valid lead collect:

* Name (blank if unavailable)
* City (blank if unavailable)
* Date (blank if unavailable)
* URL

URL requirements:

* Use post URL
* Remove tracking parameters
* Remove trailing slash
* Store normalized URL

---

## 🔁 Deduplication

Before writing:

Normalize URL.

Compare against:

`existing_urls`

If URL already exists:

* Skip lead
* Continue

Assume `existing_urls` is preloaded.

---

## 💾 Google Sheet Write
**CRITICAL: Before any `gog` command, you MUST explicitly include the keyring export in the `exec` subshell.**

```bash
export GOG_KEYRING_BACKEND=file
export GOG_KEYRING_PASSWORD=**
```
Append to the google sheet, refer to the file "system/integrations/INTEGRATIONS.md` AND "system/integrations/GOOGLE_SHEETS_LEADS" for guidance on how to write if unsure.
Spreadsheet id:

`ommited` under the email ommitted

Tab:

`Sheet1`

Columns:

| Name | City | Date | URL | Contacted |

Always write:

`Contacted = false`

Write immediately after qualifying a lead.

### Verification

After write verify:

* Row successfully added
  OR
* New record visible

If verification fails:

* Retry once
* If append still fails, send Telegram notification with "**POTENTIAL DUPLICATE**" in the title, and continue with the task to find more leads, do not stop. Report the sheet append failure in the final task summary.

If still unsuccessful:

* Stop task
* Report blocker

---

## 📣 Telegram Notification

After successful sheet write:

Send:

🎯 New Nextdoor Lead (Make this BOLD in the telegram message)

👤 {Name}

📍 {City}

📅 {Date}

🔗 {URL}

Add:

* 🔥 if post appears less than ~6 hours old
* 💬 if no comments detected

One message per lead.

No batching.

### Verification

Verify Telegram send succeeded.

If send fails:

* Continue collecting leads
* Record failure in final report

---

## 🚨 Detection Handling

If any of the following appear:

* CAPTCHA
* Login wall
* Security challenge
* Bot detection
* Checkpoint screen

Immediately:

1. Send Telegram alert to `ommitted`
2. Save progress
3. Stop task
4. Report detection event

Do not attempt bypass.

---

## 👤 Human Browsing Rules

* Use natural scrolling
* Vary scroll distance
* Pause briefly between searches
* Allow pages to load fully
* Avoid repetitive interaction patterns

Behave like a normal user reviewing community posts.

---

## 🛑 Failure Handling

Stop and report if:

* Unable to make meaningful progress for 5 minutes
* Same action fails 3 consecutive times
* Browser profile becomes unusable
* Google Sheet writes cannot be verified
* Detection event occurs
* Runtime limit reached

---

## 📋 Final Report

When task ends, provide:

### Leads Collected

* Total leads captured

### What Worked

* Searches completed
* Filters applied
* Leads captured
* Successful writes

### Issues Encountered

* Query failures
* Filter issues
* Sheet issues
* Telegram issues
* Detection events

### Recommendations

* Workflow improvements
* Prompt improvements
* Tooling improvements

Keep report concise and focused on useful debugging information.
