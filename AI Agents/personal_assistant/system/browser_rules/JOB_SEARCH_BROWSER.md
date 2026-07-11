# JOB_SEARCH_BROWSER.md
# Embed this in every main agent or sub-agent task that uses the browser.

---

## Step 0: Detect the ATS Before Touching the Browser

Before opening any browser, figure out where the application actually lives.

```bash
# Fetch the job page and look for the real apply URL
curl -sL "JOB_URL" 2>&1 | python3 -c "
import sys, re
c = sys.stdin.read()
links = re.findall(r'https://[^\s\"<>]+', c)
apply = [l for l in links if any(x in l for x in [
    'greenhouse.io', 'lever.co', 'workable.com', 'ashbyhq.com',
    'myworkdayjobs.com', 'linkedin.com/jobs', 'indeed.com',
    'glassdoor.com', 'smartrecruiters.com', 'icims.com', 'taleo.net'
])]
for l in apply[:5]: print(l)
"
```

**ATS → Profile mapping:**

| Detected URL pattern | ATS | Profile to use |
|---|---|---|
| `greenhouse.io` | Greenhouse | `fast-agent` |
| `lever.co` | Lever | `fast-agent` |
| `workable.com` | Workable | `fast-agent` |
| `ashbyhq.com` | Ashby | `fast-agent` |
| `smartrecruiters.com` | SmartRecruiters | `fast-agent` |
| `myworkdayjobs.com` | Workday | `human-agent` |
| `linkedin.com` | LinkedIn | `human-agent` |
| `indeed.com` | Indeed | `human-agent` |
| `glassdoor.com` | Glassdoor | `human-agent` |
| `icims.com` | iCIMS | `human-agent` |
| `taleo.net` | Taleo | `human-agent` |
| Unknown / company careers page | Investigate first | Start with `fast-agent`, switch to `human-agent` if bot detection suspected |

If the job page doesn't expose the ATS directly, open it in `fast-agent` first and check where the "Apply" button redirects before committing to a profile.

---

## Two Browser Profiles — Use the Right One

| Profile | Port | Color | Use For | Human Mimicry |
|---|---|---|---|---|
| `fast-agent` | 18801 | 🟢 Green | Greenhouse, Workable, Lever, Ashby, any non-bot-detected ATS | ❌ None — go fast |
| `human-agent` | 18802 | 🟠 Orange | Workday, LinkedIn, Indeed, Glassdoor, any site that detects bots | ✅ Required |

**Rule: one sub-agent per profile at a time. Never run two agents on the same profile simultaneously.**

Every browser command must include `--browser-profile <name>`:
```bash
openclaw browser --browser-profile fast-agent start
openclaw browser --browser-profile fast-agent open "URL" --label "job"
openclaw browser --browser-profile fast-agent snapshot
openclaw browser --browser-profile fast-agent click REF
openclaw browser --browser-profile fast-agent type REF "value"
```

---

## Which Sites Use Which Profile?

**`fast-agent` (no mimicry needed):**
- Greenhouse (job-boards.greenhouse.io, boards.greenhouse.io)
- Workable (apply.workable.com)
- Lever (jobs.lever.co)
- Ashby (jobs.ashbyhq.com)
- Builtin, Wellfound, SimplyHired, ZipRecruiter job pages

**`human-agent` (strict mimicry required):**
- Workday (*.wd1.myworkdayjobs.com, *.wd5.myworkdayjobs.com, etc.)
- LinkedIn (linkedin.com)
- Indeed (indeed.com)
- Glassdoor (glassdoor.com)
- Any site that shows CAPTCHA or bot verification

---

## Setup Before Starting

```bash
# Start your profile
openclaw browser --browser-profile fast-agent start 2>&1
# OR
openclaw browser --browser-profile human-agent start 2>&1

# Prep resume
mkdir -p /tmp/openclaw/uploads
cp "/home/michael/.openclaw/workspace/human_context/Michael_Huziy_Resume.pdf" /tmp/openclaw/uploads/Michael_Huziy_Resume.pdf
```

---

## Critical: Use `type` NOT `fill` for React Forms

`browser fill` sets DOM values directly — React forms (Workday, Greenhouse) won't register the change. Internal state doesn't update, validation silently fails.

**Always use `type` for form fields:**
```bash
openclaw browser --browser-profile PROFILE type REF "value"
```

For long text (cover letters), `fill` is okay since it's a textarea — but verify after:
```bash
openclaw browser --browser-profile PROFILE fill --fields '[{"ref":"eXX","value":"text"}]'
# Verify:
openclaw browser --browser-profile PROFILE evaluate --fn "() => document.querySelector('textarea')?.value?.length"
```

---

## fast-agent Rules (Greenhouse / Workable / Lever)

No warmup needed. No timing delays. Just go:

```bash
openclaw browser --browser-profile fast-agent open "URL" --label "app"
sleep 2
openclaw browser --browser-profile fast-agent snapshot 2>&1 | grep -i "ref=\|textbox\|button\|radio\|combobox"
# Fill, click, upload — as fast as needed
```

---

## human-agent Rules (Workday / LinkedIn)

**Warmup required before any Workday form:**
```bash
# Land on company Workday home first
openclaw browser --browser-profile human-agent open "https://COMPANY.wd1.myworkdayjobs.com" --label "wd-warmup"
sleep 6
openclaw browser --browser-profile human-agent snapshot 2>&1 | head -5
openclaw browser --browser-profile human-agent evaluate --fn "() => window.scrollBy(0, 300)" 2>&1
sleep 3
# Now navigate to apply URL
openclaw browser --browser-profile human-agent navigate "APPLY_URL" 2>&1
sleep 5
```

**Timing between actions:**
- 0.5–1s between typing into different fields
- Scroll into view before clicking important buttons
- 3–5s after page loads before acting

**Workday sign-in using `type` (not `fill`):**
```bash
openclaw browser --browser-profile human-agent type EMAIL_REF "michaelhuziywork@gmail.com"
sleep 0.8
openclaw browser --browser-profile human-agent type PASSWORD_REF "Darklordsauron1!"
sleep 0.5
openclaw browser --browser-profile human-agent click SIGNIN_BTN
sleep 5
```

If login fails → try Create Account once. If Create Account bounces silently → **STOP, report blocker, do not retry.**

---

## Uploading Files

```bash
# Arm upload FIRST, then click attach
openclaw browser --browser-profile PROFILE upload "/tmp/openclaw/uploads/Michael_Huziy_Resume.pdf" 2>&1 &
sleep 1
openclaw browser --browser-profile PROFILE click ATTACH_REF 2>&1
sleep 4
# Verify
openclaw browser --browser-profile PROFILE evaluate --fn "() => document.body.innerText.includes('Michael_Huziy_Resume')" 2>&1
```

---

## Red Lines — Stop Immediately

- CAPTCHA / "verify you're human"
- Phone verification prompt
- Account restricted / locked message
- Unusual activity warning

→ Screenshot, stop, report to main session.

---

## Completion

```bash
openclaw browser --browser-profile PROFILE screenshot 2>&1
```

Report back: fields filled, anything guessed, blockers hit, current state.
