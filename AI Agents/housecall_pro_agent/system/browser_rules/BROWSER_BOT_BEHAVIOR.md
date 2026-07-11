# Browser Behavior Rules — Human-Like Automation

These rules apply whenever using the headed browser (OpenClaw browser tool) on sites with bot detection (LinkedIn, Indeed, Glassdoor, etc.). These rules DO NOT apply IF a task markdown instruction tells it to ignore human like automation. You may confidently ignore the instructions here if a user or a task that is being read and executed gives permissions to act like a bot. 

## Core Principle
Act like a fast, efficient human — not a slow careful bot, and not a raw web crawler either. Real people click around quickly and messily. The goal is speed + just enough randomness to avoid detection, not slow deliberate pausing at every step.

## Adaptive Problem Solving — Do Not Follow Instructions Blindly

Task playbooks describe *what* to accomplish, not the exact mechanics of every click. **If a specific method isn't working, use your judgment and try an alternative.** Do not retry the same failing action more than twice.

### The Rule: 2 Failures = Switch Approach

If any action fails twice in a row:
1. **Stop retrying that exact method immediately.**
2. **Ask yourself: what is the underlying goal here?** (e.g. "get the post URL" — not "click the Share button")
3. **Find an alternative that achieves the same goal:**

| Task Goal | Primary Method | Alternative If Primary Fails |
|---|---|---|
| Get current page URL | `window.location.href` via evaluate | Read URL bar from snapshot |
| Click a button | Click by ref | Click inner child ref, or use keyboard (Tab + Enter) |
| Fill a text field | `action=fill` or `action=type` | `evaluate` to set value directly |
| Navigate to a page | Click a link | Navigate directly via URL |
| Scroll to element | `scrollIntoView` | `window.scrollBy` with evaluate |
| Extract text | Read from snapshot | `evaluate` with `document.querySelector` |
| Wait for page load | `loadState` | Re-snapshot after short evaluate delay |

4. **If all alternatives fail**, skip the item, log it as blocked, and move on. Never stop the entire task over one stuck element.
5. **Never apologize or narrate the failure excessively** — just adapt and keep moving.

### What "following instructions literally" looks like (bad):
- Task says "click Share to get the URL" → Share button fails → retry 10 times → stuck forever

### What adaptive behavior looks like (good):
- Task says "click Share to get the URL" → Share button fails once → think: *the goal is the URL, not the button* → use `window.location.href` → got the URL → move on

**The task describes intent. Your job is to achieve the intent, not execute the script.**

---
## Where do these rules apply?
- Any site that requires a logged-in account and has active bot detection (LinkedIn, Indeed, Glassdoor).
- Not necessary for sites that allow crawling (e.g. Wikipedia) — can be more aggressive there.
- General webs searching and opening tabs, doesn't matter, once your on a site that has strong bot detection, these rules apply.
## Timing Rules

**Browse fast. Don't manufacture delays that no real person would have.**

- **Between page loads:** Move on as soon as the page is ready. No fixed wait — just take a snapshot and act.
- **Before clicking:** Take a snapshot, do a quick scroll, then click. Don't sit there "reading" for 2 seconds every time.
- **Between searches:** 1–2 seconds is fine. Don't hammer back-to-back with zero gap, but don't throttle yourself to 3+ seconds either.
- **Between profile views:** 2–3 seconds. Vary it slightly — don't be perfectly consistent.
- **After typing:** A quick half-second before submitting is enough. You're not proofreading every time.

The old rule was "slower and messier is safer." That's wrong for speed-critical tasks. Fast + slightly random = human. Slow + consistent = bot.

## Daily Volume Limits (LinkedIn is a good example site. Any site using a logged in account)

- **Profile views:** Max 80/day
- **Search queries:** Max 40/day
- **Job listing views:** Max 150/day (less scrutinized)
- **Connection requests:** Do NOT send — too high risk on a new account
- **Messages:** Do NOT send automated messages no matter what
- **Messages:** Do NOT send automated messages no matter what

## Getting Post/Page URLs

- **Never use a Share button to get a URL** — it's unreliable and causes stale ref loops.
- **Always use `window.location.href`** via evaluate to get the current page URL:
  ```
  browser action=act, kind=evaluate, fn="window.location.href"
  ```
- Strip tracking query params (e.g. `?init_source=search&query=garage+door`) — keep only the base path like `https://nextdoor.com/p/dRmNKDJpgpDy`.
- If you're already on the post detail page, the URL IS the direct link. No extra steps needed.

## Stale Ref Loops — Break Out Immediately

- If an element click fails with "not found or not visible" **more than once**, do NOT retry the same ref.
- Take a fresh snapshot, find the element again, OR find an alternative approach (like using the URL instead of clicking Share).
- Never scroll up/down repeatedly trying to re-expose a stale element — this is a bot signal and wastes time.

## Scroll Behavior

- Before clicking a section or element, do a quick scroll first (200–400px). One call — not a slow multi-step scroll loop.
- Don't always land pixel-perfect on the element and click immediately. A scroll + slight pause looks real.
- You don't need to "simulate reading time" — just scroll past things naturally as you would skimming a page.
- Use evaluate to scroll when needed:
  ```
  window.scrollBy(0, Math.random() * 400 + 200)
  ```

## Navigation Patterns

- Go directly to where you need to go — don't waste time landing on homepages as a "ritual" before every nav.
- Vary your click pattern: don't always click the very first result. Sometimes scroll past it, come back. Takes 1 second, looks real.
- Non-linear is human — it's fine to take a snapshot, skip something, scroll, come back. You don't have to be perfectly sequential.
- Use the search bar instead of constructing URLs directly where possible.
- Avoid looping through tabs in the same order every run — open what you need, close what you don't.

## Session Behavior

- **Max session length:** 45–60 minutes of activity, then stop.
- **Only run during human hours:** 8:00 AM – 10:00 PM Pacific. Never overnight.
- **Warm-up:** No need to idle on the feed. Navigate to LinkedIn, take a snapshot, and proceed to your task. A quick scroll on landing is enough.
- **Cool-down:** Navigate back to feed when done. No need to sit there — just land on it and close.


## Fingerprint / Stealth

- `noSandbox: true` is required for WSL2 — already set.
- Do NOT run headless (`headless: false` already set) — headless is easier to detect.
- If LinkedIn starts showing CAPTCHAs or verification prompts: stop immediately, inform user at telegram to complete manually before continuing.

## Red Lines — Stop Immediately If:

- CAPTCHA appears
- "Verify your identity" or phone verification prompt
- Account restricted message
- Unusual activity warning email arrives
- Any security challenge page
- For some reason you are sending a message, stop right away.

When a red line is hit: take a screenshot, log it, stop the session, notify Michael via Telegram.
 
 If a site blocks an agent or IP address, stop immediately and do not attempt to bypass. Contact Michael for possible reason for blocking and next steps. 
---


---

*Last updated: 2026-06-08*
*Applies to: LinkedIn, Indeed, Glassdoor, and any site with aggressive active bot detection*
*For things sites like wikipedia which permit bot crawling, these rules can be a lot more relaxed*
