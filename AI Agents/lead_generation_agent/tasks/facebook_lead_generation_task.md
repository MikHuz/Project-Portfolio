# Facebook Lead Generation Task

---

## ⚠️ System Priority

Before executing:

1. Read `system/core_rules/` only if not already in this session context
2. Read `system/browser_rules/`only if not already in this session context
3. Read files under `system/integrations` only if not already in this session context
3. System rules override this task in all cases.
4. If sub-agents are used, provide system path:
   `/home/ommitted/.openclaw/workspace_lead_generation/system/`

---

## 🎯 Purpose

Find homeowners seeking garage door services within Facebook groups.

Target topics:

* garage door repair
* garage door installation
* garage door replacement
* garage door opener issues
* broken springs
* damaged garage doors
* garage door estimates
* garage door recommendations

This task is strictly read-only lead discovery.

Never:

* Message users
* Comment on posts
* React to posts
* Create posts
* Friend users
* Interact with profiles
* Join groups

---

## ⏱️ Runtime Rules

* Maximum runtime: 30 minutes
* Stop immediately when runtime expires
* Save collected leads before exiting
* If unable to make meaningful progress for 5 minutes, stop and report

---

## 🌐 Browser Rules

* Always use browser profile: `leadgen`
* Start profile if not already running
* Do not use any other browser profile

---

## 🧠 State Verification Rule

Never assume an action succeeded.

After:

* Navigation
* Group selection
* Search execution
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

## 🔐 Login Verification

Navigate:

`https://www.facebook.com/groups/feed/`

Verify:

* Facebook loaded successfully
* Groups feed is visible
* User is logged in

If not logged in:

1. Send Telegram alert to `1077288673`
2. Report login failure
3. Stop immediately

Do not attempt login.

---

## 👥 Load Joined Groups

Navigate:

`https://www.facebook.com/groups/joins/?nav_source=tab&ordering=viewer_added`

Verify:

* Joined groups page loaded
* Group list visible

There will be a page in the center that contains all the groups, under a "All groups you've joined" message.
You will parse each group sequentially from here.
Extract all available joined groups dynamically.

Do not hardcode group names.

If group list cannot be loaded:

* Retry once
* If still unsuccessful, stop and report

---

## 🔁 Group Processing Loop

## 🔎 Query Strategy

Use only these specific queries (do not add variations):

* "garage door"
* "garage door repair"
* "garage door installation"
* "garage door near me"
* "garage door spring"
* "garage door opener"
* "garage door motor"

---

Process groups sequentially.

For each group:

### Step 1: Open Group

Navigate into group.

Verify:

* Group page loaded
* Group name visible
* Search functionality available

If verification fails:

* Skip group
* Record issue
* Continue


### Step 2: Search

Enter query in the search icon located in the right. It will open a modal with a placeholder text to search this group. Pres Enter to search the query.

Verify:

* Pressed Enter and a new page loaded for the query
* Search results loaded

If search fails twice:
* Skip query
* Record issue
* Continue

### Step 3: Apply Filters via URL

Always apply filters by directly navigating to a constructed URL.

The base URL for search within a group is:
`https://www.facebook.com/groups/{group_id}/search?q={search_query}`

To add "Recent posts" and filter by the current year (2026), append the following to the URL:
`&filters=eyJyZWNlbnRfcG9zdHM6MCI6IntcIm5hbWVcIjpcInJlY2VudF9wb3N0c1wiLFwiYXJnc1wiOlwiXCJ9IiwicnBfY3JlYXRpb25fdGltZTowIjoie1wibmFtZVwiOlwiY3JlYXRpb25fdGltZVwiLFwiYXJnc2wiOlwie1xcXCJzdGFydF95ZWFyXFxcIjpcXFwiMjAyNlxcXCIsXFxcInN0YXJ0X21vbnRoXFxcIjpcXFwiMjAyNi0xXFxcIixcXFwiZW5kX3llYXJcXFwiOlxcXCIyMDI2XFxcIixcXFwiZW5kX21vbnRoXFxcIjpcXFwiMjAyNi0xMlxcXCIsXFxcInN0YXJ0X2RheVxcXCI6XFxcIjIwMjYtMS0xXFxcIixcXFwiZW5kX2RheVxcXCI6XFxcIjIwMjYtMTItMzFcXFwifVwifSJ9`

Construct the full URL for each query and navigate to it directly.

### Step 4: Review Filtered Results

Scroll naturally.

Continue until:

* No new posts load
* End of visible results reached

Pause naturally between scroll actions.

Read all visible posts before moving to next query.

---

## 📌 Lead Qualification

Capture a lead when ALL conditions are true:

### Recency

Post created within the last 30 days.

### Intent

Post contains one or more of:

* Requesting repair help
* Requesting installation help
* Requesting recommendations
* Requesting estimates
* Requesting pricing
* Reporting garage door problems
* Looking for service providers
* General interest in garage door related things

If uncertain, include the lead.

---

## ❌ Skip These

Do not capture:

* Business advertisements
* Contractor promotions
* Spam
* Irrelevant discussions
* Old posts (Under 30 days)
* Out-of-area posts
* Duplicate posts

---

## 🧾 Lead Extraction

For each valid lead collect:

* Name (or N/A)
* City (or N/A)
* Date (or N/A)
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

If duplicate:

* Skip lead
* Continue

Assume `existing_urls` is already loaded.

---

## 💾 Google Sheet Write

Append to the google sheet, refer to the file "system/integrations/INTEGRATIONS.md`
for guidance on how to write if unsure.
Spreadsheet id:

Spreadsheet:

`1CMu4TzraGbkUCU0P0Fixtmg6TQpBp7DdmM6ZufFaVxA` for the email "michaelhuziy@gmail.com"

Columns:

| Name | City | Date | URL | Contacted? |

Always set:

`Contacted? = FALSE`

Write immediately after qualifying a lead.

### Verification

After write verify:

* Row successfully added
  OR
* Newly appended record visible

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

🎯 New Facebook Lead

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
* Checkpoint
* Login wall
* Security challenge
* Bot detection

Immediately:

1. Send Telegram alert to `1077288673`
2. Save progress
3. Stop task
4. Report detection event

Do not attempt bypass.

---

## 👤 Human Browsing Rules
Always follow the rules under system/browser_rules, this is for the purposes of human mimicry

As a reminder:
* Use natural scrolling
* Vary scroll distance
* Pause between searches
* Pause between groups
* Allow pages to load fully
* Avoid repetitive interaction patterns

Behave like a normal user reviewing group content. ABSOLUTELY DO NOT DO BOT LIKE BEHAVIORS IN FACEBOOK

Facebook detects behavioral signals even more than technical ones.

---


---

*Last updated: 2026-06-08*
*Applies to: LinkedIn,Facebook, Indeed, Glassdoor, and any site with aggressive active bot detection*
*For things sites like wikipedia which permit bot crawling, these rules can be a lot more relaxed*
