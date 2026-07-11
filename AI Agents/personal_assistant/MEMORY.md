# MEMORY.md — WorkLobster Dave's Long-Term Memory

_Curated knowledge about Michael and ongoing context. Updated over time._

---

## Who Is Michael

- **Full name:** Michael Huziy (legal: Mikhail Huziy)
- **Name rule:** Use "Mikhail" ONLY when a field explicitly says "legal name". Use "Michael" everywhere else (preferred name, display name, general fields).
- **Location:** Walnut Creek, CA (Bay Area)
- **Age/stage:** Recent CS grad (CSUMB, Dec 2024), early career
- **Email:** michaelhuziywork@gmail.com
- **Phone:** (925) 822-4587
- **LinkedIn:** https://www.linkedin.com/in/michael-h-640884251/
- **GitHub:** https://github.com/MikHuz/Project-Portfolio
- **Telegram ID:** 5667586768

---

## Professional Profile

### The One-Liner
"I build scalable systems that reduce manual work and improve operational efficiency."

### Current Role
Software Developer via Rovensys — embedded at a home services (garage door) company as their sole technical resource. Aug 2025 – Present.
- **Do NOT describe this role as "contract" in applications** — just say Software Developer or Software Engineer. The word "contract" signals temp/junior. Let the experience speak for itself.

### What He Actually Did There (the real depth)
- Built React SPA with dynamic pricing engine for real-time garage door customization — core revenue product
- Reverse-engineered and modified WordPress PHP theme source files beyond what page builders allow
- SEO: 15+ ranking spots improvement, ~350% indexed URL visibility increase, 4-5x traffic
- Unified CRM with API/webhook/Zapier integrations (Angi, Thumbtack, website)
- Automated email/SMS/voicemail outreach pipelines
- Deployed AI chatbots (web + SMS) and voice AI agents
- Built LLM-driven agentic workflow systems for non-technical staff

### Other Projects
- CNN model for MRI brain tumor segmentation (Cedars-Sinai initiative) — 7500+ scans, 5.6% over benchmark
- QR scanner app (The Furnace Teen Center) — fixed deep bugs, docs cut onboarding 50-60%

### Certifications
- Meta Front-End Developer (2025)
- Azure Fundamentals AZ-900 (2026)

### Education
- B.S. CS, CSUMB, Aug 2022 – Dec 2024 (~3.04 GPA)
- Diablo Valley College transfer (3.261 GPA)

---

## Job Search

### Target
Entry/junior SWE roles. Full-stack preferred (primary skillset), open to backend, frontend, AI/automation-adjacent, data engineering (entry), cloud engineering (entry).

### Location
**Nationwide — open to relocation.** Bay Area is no longer the focus. Priority metros: Denver (50-100mi radius), Dallas/Houston/Austin TX, Raleigh-Durham NC, Seattle WA, Remote. Any other US city is also fine if the role is a strong match.

### Culture fit
Structured teams, mentorship, clear expectations, learning-oriented. NOT high-pressure startup hustle or "wear many hats" with no support. Okay with legacy stacks if growth is there.

### Application voice
Direct, skills-focused, no filler words ("passionate", "excited"). Tailor when possible.

---

## Key Personality/Work Traits
- Systems thinker — sees how pieces connect, spots inefficiencies
- Self-learner — dives into unfamiliar codebases, reverse-engineers
- Proactive — doesn't wait for direction, takes ownership
- Automation-minded — always looking to remove repetitive work
- AI as multiplier — uses it to accelerate, not replace judgment

---

## Browser Profiles (2026-06-16)

Two headed Chromium profiles, both visible via WSLg:

| Profile | Port | Use For | Mimicry |
|---|---|---|---|
| `fast-agent` | 18801 | Greenhouse, Workable, Lever, Ashby — no bot detection | None, go fast |
| `human-agent` | 18802 | Workday, LinkedIn, Indeed, Glassdoor | Strict |

- One sub-agent per profile at a time — never two agents on same profile
- Always pass `--browser-profile fast-agent` or `--browser-profile human-agent` to every browser command
- `openclaw` profile (18800) reserved for main session interactive use
- Full rules: `system/browser_rules/SUBAGENT_BROWSER_SNIPPET.md`

---

## Setup & Tools (2026-06-12)

- **OpenClaw version:** 2026.5.18
- **Browser:** Chromium (from xtradeb PPA, `/usr/bin/chromium`) wrapped at `/home/michael/.local/bin/chromium-automation` with anti-bot flags (`--disable-blink-features=AutomationControlled`, real Windows UA, etc.)
- **Browser mode:** Always headed (visible window via WSLg on Windows 11)
- **DISPLAY:** :0 (WSLg), injected into gateway systemd service
- **Telegram:** Bot token was showing 401 errors as of 2026-06-12 — needs fixing
- **PDF reading:** `poppler-utils` installed (`pdftotext` available)

---

## Job Application Pipeline — Current Phase

- **Status:** Development phase. Finding jobs + applying together manually. NOT auto-submitting yet.
- **Goal:** Eventually apply on Michael's behalf autonomously. Building toward that.
- **Key rule:** Every session where we work on applications should end with new context written to files. Never let useful info die at session end.
- **Growing profile:** As Michael answers employer questions, reveals preferences, or edits drafts — capture it. Files to update:
  - `human_context/data dump about me.md` — general profile, background, personality
  - `human_context/interview_answers.md` — specific Q&A responses (create if missing)
  - `human_context/WORK_EXPERIENCE.md` — deeper work history details that come up
  - `MEMORY.md` (here) — high-level patterns, preferences, writing style signals
- **Writing style so far:** Direct, no filler words, skills-focused. Dislikes "passionate/excited" language. Prefers specific and grounded over generic and enthusiastic.

---

## Salary Rules
- Target: **$100,000**
- If their range is entirely **below** $100k → enter the **top end** of their range (e.g. $70k-$90k → enter $90k)
- If their range is entirely **above** $100k → enter **$100k to their lower bound** as a range (e.g. $120k-$150k → enter $100k-$120k, or just $120k if only one number)
- If $100k **falls within** their range → enter **$100,000**
- If no salary info listed → use position title + location to estimate market rate and enter something appropriate

## Standard Application Yes/No Answers
- 18 or older? → **Yes**
- Authorized to work in the US? → **Yes**
- Need sponsorship? → **No**
- Willing to commute? → **Yes** (always, any distance)
- Willing to relocate? → **Yes** (always, anywhere in US)
- Currently work for / are you a customer or supplier of [company]? → **No**
- Have you previously worked for [company]? → **No**
- Veteran status? → **"Not a protected Veteran"** (or closest equivalent to "I am not a veteran" — NOT "I do not wish to answer")

## Cover Letter Rules
- Write a cover letter whenever any CL field exists (upload OR text box). Only skip if there is literally no cover letter field in the form.
- Upload filename: always **`Michael_Huziy_Cover_Letter.pdf`**
- Documentation copy: `human_context/cover_letters/{Company} - {Role Title}.pdf` (e.g. `Peaksware - Software Engineer React.pdf`)

## Things To Remember

- Michael prefers Telegram for notifications
- Don't bundle job search results — one message per job
- Python drills disabled in heartbeat (Michael disabled 2026-06-12) — only run if explicitly asked
- human_context/ directory has resume PDFs, work experience docs, data dumps — read these for job search tasks
- `dynamic_output/job-applications-tracker.md` is where application confirmations get logged
- **Application email is `michaelhuziywork@gmail.com`** — NOT michaelhuziy@gmail.com. Never mix these up.
- **Address for applications:** City = "San Francisco", State = California. Never use Walnut Creek.
- US Citizen, no sponsorship needed. Demographics: decline to answer (if forced: male, white/caucasian not hispanic). Not a veteran. No disability.
- **Job application account password:** `Darklordsauron1!` — use this for ALL account creation on job platforms (Workday, Greenhouse, Lever, etc.)
- GOG keyring passphrase is stored securely — use `GOG_KEYRING_PASSWORD` env var for all gog commands. Always delete `~/.local/share/gogcli/keyring/.lock` before running gog.

---

## Session Log

### 2026-06-12
- Set up Chromium for browser automation (xtradeb PPA, anti-bot wrapper script)
- Fixed headed mode — added DISPLAY=:0 to gateway systemd service
- Bot detection test: navigator.webdriver = passing, WebGL = missing (WSL2 GPU gap), UA = now Windows Chrome
- Read all files in human_context/ — full professional profile now in USER.md
- Disabled Python fluency heartbeat drill
- Cleaned up AGENTS.md startup sequence (system/ directory files properly referenced)
