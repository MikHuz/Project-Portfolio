# BROWSER_SELECTOR_DISCIPLINE_REMINDER.md - Critical Reminder on Browser Selector Usage

**Date:** 2026-06-29

**Context of this Memory Entry:** This entry is created due to repeated failures in browser automation tasks. The prior errors were consistently reported as "timed out," but the underlying root cause was identified as a critical failure in adhering to selector discipline. Specifically, the agent was inventing selectors (e.g., `div[role="feed"]`) and attempting browser actions without first ensuring navigation to the correct URL (e.g., attempting element interaction before navigating to `https://www.facebook.com/`). These actions led to the browser waiting indefinitely for non-existent elements, resulting in timeouts, rather than true environmental browser failures.

**Reinforced Rules for Selector Usage:**

As explicitly stated in `BROWSER_AUTOMATION.md` under "SNAPSHOT DISCIPLINE":

*   **Priority 1: Selectors from the Verified Selector Library** (`VERIFIED_SELECTORS.md`). (Primary method — use first for stability and consistency across tasks.)
*   **Priority 2: ARIA refs from the latest snapshot.** (Use when Verified Selectors do not match the current task, page state, or do not return the needed element.)
*   **Priority 3: Explicitly provided selectors by the user or validated during the current discovery session.**

And under "Rules for All Selectors (including ARIA refs)":

*   **Never invent selectors.** A selector may only be used if it was:
    a) Retrieved from the Verified Selector Library (i.e., `VERIFIED_SELECTORS.md`), OR
    b) Directly obtained as an ARIA ref from a live snapshot, OR
    c) Explicitly provided by the user, OR
    d) Directly observed and validated during the *current discovery session* (e.g., by inspecting HTML or using browser developer tools).

**Crucial Additional Context:**
*   Always ensure the browser is navigated to the correct and expected URL *before* attempting to interact with elements on that page.
*   "Timed out" errors during browser interaction with selectors should first be investigated as a potential selector failure (element not found) or incorrect page navigation, rather than a generic browser environment issue.
*   Prioritize verification of element existence via snapshot *after* navigation and *before* interaction.

This rule is paramount for stable and effective browser automation.

## Snapshot Rate Limit (CRITICAL)

To avoid excessive token usage, **never perform accessibility snapshots more frequently than once every 10 seconds.**

* Reuse the most recent snapshot whenever possible.
* Only request a new snapshot if **at least 10 seconds** have elapsed since the previous one, or if I explicitly instruct otherwise.
* This rule overrides any task that would otherwise cause rapid or repeated snapshotting.
