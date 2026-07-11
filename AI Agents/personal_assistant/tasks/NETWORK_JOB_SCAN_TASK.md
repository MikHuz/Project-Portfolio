# Network Job Scan Task

## Purpose

Given a list of people in Michael's network (name, current role, company, LinkedIn), visit each person's company careers page, scan for relevant software engineering roles, and output only those companies that have matching openings.

This is a **network-assisted job discovery** task — not a contact research task. Do not draft outreach messages here. Output is a clean list of leads for Michael to act on.

---

## When to Run

When Michael provides a list of contacts (likely a Google Sheet URL) and asks to scan their companies for open roles.

---

## Input Format

Michael will provide a list like:

```
Name | Company | Current Role | LinkedIn
John Doe | Stripe | Software Engineer | linkedin.com/in/johndoe
Jane Smith | Notion | Engineering Manager | linkedin.com/in/janesmith
...
```

Or in any similar format (CSV, markdown table, plain text).

Michael may give you additional context and instructions to follow or tune from this base file.
If you cannot find their linkedin from a column, make sure to check the name column cause its probably linked!

### ⚠️ Reading LinkedIn URLs from the Source Sheet

The Name column in Michael's Google Sheet stores LinkedIn URLs as `=HYPERLINK(...)` formulas.
The default `gog sheets get` renders plain text and **strips the URL entirely**.

**Always fetch the source sheet with `--render FORMULA`** to extract the actual LinkedIn URLs:

```bash
gog sheets get <sheetId> "Sheet1!A:F" --render FORMULA --json --account michaelhuziy@gmail.com
```

Then parse the HYPERLINK formula: `=HYPERLINK("https://linkedin.com/in/...", "Name")` → extract the URL from the first argument.

---

## Workflow

### Step 1 — Parse the Contact List

Not all contacts need to be parsed.

Extract from Michael's input:

* Full Name
* Company name
* Their current role
* LinkedIn URL

⚠️ **Ignore any contacts whose current role/location is based outside of the United States. Use their linkedin profile to figure this out if necessarily.**

* If location is unclear, attempt to infer from LinkedIn or company profile
* If still unclear, then include them (do not over-filter)

Build a working list. You will process each person one by one.

---

### If the company is "N/A" or missing:

1. Open their LinkedIn using the headed browser (Walter White account) and check their current role.
2. If still not found:

   * Stop processing this person
   * Append them to the markdown output with a note: *"Company not found"*

---

### Step 2 — Find the Careers Page for Each Company

For each company, find the careers/jobs page. Try in this order:

1. Web search:
   `{company name} software engineer jobs site:greenhouse.io OR site:lever.co OR site:ashbyhq.com OR site:jobs.{company}.com`

2. Direct:

   * `{company}.com/careers`
   * `{company}.com/jobs`

3. Navigate manually via homepage if needed

Use `web_fetch` or `web_search` for public pages.
**Do NOT use the headed browser unless login is required.**

---

### Step 3 — Scan for Relevant Roles

Look for:

* Software Engineer / Software Developer
* Associate / Junior Software Engineer
* Backend Engineer
* Full Stack Engineer
* Frontend Engineer
* Platform Engineer
* Site Reliability Engineer (SRE)
* Systems Engineer
* ML / AI Engineer
* New Grad / Entry-level roles
* Engineering internships
* Any SE role requiring **0–4 years of experience**

Skip:

* Roles explicitly requiring 5+ years of experience
* Roles with titles like Senior, Staff, Principal, Lead, Architect, Director (unless the posting itself says 0–4 yrs is acceptable)
* Roles outside the U.S.

**Experience guideline:** Many "junior" or "associate" roles today require up to 2 years. Include any role where the experience requirement is 4 years or under. When in doubt, include it.

**Relevance threshold:**
If ANY role plausibly fits Michael → include the company.

---

### Step 4 — Build the Output

For each relevant role found:

* Include one row per role
* Skip companies with zero matches

---

### Step 5 — Write Output File

File path:

```
/home/mikhuz/.openclaw/workspace/dynamic_output/network-job-scan/MM-DD.md
```

Create directory if needed.

### Output Format

The markdown file contains **four separate sections**, all in the same file:

---

```markdown
# Network Job Scan — YYYY-MM-DD

## 1. California Contacts — Roles Found
Contacts currently located in California for whom at least one role was found.

| Name (LinkedIn) | Company | Their Role | Relevant Job |
|-----------------|---------|------------|--------------|
| [John Doe](https://linkedin.com/in/johndoe) | Stripe | Software Engineer | [Software Engineer, New Grad](https://stripe.com/jobs/123) |

---

## 2. Non-California US Contacts — Roles Found
Contacts currently located elsewhere in the US for whom at least one role was found.

| Name (LinkedIn) | Company | Their Role | Relevant Job |
|-----------------|---------|------------|--------------|
| [Jane Smith](https://linkedin.com/in/janesmith) | Notion | Engineering Manager | [Backend Engineer](https://notion.so/careers/456) |

---

## 3. No Role Found (US Contacts)
Contacts in the US (California or otherwise) for whom no role could be returned. Include the reason.

| Name (LinkedIn) | Company | Their Role | Reason |
|-----------------|---------|------------|--------|
| [Alex Lee](https://linkedin.com/in/alexlee) | Acme Corp | CTO | Career page not found |
| [Sam Park](https://linkedin.com/in/sampark) | Widgets Inc | VP Eng | No open roles found |

Possible reasons: "Company not found", "Career page not found / blocked", "No open roles found", "Roles found but all senior-only"

---

## 4. Non-US Contacts — Not Researched
Contacts whose current location is outside the United States. Not researched.

| Name | Company | Their Role |
|------|---------|------------|
| Vladimír Brož | Animal Engineering | Account Executive |
```

---

### Section Assignment Rules
- **Location = contact's current location only** — not company HQ, not the job location you found
- Use LinkedIn profile to determine location if not obvious from role title
- If location is still unclear after checking → put in Section 2 (Non-California US), do not over-filter
- A contact goes in Section 1 or 2 only if at least one role was found at their company
- A contact goes in Section 3 if they are US-based but no role was surfaced for any reason
- A contact goes in Section 4 if they are clearly outside the US

### Readability Rule — Blank Line Between Entries
In the markdown file, insert a blank line between each person's row(s) in every section table for easier reading. For contacts with multiple roles, group all their rows together then add the blank line after the last one before the next person starts.

---

### Step 6 — Append to Google Sheet

Sheet:

```
https://docs.google.com/spreadsheets/d/128ardAKV_-JHGaL4B63qGCBqtG5HJJuTTs36D80MUPs/edit?gid=0#gid=0
```

**Only append contacts from Sections 1 and 2** (California + Non-California US contacts where a role was found). Do NOT append Section 3 (no role found) or Section 4 (non-US).

**Columns — exactly 4, in this order:**

| A | B | C | D |
|---|---|---|---|
| Name (linked to LinkedIn) | Current Company | Current Role | Job Found (linked to posting) |

Command:

```bash
gog sheets append 128ardAKV_-JHGaL4B63qGCBqtG5HJJuTTs36D80MUPs "Sheet1!A:D" \
  --account michaelhuziy@gmail.com \
  --input USER_ENTERED \
  --values-json '[
    ["=HYPERLINK(\"https://linkedin.com/in/johndoe\",\"John Doe\")", "Stripe", "Software Engineer", "=HYPERLINK(\"https://stripe.com/jobs/123\",\"Software Engineer, New Grad\")"],
    ...
  ]'
```

### ⚠️ Hyperlink Formatting Rules
- **Always use `--input USER_ENTERED`** so Sheets evaluates `=HYPERLINK()` formulas
- Column A (Name): `=HYPERLINK("linkedin_url_from_source_sheet", "Full Name")` — extract URL from source sheet using `--render FORMULA`
- Column D (Job): `=HYPERLINK("job_posting_url", "Job Title")` — **must link to a specific job posting page, not a generic careers homepage**
- Escape inner double quotes with `\"` inside the JSON string
- If LinkedIn URL is not available for a contact, use plain text for their name
- There is NO separate LinkedIn column — the link is embedded in the name cell only
- One row per job found (if a contact's company has 3 open roles, append 3 rows, all with the same name/company/role in A–C)
- **If you cannot find a direct URL for a specific job posting, do not include that role** — skip it rather than linking to a generic careers page

---

## Hard Constraints

* Use `web_fetch` / `web_search` only (no browser unless required)
* Do not fabricate job listings
* Skip clearly senior-only roles
* No outreach drafting
* Output only to markdown + Google Sheets

---

## Output Notes

* If careers page is blocked/unavailable → log under `## Notes`
* One row per role (not per person)
* Prefer direct job posting links

---

## Example Sheet Row

| =HYPERLINK("https://linkedin.com/in/sarahlee","Sarah Lee") | Anthropic | Software Engineer | =HYPERLINK("https://anthropic.com/careers/swe-new-grad","Software Engineer, New Grad") |

