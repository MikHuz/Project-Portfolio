# JOB_APPLICATION_TASK.md
# Purpose
Apply to a specific job on Michael's behalf using the browser. The job is either one found via the search task or one provided directly by Michael.

**Current phase:** Development. We are building and refining this pipeline together. Do NOT auto-submit applications without explicit confirmation from Michael. Stop and confirm before final submission.

---

# Before Starting — Always Read These ONLY if you haven't already from session startup
- `human_context/data dump about me.md` — personality, background, how Michael thinks and writes
- `human_context/WORK_EXPERIENCE.md` — detailed work history, what he actually built and did
- `human_context/RESUME.md` — current resume content
- `human_context/interview_answers.md` — past answers to employer questions (reuse and adapt)
- `human_context/documents/` — contribution docs, transcript, and other attachments

Do not start an application without reading these.

---

# Core Application Info — Always Use These

| Field | Value |
|-------|-------|
| **Name** | Michael Huziy |
| **Legal name** | Mikhail Huziy — use ONLY when field explicitly says "legal name". Use "Michael" everywhere else. |
| **Phone** | (925) 822-4587 |
| **Email** | michaelhuziywork@gmail.com ⚠️ NOT michaelhuziy@gmail.com |
| **LinkedIn** | https://www.linkedin.com/in/michael-h-640884251/ |
| **GitHub** | https://github.com/MikHuz/Project-Portfolio |
| **City** | San Francisco |
| **State** | California |
| **Country** | United States |
| **Citizenship** | US Citizen — no sponsorship or visa required |
| **Willing to relocate** | Yes — anywhere in the US |

> ⚠️ **Location rule:** If a job explicitly requires applicants to already be in a specific metro (no mention of relocation being okay) → **drop the app and report back to Michael**. Do not apply.
| **Work type** | Full-time or Remote — both fine |

> ⚠️ **Address note:** Always use "San Francisco" as the city. Do not use Walnut Creek. It doesn't convey anything and San Francisco is the nearest recognizable city.

---

# Standard Question Answers

## Work Authorization
- US Citizen: **Yes**
- Require visa/sponsorship now or in the future: **No**

## Demographics (EEO / Voluntary Self-ID)
- **Default: Decline to answer for ALL demographic questions**
- If a field is **required** and won't accept blank/decline:
  - Gender: Male / He/Him
  - Race/Ethnicity: White or Caucasian, Not Hispanic or Latino
- Do not volunteer any demographic info beyond what's required

## Veteran Status
- Are you a veteran: **No**

## Disability
- Do you have a disability: **No**

## Salary
- Target: **$100,000**
- Range entirely **below** $100k → enter the **top end** (e.g. $70k-$90k → $90k)
- Range entirely **above** $100k → enter **$100k** (or "$100k-$[their lower bound]" if a range is asked for)
- $100k **falls within** their range → enter **$100,000**
- No salary info listed → estimate based on role/location; don't blindly default to $100k

## Previously/Currently Worked For Company
- Currently work for / supplier of / customer of the company? → **No**
- Previously worked for the company? → **No**

## Age / Work Authorization
- 18 or older? → **Yes**
- Authorized to work in US? → **Yes**
- Need visa sponsorship? → **No**

## Veteran Status
- Always: **"Not a protected Veteran"** or equivalent "I am not a veteran" option
- Do NOT select "I do not wish to answer" for veteran status

## Other Standard Questions
- Spouse/domestic partner at company or conflict of interest: **No**
- Other citizenships: **No**
- Government contracts / government work history that requires disclosure: **No**
- Hold or have held security clearances: **No**
- Willing to relocate: **Yes**
- Willing to work full-time: **Yes**
- Willing to work remotely: **Yes**

---

# Hard Timeout Rule
Sub-agents running this task must complete within **25 minutes**. If you are still working after 25 minutes, stop immediately, take a screenshot, and report current state. Do not keep retrying stuck flows.

---

# Step 0 — Detect the ATS and Pick the Right Browser Profile

Before anything else, figure out what ATS the application actually uses.

1. Fetch the job URL and look for apply links pointing to known ATS domains
2. Map to the correct browser profile:

| ATS | Profile |
|---|---|
| Greenhouse, Lever, Workable, Ashby, SmartRecruiters | `fast-agent` (18801) — no mimicry, go fast |
| Workday, LinkedIn, Indeed, Glassdoor, iCIMS, Taleo | `human-agent` (18802) — strict mimicry |
| Unknown | Open in `fast-agent` first, check apply redirect, switch to `human-agent` if bot detection suspected |

3. Always pass `--browser-profile fast-agent` or `--browser-profile human-agent` to EVERY browser command
4. Read `system/browser_rules/JOB_SEARCH_BROWSER.md` if you haven't read for the full rules for whichever profile you end up on

---

# Step 1 — Analyze the Job Description

Before touching the application form, do this:

1. Read the full job description carefully
2. **Identify the top 15 skill/keyword signals** from the JD — not just tech keywords, but what they're actually looking for in context:
   - What problem is this team solving?
   - What does "success" look like in this role?
   - What kind of working style do they expect?
   - What industry/company context shapes the requirements?
3. Map each keyword/signal to Michael's background:
   - Direct match → use it confidently
   - Partial match → frame it accurately without overstating
   - No match → note it, don't fabricate
4. Identify the 3–5 most important things this employer cares about — these should anchor every answer

---

# Step 2 — Skills Sections

When the application has a skills or keyword matching section:
- Use the mapped keywords from Step 1
- Only claim skills Michael actually has (see `human_context/RESUME.md` and `WORK_EXPERIENCE.md`)
- Prioritize terms that match the JD language exactly (ATS optimization)
- Do not list technologies he has no experience with

---

# Step 3 — Fill the Application

Work through the form field by field using the browser:
- Use core info table above for standard fields
- For work history, use the **official Rovensys description** below verbatim (or trimmed to fit character limits). Do NOT use autofilled resume text for the role description — replace it.
- Work experience entries should ONLY include: Rovensys (current) and The Furnace Teen Center (prior). Remove any other entries that get autofilled (e.g. Cedars-Sinai project, other side projects — these are not employment).

**Rovensys start date: August 2025. Do NOT say "contract" anywhere — use "Software Developer" or "Software Engineer".**

**Official Rovensys Role Description (use this):**
> Embedded as the primary technical resource for a client company with limited internal IT infrastructure. Worked directly and daily with business owners and operations stakeholders to deeply understand their core processes, sales workflows, customer pain points, and revenue drivers. Translated operational and customer facing challenges into practical engineering technical solutions that reduced manual work, improved efficiency, and supported customer experience and revenue-generating activities.
>
> - Designed and built a mobile-first React SPA for real-time garage door configuration and instant pricing, supporting the company's primary revenue product.
> - Completely rebuilt and stabilized a broken web infrastructure, including deep architectural customizations and root cause analysis and debugging.
> - Engineered reusable SEO-optimized content templates enabling non-technical staff to publish consistently and independently.
> - Centralized lead intake from multiple platforms (website, Angi, Thumbtack, etc.) into a single CRM using APIs, webhooks, and automation tools.
> - Implemented automated outreach pipelines and AI-powered chatbots (website + SMS) tuned to the business's brand voice.
> - Built LLM-driven workflow automation systems capable of interpreting natural language requests and executing multi-step actions across business platforms.
- For open-ended questions (cover letter, "why us", behavioral prompts):
  - Check `human_context/interview_answers.md` for prior answers to similar questions — adapt, don't copy verbatim
  - Write in Michael's voice: direct, specific, no filler words ("passionate", "excited", "love to"), grounded in real work
  - Keep it concise — say more with less
  - Anchor answers to real things he built or solved
- **Always upload the resume:** `human_context/Michael_Huziy_Resume.pdf`
- **Cover letter:** Write a cover letter whenever there is ANY cover letter field (upload OR text box). Only skip if there is literally no cover letter field anywhere in the form.
  - If a cover letter field exists: write a tailored one using the Google Doc template (see Cover Letter section below)
  - Export as PDF. Upload filename: **`Michael_Huziy_Cover_Letter.pdf`** (always this name)
  - Store a documentation copy: `human_context/cover_letters/{Company} - {Role Title}.pdf` (e.g. `Peaksware - Software Engineer React.pdf`)
  - Upload `Michael_Huziy_Cover_Letter.pdf` to the application field
- **Additional documents:** Check `human_context/documents/` for contribution docs, transcript — upload if the application has a field for additional materials

---

# Step 4 — When in Doubt, Stop and Ask

**Do NOT guess on anything that could misrepresent Michael or get the application flagged.**

If you encounter:
- A question you don't have a clear answer for
- A required field where the right answer isn't obvious
- A sensitive question (salary expectations, specific situation, niche skill)
- Anything that feels like it needs Michael's judgment

**→ STOP. Do not close or submit the application. Do not fill in a guess.**

Do this instead:
1. Send a Telegram message to Michael (ID: `5667586768`) with:
   - The company and role
   - The exact question(s) you're stuck on
   - The URL of the application page
   - What options/fields are available
2. Send a message in the main session with the same info
3. Leave the browser open on the application page
4. Wait for Michael to respond before proceeding

---

# Step 5 — Pre-Submit Review

Before submitting:
1. Review every field — check for blanks, errors, placeholder text
2. Confirm email is `michaelhuziywork@gmail.com`
3. Confirm resume PDF is attached
4. Re-read any long-form answers for tone — remove any filler words that crept in
5. **Notify Michael via Telegram and main session** with a summary of what's about to be submitted
6. **Wait for confirmation before hitting submit** — do not auto-submit during development phase

---

# Step 6 — After Submission

Once submitted (with Michael's confirmation):
1. Take a screenshot of the confirmation page
2. Note the application confirmation number/email if shown
3. Log to `dynamic_output/job-applications-tracker.md`:
   - Date
   - Company
   - Role
   - Job post URL
   - Confirmation details
4. Update the Google Sheet row for this job (if it exists): mark nothing yet — Michael will update checkboxes manually
5. Send Telegram confirmation message

---

# Cover Letter Process

**Template Doc:** https://docs.google.com/document/d/1ZTNyiWXGQd5nOLNobsKE4r23Pf_RqRoRgMWfEvJN7jU/edit
**Account:** michaelhuziy@gmail.com

## Steps:
1. Open the template doc via gog
2. Replace the right-hand header fields: date (today's date), company name, company location
3. Write the body tailored to the specific role
4. Anchor the letter to 2–3 specific things from the JD that map directly to his work
5. Export/download as PDF via Google Drive export URL
6. Save upload copy as: `Michael_Huziy_Cover_Letter.pdf` (this is the filename used for every upload)
7. Save documentation copy to: `dynamic_output/cover_letters/{Company} - {Role Title}.pdf` (e.g. `Peaksware - Software Engineer React.pdf`)
8. Upload `Michael_Huziy_Cover_Letter.pdf` to the application

## Cover Letter Format & Voice

**Always open with:**
> Dear Hiring Team,

**Paragraph 1 — Intro:**
> Hi, I hope you're doing well. I am a software engineer with experience in full-stack development, systems integration, and AI-driven automation, [1–2 sentences describing recent work that directly maps to this role].

**Paragraph 2 — Stakeholder work + practicality:**
How he worked directly with stakeholders to address real business problems — ranging from building apps, to integrations, to AI agents. Focus on: practicality, real operational/customer-facing problems, full end-to-end ownership. Do NOT just list technologies — show that the work solved real problems.

**Paragraph 3 (optional):** Expand on one specific piece of work if it's particularly relevant to something in the JD.

**Optional closing paragraph — strengths:**
Only include if it adds value. Two strengths worth mentioning:
1. **Relentless Problem Solving** — goes deep, debugs at root cause level, keeps iterating through complex/unfamiliar issues until fully resolved. Doesn't stop at surface-level fixes.
2. **Systems Thinking** — steps back to evaluate whether solutions are effective and scalable. Doesn't just complete tasks — redesigns processes and implements automation that reduces manual work and improves how the system operates as a whole.

**Always end with:**
> Best Regards,
> Michael Huziy

**NEVER use:**
- "excited", "passionate", "thrilled", "love working on", "particularly interested in"
- Language that sounds obviously written to mirror the JD's mission statement — no one genuinely says that
- Generic opening like "I am writing to express my interest in..."
- Language which 

**Tone:** Direct, impact-focused. Demonstrate results rather than describe enthusiasm. Closer to a confident engineer's email than a formal cover letter.

## Export command (PDF download via Drive):
```bash
DOC_ID="1ZTNyiWXGQd5nOLNobsKE4r23Pf_RqRoRgMWfEvJN7jU"
mkdir -p /home/michael/.openclaw/workspace/human_context/documents/cover_letters
rm -f ~/.local/share/gogcli/keyring/.lock
GOG_KEYRING_PASSWORD="***" gog docs export $DOC_ID --format pdf --out "/home/michael/.openclaw/workspace/human_context/documents/cover_letters/FILENAME.pdf"
```

---

# Writing Voice — Michael's Style

Always write in this voice:
- Direct and specific — state what he did and what it achieved
- No filler: never "passionate about", "excited to", "love working on"
- No corporate fluff: never "synergize", "leverage", "utilize"
- Ground everything in real work: name the project, the problem, the outcome
- Concise: one strong sentence beats three weak ones
- Confident but not arrogant — he knows his stuff, he doesn't need to oversell it

**Examples of his tone:**
- ✅ "I built a pricing engine that eliminated manual quote lookups and reduced turnaround from hours to seconds."
- ❌ "I'm passionate about leveraging technology to drive impactful solutions."
- ✅ "I reverse-engineered the PHP theme to make changes the page builder couldn't support."
- ❌ "I have extensive experience working with WordPress and enjoy solving complex problems."

---

# Capturing New Context

After every application session, update these files with anything new learned:
- `human_context/interview_answers.md` — any question Michael answered that could apply again
- `human_context/data dump about me.md` — new details about his background, preferences, or how he frames things
- `MEMORY.md` — writing style signals, preferences, red flags he flagged in a JD

The profile compounds. Write it down.
