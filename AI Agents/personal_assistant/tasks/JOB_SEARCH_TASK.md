# JOB_SEARCH_TASK.md
# Purpose
Find matching job postings for Michael. Append each one to the Google Sheet tracker and daily leads file. That's it.
Networking, contacts, and applying are handled separately in JOB_APPLICATION_TASK.md.

---

# Before Starting
- Read `human_context/data dump about me.md` and `human_context/WORK_EXPERIENCE.md` — know who you're searching for
- Boot the headed browser: `openclaw browser start`
- Existing browser session cookies handle logins — do NOT attempt manual login on any site

---

# Filters — STRICT, NO EXCEPTIONS

## ❌ HARD DISQUALIFIERS — skip immediately if any are true
- Title contains: "Senior", "Sr.", "Staff", "Lead", "Principal", "Architect", "Manager", "Director", "Head of", "VP"
- Requires **4+ years** of experience (3 years is borderline — read carefully)
- Internship restricted to currently enrolled students
- Class-of-2026/2027-only pipeline
- Role is pure ML/data science research (not engineering)
- "Fast-paced startup", "wear many hats", "thrive under pressure" with no other signals

## ✅ GREEN FLAGS — prioritize these
- Title or description says: "Entry-level", "Junior", "New Grad", "Associate", "Engineer I", "SWE I"
- "0–1 / 0–2 / 0–3 years experience"
- Bachelor's degree required (not enrollment)
- Mentorship, onboarding, growth path mentioned

## ⚠️ BORDERLINE — include only if strong fit
- "2+ years" required — include if Michael's Rovensys work clearly covers it
- "Mid-level" — include only if JD reads entry-friendly and skills align well
- No explicit seniority signal — read the full responsibilities to judge

**Posted within the last 30 days. No exceptions.**

---

# Target Roles
- Software Engineer (any seniority I/II/junior/associate/new grad)
- Full Stack, Backend, Frontend Engineer
- Data Engineer (entry-level only)
- Cloud/SRE/Platform Engineer (junior only)
- Web Developer (any industry — a web dev role at a manufacturing company in Texas is valid)
- Any role where responsibilities match Michael's actual skills regardless of title

---

# Geography — Nationwide, Open to Relocation
Michael will relocate anywhere in the US.

**Priority metros:**
- Denver, CO (50–100mi radius)
- Dallas / Houston / Austin, TX
- Raleigh-Durham, NC
- Seattle, WA
- Remote (no location restrictions)
- Bay Area / Northern CA (fine, not priority)
- Any other US city for a strong match

**Any industry is valid.** Cast wide — healthcare, finance, logistics, retail tech, etc.

---

# Sources

**Use `human-agent` browser profile (port 18802) — bot detection, strict mimicry:**
- LinkedIn Jobs — logged in via existing cookies
- Indeed — logged in via existing cookies
- Glassdoor — logged in via existing cookies

```bash
openclaw browser --browser-profile human-agent start
openclaw browser --browser-profile human-agent open "https://www.linkedin.com/feed/" --label "linkedin"
# ... all subsequent commands use --browser-profile human-agent
```

**No browser needed (web_search / web_fetch):**
- Builtin, Wellfound, Dice, SimplyHired, ZipRecruiter
- Direct Greenhouse/Lever/Ashby/Workday job boards
- Company career pages
- Search queries: `"software engineer" "entry level" Denver 2026`, `"junior software engineer" site:lever.co`, `"new grad" "software engineer" 2026 remote`, etc.

---

# Human Mimicry Rules (Browser Sessions — LinkedIn / Indeed / Glassdoor)

Always use `--browser-profile human-agent` for these sites. Existing logged-in cookies are assumed valid. Do NOT log in manually.

**LinkedIn:**
1. `openclaw browser --browser-profile human-agent open "https://www.linkedin.com/feed/" --label "linkedin"` — land on feed first
2. Wait 10–15 seconds (simulate reading): `sleep 12`
3. Scroll down once: `openclaw browser scrollintoview [some ref]` or use evaluate to scroll
4. Navigate to Jobs: `openclaw browser navigate "https://www.linkedin.com/jobs/search/?keywords=software+engineer+entry+level&location=United+States"`
5. Wait 5s between page actions
6. Max 10 job listings fetched per session
7. **CAPTCHA / "Verify you're human" → STOP immediately**, report blocker, do not retry

**Indeed / Glassdoor:**
1. Open homepage first, wait 8–10s
2. Then navigate to search results
3. Wait 3–5s between actions
4. Max 10 listings per session
5. CAPTCHA → STOP immediately

**General:**
- Never rapid-fire requests — minimum 3s between clicks
- If bot detection suspected (unusual redirect, blank page, 403): stop that source, move to another

---

# Link Verification — MANDATORY

**Every job link must be verified before logging.** No exceptions.

**Verification process:**
1. Try `web_fetch` on the direct URL first
2. If fetch returns a real job title matching what you found → verified ✅
3. If fetch returns 404, company homepage, search results, or generic company page → NOT verified ❌
4. If fetch is ambiguous → open in browser: `openclaw browser open "URL" --label "verify"`, take screenshot, confirm job title is visible
5. **Never log a link to a company jobs homepage** (e.g. `company.com/careers`) — must be the specific posting
6. If you can't find a direct verified link for a job → skip it entirely, don't guess

---

# Output Per Job

For each verified job that passes all filters:

1. **Append to daily leads file:** `/home/michael/.openclaw/workspace/dynamic_output/job_leads/YYYY-MM-DD.md`
   - Create file if missing (use today's date)
   - Append to END — never overwrite
   - Format:
   ```
   ---
   ## N. Job Title — Company
   - **Location:** City, ST (Remote/Hybrid/On-site)
   - **Salary:** $X–$Y or Not listed
   - **Link:** [verified direct URL]
   - **ATS:** Greenhouse / Lever / Workday / Ashby / Workable / Unknown
   - **Status:** Not applied
   - **Fit:** 2 sentences max — what maps and why
   ```

2. **Append to Google Sheet:**
   ```bash
   rm -f ~/.local/share/gogcli/keyring/.lock
   GOG_KEYRING_PASSWORD="***" gog sheets append 18_yn0wKzbxUecee3agA_ub6s08of85ZnDY-OUP7LKh4 "Sheet1!A:E" \
     --values-json '[["Company", "=HYPERLINK(\"https://url\",\"Job Title\")", "City, ST", false, false]]' \
     --input USER_ENTERED \
     --account michaelhuziy@gmail.com
   ```

3. **Report all results in the main session** — no Telegram unless explicitly asked

---

# Key Rules
- One job end-to-end: find → verify link → filter → log → next
- DO NOT apply — separate task
- DO NOT contact anyone
- If a link can't be verified → skip the job entirely
- Senior/Lead/Staff/Principal roles → skip immediately, don't even read the JD
