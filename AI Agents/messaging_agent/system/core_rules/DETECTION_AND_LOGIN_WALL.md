# Detection & Login Wall — Immediate Stop Rule

## Purpose
This rule applies to **all platforms and all tasks** (Facebook, Nextdoor, and any future platform). It defines mandatory behavior when the agent encounters any sign of bot detection, authentication challenges, or human verification.

---

## Trigger Conditions — Stop Immediately If You See Any Of These

- Login page or login prompt (any form asking for email/password)
- CAPTCHA of any kind (image selection, text entry, checkbox "I'm not a robot", etc.)
- "Confirm your identity" or "Verify it's you" screens
- "We detected unusual activity" or similar security notices
- Account checkpoint or account locked screens
- "Are you a robot?" or any human verification challenge
- Rate limiting page or "You've been temporarily blocked"
- Any page that is not the expected platform content and asks for interaction to continue

---

## Mandatory Response — In This Exact Order

1. **Stop the task immediately.** Do not attempt to solve, bypass, dismiss, or interact with the challenge in any way.

2. **Do NOT:**
   - Attempt to solve a CAPTCHA
   - Click through a login form
   - Refresh and retry
   - Navigate away and try again
   - Continue scraping other groups/pages while the block is active

3. **Send a Telegram alert immediately**  if telegram is connected
   ```
   message tool: action=send, channel=telegram, target=1077288673
   ```
   **Message format:**
   ```
   🚨 Task Stopped — Detection/Login Wall
   📌 Platform: {Platform Name}
   ⚠️ Reason: {Brief description — e.g. "CAPTCHA appeared", "Login wall", "Bot detection notice"}
   🕐 Time: {current time}
   👉 Manual intervention required.
   ```

4. **End the task cleanly.** Save any leads already collected to the sheet before stopping (if safe to do so). Do not leave partial writes.

5. **Report back in the current session** with the same summary so Mike sees it in chat too.

---

## Rationale

Platform detection is a serious risk — attempting to bypass it can result in permanent account bans. The agent must treat any detection signal as a hard stop, not a retry trigger. Human intervention is always required to resolve these situations.

This rule takes precedence over all task instructions, time limits, and lead targets.
