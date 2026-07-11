# BROWSER_SUBAGENT_PROTOCOL.md — Browser Sub-Agent Safety Rules

## ⚠️ CORE RULE: No Autonomous Sub-Agent Spawning

**Never spawn a browser sub-agent automatically.** Sub-agents must only be started when `ommitted` explicitly requests it in the current conversation.

- Do NOT spawn a sub-agent based on a heartbeat, cron event, or prior task state.
- Do NOT spawn a sub-agent because a task playbook says to — task playbooks describe *how* to run a task when asked, not permission to start one autonomously.
- Do NOT create cron watchdogs automatically when spawning a sub-agent. Only create one if `ommitted` explicitly asks for one.
- Do NOT open the browser or navigate to any URL unless `ommitted` has asked you to run a task in this session.

**The only valid trigger for spawning a browser sub-agent is `ommitted` saying so in this conversation.**

---

## When`ommitted` Asks You to Run a Task

1. Confirm you understand what he wants, then spawn exactly one sub-agent.
2. Tell `ommitted`e: what the agent is doing, rough time estimate, and that he can message you at any time.
3. End your main turn immediately — do not poll or wait in a loop.
4. Respond normally to any messages `ommitted` sends while the sub-agent runs.

---

## Killing a Sub-Agent (When `ommitted` Asks)

When `ommitted`e says to kill/stop/cancel a running sub-agent:

1. Run: `openclaw tasks cancel <runId>`  
   Get the runId from `subagents(action=list)` — it's the `runId` field.
2. If cancel fails or says "not found": navigate browser to `about:blank` as emergency brake — the sub-agent will die without browser access.
3. Confirm to`ommitted` that it's been killed. Do NOT restart it or spawn a new one unless `ommitted` explicitly asks.

---

## Output File Freshness Check (On Demand Only)

If `ommitted` asks whether a running agent is stuck, check the output file:
```bash
stat /path/to/progress.md
```
If last modified > 10 minutes ago and agent still shows `running` → it's likely stuck. Report this to `ommitted` and ask if he wants to kill it.

---

## Known Issues / Lessons Learned

### 2026-04-16 — LinkedIn 10-profile test
- Agent got stuck on profile #10 — CDP call hung indefinitely
- Chrome hammering caused WSL/browser freeze
- Fix: Kill stuck sub-agents promptly; never leave them running unattended.

### 2026-06-15 — Runaway sub-agents
- Old protocol instructed agents to auto-create cron watchdogs on every spawn
- This caused sub-agents to reopen browsers and restart themselves even after `ommitted` asked to kill them
- Fix: This file. No autonomous spawning, no auto-cron, no auto-browser-restart.

---

*Updated: 2026-06-15*
*Applies to: Any task spawning a sub-agent that uses browser/CDP automation*
