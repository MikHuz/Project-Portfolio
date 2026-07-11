# HEARTBEAT.md — Doorgi Messaging Agent

Run this on every heartbeat OR upon first session startup. productively. Do **not** automatically reply `HEARTBEAT_OK` without first completing the workflow below.

## Heartbeat Workflow

On every heartbeat OR on first session startup:

1. Ensure the `messaging` browser profile is running, and facebook is open and has a logged in session
2. Do **not** spawn a sub-agent. All heartbeat work must be performed in the main session.
3. Load `memory/heartbeat-state.json` to determine the last completed checks and previously reported events.
4. Review the **Tasks** section defined below and execute any tasks that are due.
5. Update `memory/heartbeat-state.json` with any new state (conversation IDs, message IDs, timestamps, last run times, etc.).
6. If no action is required after completing all due tasks, reply only:

```
HEARTBEAT_OK
```

---

## General Rules

* Keep browser actions minimal and efficient.
* Do not perform unnecessary work if nothing has changed.
* Do not generate duplicate notifications.
* Restore the expected browser page if it has navigated elsewhere or was closed.
* Keep heartbeat work concise to minimize token usage.
* Each task is responsible for maintaining any state it requires inside `memory/heartbeat-state.json`.

---

## Memory Maintenance

Periodically (every few days), when no higher-priority work is pending:

1. Review recent `memory/YYYY-MM-DD.md` files.
2. Identify important long-term information.
3. Update `MEMORY.md` with distilled knowledge.
4. Remove outdated or obsolete information from `MEMORY.md`.

Think of the daily memory files as a journal, and `MEMORY.md` as long-term knowledge.

---
# Tasks

The following tasks are evaluated during every heartbeat. A heartbeat **does not** mean every task is executed. Each task is responsible for determining whether it should run based on its own schedule, stored state, or explicit instructions.

## Task 1: Facebook Marketplace

### HEARTBEAT MODE ONLY

**This is NOT the full Facebook Marketplace workflow.**

During heartbeat polling your **only responsibility** is to monitor for **new Marketplace messages**. **Do not perform customer handling. Do not execute the normal Marketplace task.**

**Specifically:**

* **DO NOT reply to any customers.**
* **DO NOT generate draft responses.**
* **DO NOT perform follow-up logic.**
* **DO NOT execute any response workflow described in `FACEBOOK_MARKETPLACE.md`.**
* **DO NOT spawn a sub-agent.**

The heartbeat is **only** checking whether a new customer message has arrived, via the blue dot icon.

### Procedure

1. Read `tasks/FACEBOOK_MARKETPLACE.md` (and any files it references) **only if you have not already loaded them during this session.** If the file cannot be found, **STOP** this task and notify a business user.
2. Open Messenger and switch to the **Marketplace** tab as it instructs.
3. Scan only for **new unread Facebook Marketplace garage door listing conversations**.
4. **Do not run the full Marketplace task.** Only determine whether a new customer message has arrived since the previous heartbeat.
5. If a **new unread customer message** (blue dot) is detected:
   * Send a Telegram notification to the connected user.
   * Include the customer's name and a brief summary of the latest message.
   * **Do not open a reply box or send any response.**
6. Record the last processed message timestamp or ID in `memory/heartbeat-state.json`.
7. If no new messages are detected, respond only:
 * Send a Telegram notification to the connected user that no new messages are seen.

```
HEARTBEAT_OK. No new messages detected.
```

8. Regardless of the result, leave Messenger open on the **Marketplace** conversation list so future heartbeat checks can quickly scan for new messages without navigating back.
