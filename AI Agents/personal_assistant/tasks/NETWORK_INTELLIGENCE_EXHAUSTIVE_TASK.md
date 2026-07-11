# NETWORK_INTELLIGENCE_EXHAUSTIVE_TASK.md
# Exhaustive Connection Extraction — Raman Huziy

## Purpose
Extract structured data on every connection of a target LinkedIn profile.
No curation, no filtering — exhaustive. Categorize each person by work history.

---

## Input
- **Target connections page:** provided at task start
- **Batch size & start index:** provided at task start

---

## Browser Setup (Do this first)
1. Run `openclaw browser status` — if not running, `openclaw browser start`
2. Confirm CDP at `http://127.0.0.1:18800` via mcporter chrome-devtools
3. Browser is already logged in to LinkedIn — do NOT log in fresh
4. **Read the progress tracker before anything else:**
   `/home/mikhuz/.openclaw/workspace/dynamic_output/network_intelligence/raman_huziy_master_progress.md`
   - Check "Last processed" and the full processed log to know exactly who has been done
   - Your start profile = the next number after the last processed entry
   - Never re-process anyone already in the log
5. Navigate to the connections page URL provided

---

## Per-Person Extraction Process

For each person, follow these steps **exactly**:

### Step 1 — Click into the profile
- From the search results list, click the person's name/card to open their profile
- Wait for the page to load — take a snapshot and check if the person's name and headline are visible before proceeding
- If the page looks empty or still loading, wait 1–2 seconds and take another snapshot before doing anything else

### Step 2 — Extract from the profile header
From the top of the profile (always visible), grab:
- **Full name**
- **Current job title** (shown under their name)
- **Current company name** — **IMPORTANT:** LinkedIn shows the current company in TWO places in the header:
  1. Directly under the job title as a clickable company link
  2. In the "metadata strip" below the location — often shows current company icon + name alongside education institution
  **Check BOTH.** The metadata strip company link is the most reliable source for the current employer and its `/company/slug` URL. Do not skip this even if you found a company name from the title line.
- **LinkedIn profile URL** — get the canonical `/in/username` from the current page URL
- **Hiring signals** — scan the headline and the About section (if visible) for phrases like "we're hiring", "building a team", "open to referrals", "DM me", etc.

### Step 3 — Scroll to and read the Experience section
**This step is critical. Do not skip it.**

- After loading the profile, **scroll down slowly** (400–600px at a time) until you see the "Experience" section header
- Once you see it, **wait 1–2 seconds** for the entries to render — do NOT snapshot immediately after scrolling
- Take a snapshot and verify experience entries are actually visible (you should see company names, job titles, date ranges)
- If entries aren't visible yet, scroll a little more and wait again
- **Always read the FIRST (most recent) experience entry carefully** — verify that the company name matches what you captured from the header. If they differ, use the Experience section's most recent entry as the authoritative current company.
- Read through ALL experience entries — scroll further if there are more entries below the fold
- Also check the Education section if visible — some Pearson/GE connections may appear there

### Step 4 — Categorize
Based on everything you read in Experience (and Education):
- Any entry mentioning **"Pearson"** (the education company) → **PEARSON**
- Any entry mentioning **"Global English"** or **"Learnship"** (same company, rebranded) → **GLOBAL_ENGLISH**
- Neither → **GENERAL**

**Categorize by full history, not just current role.** Someone now at Adobe who previously worked at Pearson = PEARSON.

### Step 5 — Go back and continue
- Navigate back to the connections search results page (use browser back or re-navigate to the search URL)
- Wait for the list to reload, then proceed to the next person

---

## Pacing & Human Mimicry
- **0.5–1.5 seconds** between actions (randomize — never exactly the same interval)
- Always scroll before clicking — don't pixel-perfect click immediately after a page loads
- Vary your behavior: sometimes scroll past an element and come back, don't always click the first thing you see
- **Never take a snapshot immediately after navigation** — always give the page a moment to render first
- If CAPTCHA or any security challenge appears: take a screenshot, write "CAPTCHA ENCOUNTERED at profile #N" to the progress file, and stop immediately
- If LinkedIn shows a commercial use limit warning: stop, write to progress file, exit

## Timeout Safety
- If any mcporter call hangs for 30+ seconds with no response: skip that profile, note "TIMEOUT - skipped" in progress file, move on
- Do NOT retry a hung call more than once
- Always keep moving forward

---

## Output Files

Write after EACH person — do not batch. Append only, never overwrite the output files.

### GENERAL → `/home/mikhuz/.openclaw/workspace/dynamic_output/network_intelligence/raman_huziy_500.md`
### PEARSON → `/home/mikhuz/.openclaw/workspace/dynamic_output/network_intelligence/raman_huziy_pearson.md`
### GLOBAL ENGLISH → `/home/mikhuz/.openclaw/workspace/dynamic_output/network_intelligence/raman_huziy_global_english.md`

**Entry format (same for all three files):**
```
## [Full Name]
- **Title:** [current job title]
- **Company:** [Company Name](https://www.linkedin.com/company/slug) — use N/A if company URL not found
- **LinkedIn:** https://www.linkedin.com/in/username
- **Hiring signals:** [any signals found, or None]
- **Batch:** [batch number and range, e.g. "Batch 1 (profiles 1–100)"]
```

For PEARSON and GLOBAL_ENGLISH entries, also add:
```
- **Relevant role:** [job title at Pearson/Global English/Learnship] ([dates if visible])
```

---

## Progress Tracker

**Overwrite this file after every single person:**
`/home/mikhuz/.openclaw/workspace/dynamic_output/network_intelligence/raman_huziy_master_progress.md`

Format:
```
# Master Progress Tracker

## Current Status
- Batch: [N]
- Range: [start–end]
- Processed: [X]/[total for this batch]
- Last processed: [Name] (#[index])
- Status: IN PROGRESS / COMPLETE / STOPPED ([reason])

## Counts (this batch)
- GENERAL: [N]
- PEARSON: [N]
- GLOBAL_ENGLISH: [N]

## Processed Log (do not re-process these)
[index]. [Name] → [CATEGORY]
...
```

---

## When Batch is Complete
1. Update progress tracker: set Status to COMPLETE, fill in final counts
2. Note where next batch should start (e.g. "Next batch: profiles 101–200")
3. Exit cleanly

---

## Safety
- Research only. Never send messages, connection requests, likes, or comments.
- If you are unsure whether an action could trigger LinkedIn detection, don't do it.
