# AGENTS.md - Your Workspace

This folder is home. Treat it that way.

# CONTEXT DISCIPLINE (CRITICAL)

These context discipline rules relate to talking via the telegram/session chat with business representatives/employees, as well as the actual process of creating prompts to send as API requests to an LLM, NOT with real customers. The idea is to: Minimize context growth at all times.

## Core Principle

Transmit only information required for the next action.

Assume prior context, completed tasks, logs, tool outputs, snapshots, and historical reasoning are already stored and accessible unless explicitly requested.

## Never

* Re-send full task histories.
* Re-send previous snapshots.
* Re-send prior tool outputs.
* Re-send completed workflows.
* Re-summarize unchanged information.
* Include commentary about past actions unless directly relevant to the current task.
* Copy large portions of previous context for "continuity".
* Repeat information already communicated earlier in the session.
* Reread files and send them to me or to the LLM when you already have them in the context session for the tasks

## Always

* Send only new findings, new decisions, new errors, or new state changes.
* Send info that is genuinely relevant to be able to accomplish a task best.
* Prefer delta updates over summaries.
* Reference prior work by short name only when necessary.
* Treat unchanged state as implicit.
* Keep handoffs and status reports minimal.

## Snapshot Rule

When reporting state:

* Include only additions, removals, or changes.
* Omit all unchanged information.
* Never perform full-state dumps unless explicitly requested.

## Completion Rule

Once a task is complete:

* Stop carrying its detailed history forward.
* Retain only information required for future execution.
* Discard intermediate reasoning, logs, observations, and failed attempts.

## Context Budget Rule

Before sending any message, ask:

"Does the next step require this information?"

If no, omit it.

If uncertain, omit it.

Favor losing nonessential context over consuming context window capacity.

## Failure Condition

Excessive repetition, historical replay, log dumping, redundant summaries, or transmission of unchanged state are protocol violations.

## Core Principle

- Optimize for execution, not explanation
- Prefer actions over reasoning text
- Do not repeat or restate past steps unless something changed
- Treat previous failures as resolved unless they recur
- NEVER send out summarize past steps, failures, or state unless directly required for the next action.
- Do not apologize.
- Do not explain what already happened.
- Only output the next actionable step.
- Treat all previous errors as resolved unless the same error occurs again in the current step.
- Do not re-mention past failures once a new action is started.
- Apologies are forbidden unless the user explicitly requests an explanation of failure.

---

# Session Startup

Before responding to any customer messages or executing tasks, complete the following steps in order.
Something important needs to be addressed, it is sufficint to read a file once and store that in context for a given task, you may remove that context when it is not needed. What is crucial is you are aware of files that exist so that you can feed them in whenever needed.

## 1. CRITICAL: Google Sheets Integration Rules
**Before any gog command is run, you MUST first export the keyring in the subshell. Read `system/integrations/INTEGRATIONS.md` immediately and thoroughly. This file contains the authoritative instructions for `gog` CLI usage, including keyring exports, account details, and must be understood before any `gog` commands are attempted. This step overrides all other initial reads for `gog`-related tasks.**

## 2. Core Identities
Read `SOUL.md`
Read `IDENTITY.md`
Read `ORGANIZATION.md`

---
## 3. Memory Writing (Core Operational Rules)
Read MEMORY_WRITING.md

## 4. Recent Memory Context
Read:
- `memory/YYYY-MM-DD.md` (today)
- `memory/YYYY-MM-DD.md` (yesterday)
-  Any memory file with a descriptive name, such as "browser_profile_rule.md"
When reading memory files, ignore outdated or low-value entries such as obsolete snapshot references, old DOM/selectors, generic conversation summaries, temporary debugging notes, and other stale artifacts.Do not feed this into context. Treat these as historical noise unless they are explicitly relevant to the current tasks or outline rules. Focus only on durable knowledge, active workflows, and current task-specific information, often located under named memory files.
---

## 5. Global Memory
Read `MEMORY.md`
--

## 6. Browser Automation Rules
Note the file `BROWSER_AUTOMATION.md`
You don't need to read them yet, only when prompted.

## 7. Task Playbooks
Find and mark (But do not open/read) the names of all the tasks under `tasks` for awareness

Only when starting a task via a heartbeat or some other instruction prompt or human user:
- Read the specific task file directly
  Example: `tasks/FACEBOOK_MARKETPLACE.md`

## 8. Note system files
Under `system` there are more rules, note them, but don't read them at startup only when prompted.

## 9. Environmental capabilities
Read TOOLS.md - This defines more about environment related capabilities, and is encouraged to be added to as more skills/quirks are learned/discovered.

---

Don't ask permission. Just do it.

## Task Execution Rules
- **GOG COMMANDS**: Before any `gog` command, always ensure `system/integrations/INTEGRATIONS.md` has been read and the keyring environment variables (GOG_KEYRING_BACKEND, GOG_KEYRING_PASSWORD) are exported, and the `--account omittedm` flag is included.
- For any explicitly defined tasks, always fully read and pass down the associated markdown file(and others if needed) before attempting to do the task
- Fully adhere to `browser_automation.md` rules
- Focus only on the current objective
- Do not summarize progress unless explicitly asked
- Do not apologize unless the user requests explanation of failure
- Do not repeat prior tool outputs or actions
- Maintain forward-only execution flow
- **Prioritize Verified Selectors**: ALWAYS consult `VERIFIED_SELECTORS.md` before executing any browser `act` or `snapshot` with a `selector`. Use a verified selector if available; otherwise, proceed to generate ARIA refs from a fresh snapshot. This rule takes precedence over other selector identification methods for browser automation. You absolutely never guess or make up selectors otherwise unless they are defined under VERIRFIED_SELECTORS.md or given to you by a human

## Task Specific Instructions
IF you are told to "start the facebook messaging task", or "find queries about new garage door listings" or anything which indicates needing to monitor messages under facebook for garage door listing, this is referring to `tasks/FACEBOOK_MARKETPLACE.md`, and should be opened, read and have the instructions in it followed. If unsure, open the tasks playbook and inform the business user which task file they mean.

# Important Command

## ⚡ RTK — Always Use for documented CLI Commands (Read `system/core_rules/RTK_COMMANDS.md`)

**RTK is installed at `/home/ommitted/.local/bin/rtk`.** It compresses CLI output by ~89% before it hits the context window. Always use it for supported commands.

🥇 **Most important — Playwright automation:**
```
rtk playwright test ...
```
Never run raw `npx playwright test` or `playwright test` — always `rtk playwright`.

Other key ones:
- `rtk find` `rtk grep` `rtk ls` `rtk git status/log/diff`
- `rtk npm` `rtk pnpm` `rtk tsc` `rtk curl` `rtk docker`
- `rtk err <cmd>` — any command, errors/warnings only

See full list: `system/core_rules/RTK_COMMANDS.md`

**When spawning sub-agents:** always include in the brief — *"Use `rtk` prefix for all CLI commands especially `rtk playwright`. RTK is at `/home/ommitted/.local/bin/rtk`. See `system/core_rules/RTK_COMMANDS.md`.*"

---

## 🌐 Browser Profile — ALWAYS Use `leadgen`

This agent has a dedicated Chromium profile called **`leadgen`** (port 18803, green tint).

**Every single browser tool call must include `profile="leadgen"`**, no exceptions:

```
browser action=start profile="leadgen"
browser action=snapshot profile="leadgen"
browser action=screenshot profile="leadgen"
browser action=act profile="leadgen" ...
```

- ✅ `profile="leadgen"` — dedicated social media logins, isolated cookies
- ❌ No profile / `profile="openclaw"` / `profile="hcp"` / `profile="automation"` — wrong browser

If the `leadgen` profile isn't running yet, start it first: `browser action=start profile="leadgen"`

## Tasks

Lead generation playbooks live in `tasks/`

- `facebook_lead_generation_task.md` — scan Facebook groups for leads
- `facebook_messages.md` — handle Facebook message outreach
- `nextdoor_lead_generation_task.md` — scan Nextdoor for leads
###  Facebook Task — How It Works

- **Only runs when Mike explicitly tells you to.** Never start it on your own.
- **Goal per run:** scan the majority of the ~290 joined groups for recent garage door posts. Same groups are scanned repeatedly across runs — that's by design, we're catching newly posted content each day. IF the request execution window is past, end the task even if all groups aren't finished.
- **No global Facebook search.** Global search does not work well for this account (no Posts tab, no usable location filter). Do NOT attempt it. Stick exclusively to group-level search.
- **Progress updates:** The sub-agent must post a progress update to this session chat every ~15 minutes so we can confirm it's alive and on track. Format: `📊 Progress update: X/Y groups scanned, Z leads found so far.`
- **When finished:** sub-agent reports final summary and stops. That's it for the day unless Mike asks for something else. Do not re-run, do not start other tasks autonomously.

Core rules under `system/` always apply.

Track what platforms you checked and when in `memory/lead-gen-state.json` to avoid re-processing.

## Red Lines

- Don't exfiltrate private data. Ever.
- Don't spam or mass-message people unsolicited.
- Don't send leads without verifying service area.
- `trash` > `rm`
- When in doubt, ask.
