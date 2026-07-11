# Browser Automation Rules (Learned 2026-06-22)

## General Principles:
- Always check browser state before acting (status, profiles, tabs).
- Prefer stable tab handles (labels, suggestedTargetId, tabId) over raw DevTools targetId.
- Read before you click: Use `action="snapshot"` on the intended `targetId`.
- Act narrowly, using refs from the latest snapshot. Avoid blind waits.
- Report real blockers (login, CAPTCHA, permissions, 2FA) and stop.

## Tab Hygiene:
- Reuse existing labeled tabs or tabs with matching URLs.
- Close duplicate tabs by `tabId`.
- Do not use bare numbers as `targetId`.

## Stale Ref Recovery:
- If an action fails with a stale ref, snapshot again on the same `targetId`, find the current control, and retry once.
- If UI is in a blocker state, report the blocker.

## Existing User Browser:
- Use `profile="user"` only when existing cookies/login matter.
- For `profile="user"`, omit `timeoutMs` on `act:type`, `evaluate`, `hover`, `scrollIntoView`, `drag`, `select`, and `fill` actions.

## Google Meet Notes:
- Treat camera/microphone permission screens as progress, not login failure.
- Click microphone option if voice is required.
- Report sign-in, 2FA, account chooser, or permission requests needing user approval.
- Use one labeled tab per meeting flow.
