# Job Contact Research — Instructions
IMPORTANT: THIS IS NOT THE SAME TASK AS THE JOB SEARCH TASK. This is a separate task that only runs when Michael explicitly gives you a job application link and asks you to find contacts for that specific job. Do NOT run this task unless explicitly triggered with a job application link.

# Purpose/Goal
Find people to contact based on a job application link provided by Michael. Ideally these people are directly or indirectly involved in the hiring process for the role. This is a research task only — you will not be sending any messages or connection requests, just finding contacts and drafting potential outreach messages for Michael to use. The ultimate purpose of this is to primarily send follow up/inquiry messages to ask about my job application, for the purpose of trying to gain visibility or notice.

# When to run
When Michael provides a job application link, and specifically asks you to find contacts for this job, execute this following workflow and output results to a new markdown file in the directory `workspace/dynamic_output/job_contacts/`.
Read the Browser_automation markdown file under /system if confused on browser itneraction

## ⏱️ Hard Constraints
- **Maximum contacts to return: 7** — stop researching profiles once you have 7 solid contacts. Quality over quantity.
- **Time limit: 12 minutes** — once the task begins, wrap up and write the output file within 12 minutes. If you haven't finished all passes, compile what you have and close out. Do not overrun this limit.

---


## Workflow

# Step 1 — Parse the Job Link
- Extract: **job title**, **company name**, **team/department** (if visible), **location**, **job description**
- Note whether it's a LinkedIn posting or an external company site


# LinkedIn Sourcing Playbook (High-Relevance Version)

# Step 2 — LinkedIn Search (Primary)

Use a headed browser with the logged-in walter white LinkedIn account. Find the company page for that role. 

---

## 🔹 Phase 0 — Extract Signal from the Job Post IF NOT done already(IMPORTANT)

Before searching, identify:

* **Location** (city / region / remote)
* **Primary role** (e.g., Backend Engineer, SRE)
* **Team clues** (platform, infrastructure, data, etc.)
* **Keywords** (e.g., distributed systems, Kubernetes, cloud, APIs)

👉 These will be reused for relevant contacts

---

## 🔹 Phase 1 — Start form the Company Linkedin Page

1. Find company hiring in linkedin 
2. Find job post in linkedin(might be given to you from start)
2. Identify the **job poster** (if visible) → save them (high priority)
3. Navigate to the company page , go to the **People tab** for filtering

---

## 🔹 Phase 2 — Apply Core Filters (Maximize Relevance)

### 1. Location Filter (MANDATORY — STRICT)

> ⚠️ **This is the most important filter. Do not skip or relax it without good reason.**

* Always set the **LinkedIn location filter to the exact city or metro region of the job posting** before running any People tab search
* Examples: job in San Francisco → filter "San Francisco Bay Area"; job in NYC → filter "New York City Metropolitan Area"; job in Austin → filter "Austin, Texas"
* **If the job is remote**: still filter to the company's HQ city/region — that's where the team most likely sits
* **Never return people from a different state/country or distant region**of the job post/company HQ — an NYC job should not surface London-based employees
* If the location filter returns fewer than 3 results, broaden one step (city → metro region → state) — but document this in Search Notes
* **Discard any contact who is clearly in a different region** even if they have a relevant title

👉 Contacts in the wrong geography are nearly useless for hiring inquiries — local team members are the target

---

### This phase only takes place in the company people tab
Search/filter by keywords, note down any relevant people names that are visible. Ignore "Linkedin Member". The people tab has a view more on the bottom, exhaust this list.

#### Pass A — Senior ICs (Influence Hiring)

Search:

* Senior Software Engineer
* Staff Engineer
* Principal Engineer

---

#### Pass B — Hiring Managers (Highest Leverage)

Search:

* Engineering Manager
* Software Engineering Manager
* Backend Engineering Manager
* Platform Engineering Manager

🚫 Avoid vague terms like:

* "Technical"
* "Technical Lead"

---
#### Pass C — Target Peers for that role(Highest Response Rate)

Examples:

* Backend Engineer
* Software Engineer
* Site Reliability Engineer
* Platform Engineer


#### Pass D — Recruiters 

Search:

* Technical Recruiter
* Engineering Recruiter
* Talent Partner

#### Compile and/or expand search
If many relevant people were found from the people tab, great. If not, considering expanding those keyword in the global linkedin search, by typing in [company name] [keyword/job title] and fitler by location again
---

## Phase 3: Create connection map and build relevance

### Open profiles you found and parse them

### Goal: Build even more relevance and create connections
 Read their descriptions and consider if they might be related to the job post(ex. Person works in the infrastrcutre team, great match if job post applying for the infrastrcutre team).  Build a connections map, look at the persons posts or if they commented on someone else in the company. Consider the people linkedin recommends for each profile on the right, that are usually related/connected to that perosn and which are often hidden from normal search


---

## 🔹 Phase 4 — Expand Beyond LinkedIn site (If Needed)

If results are limited or profiles are hidden:

Use Google search from your non browser controlled web fetch/api:

```
site:linkedin.com/in "Company Name" "Backend Engineer" "Location"
```
This might be more limited if linkedin didn't help

👉 Helps uncover:

* Hidden profiles
* Additional team members

---

---

This process maximizes relevance and ensures you are reaching people directly connected to the role and hiring decision.


# Step 3 — Company Website Search (Secondary, after linkedin)
After linkedin search, consider company website, especially if the company is small or you had bad returns
1. Visit the company website
2. Check `/team`, `/about`, `/people`, or `/leadership` pages
3. Note any engineers, managers, or recruiters listed, including their emails if possible



---
# Step 4 — Contact Prioritization

## 🧠 Definition of a High-Quality Target

A strong contact matches:

* ✅ Same **location**
* ✅ Same **role family** (backend / SRE / platform)
* ✅ Matching **job description keywords**
* ✅ Likely same **team/org**
* ✅ Connected to other possible people you recommend

Rank contacts in this order:
1. **Actual job poster**
2. **Hiring Manager** — eng manager or director over the relevant team
3. **Recruiter / Talent Acquisition** — most direct path
4. **Team Lead / Senior IC** — someone likely on or near the team
5. **Engineers in that team or in company**

DO NOT return **General leadership** of high positions, such as CTO, VP Eng, founders, ESPECIALLY for larger companies, UNLESS its a really small company and they might oversee hiring of that role

# Step 5 — Draft Outreach Messages (Hybrid Version)

For each contact, write a short LinkedIn connection request or InMail draft intended to surface Michael’s application and route him to the right person or process.

Use files in the human_context/ folder to extract:

Michael’s relevant skills and experience
Role-aligned strengths
Company/role context if available

Adapt messaging based on recipient type (recruiter, engineer, hiring manager). Adjust emphasis accordingly:

Recruiter → hiring process + routing
Engineer → team context + routing
Hiring manager → role alignment + hiring context
Core Message Structure (MANDATORY HYBRID)

Each message must include:

1. Application + role reference
Explicitly mention applied role and company
2. One-line identity + relevant strength
Derived from human_context
Keep it minimal (1 sentence max)
3. Primary ask (direction / routing)
Ask if they are the right person OR who to contact
OR request guidance on hiring process ownership
4. Secondary lightweight question (IMPORTANT HYBRID ELEMENT)

Include ONE of the following low-effort but real questions:

“What does the team usually look for in strong candidates?”
“Is there anything that tends to stand out in applicants for this role?”
“Is this something your team is actively prioritizing right now?”
“Would you happen to know what part of the process this role is currently in?”

This question should:

NOT require deep thought
NOT require them to be the hiring owner
Act as a signal of genuine interest (not just logistics)
Example Message Patterns
Version A (balanced hybrid — default)

Hi [Name],
I applied for the [Role Title] at [Company] and wanted to reach out.

I’m a backend-focused engineer with experience in [relevant strength from human_context aligned to role].

If you’re not the right person, would you be able to point me toward who handles this role or hiring process?

Also curious—what tends to stand out most in candidates for your team?

Thanks a lot for your time.

Version B (lighter / more indirect)

Hi [Name],
I recently applied to the [Role Title] at [Company] and saw you’re part of the team.

I’m a software engineer with experience in [relevant strength from human_context].

If you’re not the right person, no worries at all—would you mind pointing me in the right direction for this role?

Out of curiosity, is this role currently focused more on [systems / scaling / product / etc., inferred lightly from context]?

Appreciate it!

Version C (more direct / recruiter-friendly)

Hi [Name],
I applied for the [Role Title] and wanted to reach out regarding the hiring process.

I’m a backend engineer with experience in [relevant strength from human_context].

If you’re not the right person, would you mind directing me to whoever owns this role?

Also, is there anything candidates tend to overlook when applying for this position?

Thanks in advance.

Variation Rules
Rotate phrasing heavily across messages to avoid repetition
Do NOT reuse identical question structures consecutively
Ensure every message has:
1 routing ask (primary)
1 lightweight insight question (secondary)
Hard Constraints

DO NOT:

Ask for referrals
Request calls or meetings
Write long paragraphs
Over-sell Michael or list multiple skills
Make the secondary question high-effort or research-heavy
Sound scripted, formal, or promotional
Assume the recipient is the hiring owner unless explicitly indicated in human_context
# Step 6 — Output
**Output File Naming**
Under  `workspace/dynamic_output/job_contacts/`, name a new folder/file using this template:
`MM-DD/{company}-{job-title-slug}.md`
Example: `03-27/stripe-senior-software-engineer.md`
Some requests I won't provide a job link but will provide the job name, us that. IF i didn't provide a job link or there isn't a job name, just name it Eg. `MM-DD-{company}.md`
// If long title you can shorten it to something descriptive but concise, e.g. `03-27-stripe-senior-sw-eng.md`

---
Write the result to this new file using the template below.
## Output Template

```markdown
# Job Contact Research

## Job Details
- **Title:** 
- **Company:** 
- **Location:** 
- **Link Back to the Job post(Same one I provided before the task):** 
- **Date Researched:** 
---

## Contacts Found

## [Full Name]
- **Title/Connection to role(e.g. "Job Poster", "Recruiter", "Hiring Manager", "Team Lead", "Engineer in Team", etc.):** 
- **LinkedIn:**
- **Email(if found)** 
- **Draft Outreach messages for each contact (if any found)**`
- **Notes (if applicable):** 

**Outreach Draft:**
> 

---


If no contacts found after searching both LinkedIn and company site, note that explicitly — don't leave the file empty.

# Step 7 — Append to date-folder contacts_compiled.md
After writing each individual company file, also append a summary section to a `contacts_compiled.md` file **inside the same date folder** (e.g. `workspace/dynamic_output/job_contacts/2026-04-20/contacts_compiled.md`).

This file aggregates all companies researched on that date into one place for easy review.

**This only applies when Michael explicitly triggered the contact research task** (i.e. he asked you to find contacts for a specific job or list of jobs). Do NOT append during heartbeat or automated runs.

Create the file if it doesn't exist (with a header), then append in this format:
```markdown
# Contacts Compiled — {YYYY-MM-DD}

---

## {Company} — {Job Title}
**Job Post:** {job link or N/A}

| Name | Title | LinkedIn |
|------|-------|----------|
| Full Name | Their Title | https://linkedin.com/in/... or N/A |
```

- Only include contacts that were actually found with real names (skip email inboxes)
- If no named contacts found, write: `| No named contacts found | — | — |`
- If a section for the same company+role already exists in the file, skip (don't duplicate)
---



# 🔥 Summary Workflow Of the prior Step

1. Extract job details (location, role, keywords)
2. Go to company → People tab
3. Apply location filter
4. Search in passes in the people page:
   * Engineers
   * Senior ICs
   * Managers
   * Recruiters
5. Use global linkedin search if needed
6. Click profiles you saved,parse them, map team and job relevance from profiles/connection recommends and keywords 
7. Expand to google linkedin search, and/or to the company site
8. Prioritize targets
9. Create outreach messages
10. Put all into a new markdown file, under appropriate date folder

## Search Notes
> What was searched, what was found, any dead ends or limitations encountered.
```
Simply a finish message in the session chat.

# ⚠️ CRITICAL: DO NOT SEND TELEGRAM MESSAGES — EVER
**NEVER send job contact research results to Telegram. Not a summary. Not a notification. Nothing.**
Output goes to markdown files ONLY. Telegram will get bloated and Michael does not want this.
This applies whether you're researching one company or twenty.
---

## Notes
- If nothing direct is found, its okay to send me recruiters from the company who aren't directly connected to the role, or even engineers in other teams. Just note the connection clearly in the output file.
- Use the headed browser for all LinkedIn navigation (requires logged-in session)
- DON'T CONNECT OR SENDanything — research and draft only, Michael handles outreach
- If LinkedIn People tab is gated or shows nothing useful, fall back to company site
- Output file goes in `workspace/job-contacts/` — not Telegram, not anywhere else
- For company sites you mays switch to web search/fetches if they don't block you and the same information is accessible, 
 no need to waste time doing human mimicry on sites that don't monitor bot detection strongly
