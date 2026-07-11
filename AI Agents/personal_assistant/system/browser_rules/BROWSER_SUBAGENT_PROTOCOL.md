# BROWSER_SUBAGENT_PROTOCOL.md — Browser Sub-Agent Safety Rules

## The Problem
Browser sub-agents using CDP/mcporter can:
- Get stuck on a hanging CDP call and never finish
- Never send a completion event, leaving the main session silently idle
- Hammer Chrome/WSL with continuous CDP calls, freezing the machine
- Run indefinitely without any watchdog to kill them

This file defines mandatory protocol for ANY task that spawns a sub-agent to do browser work.

---

## Rule 1: Always Set a Cron Watchdog When Spawning a Browser Sub-Agent

**Immediately after** spawning a browser sub-agent, create a cron job to fire after a reasonable timeout.

### Timeout guidelines:
| Task scope | Max expected runtime | Watchdog fires at |
|---|---|---|
| 1–10 profiles | 15 minutes | 20 minutes |
| 11–50 profiles | 45 minutes | 60 minutes |
| 51–100 profiles | 90 minutes | 110 minutes |
| 100+ profiles | Session-based | Every 30 min check |

### Watchdog cron payload:
The cron should fire a systemEvent into the MAIN session like:
> "⚠️ WATCHDOG: Browser sub-agent [runId] has been running for [N] minutes. Check if it's still alive or stuck. Run: subagents(list) and kill if still running. Then check output files for partial results."

Use `sessionTarget: "main"` with `payload.kind: "systemEvent"`.

---

## Rule 2: After Spawning — Tell the User Explicitly

After spawning a browser sub-agent, ALWAYS tell the user:
1. What the agent is doing
2. How long it should take (estimate)
3. That you've set a watchdog and will alert them if it gets stuck
4. That they can message you at any time and you'll respond normally

Do NOT just say "I'll post results when done" and go silent.

---

## Rule 3: Output File Freshness = Liveness Check

For browser tasks that write incrementally, the output files are the heartbeat.

When checking if an agent is stuck:
```bash
# Check when the progress file was last modified
stat /path/to/progress.md

# If last modified > 10 minutes ago and agent still running → it's stuck
```

If the last write was more than 10 minutes ago and the agent is still in `subagents list` → it's stuck. Kill it.

---

## Rule 4: Kill Procedure

When killing a stuck browser sub-agent:

1. Kill the sub-agent:
   ```
   subagents(action=kill, target=<runId>)
   ```

2. Check browser status — it may be in a bad state:
   ```bash
   openclaw browser status
   ```

3. If Chrome seems hung or the browser is behaving oddly, restart it:
   ```bash
   openclaw browser stop
   openclaw browser start
   ```

4. Check what partial output was written before the hang:
   ```bash
   cat dynamic_output/network_intelligence/*progress*.md
   ```

5. Report to user: what was completed, where it got stuck, and next steps.

---

## Rule 5: After Any Browser Sub-Agent Completes or Is Killed

Always do a quick sanity check:
```bash
openclaw browser status
```

If `running: false` → restart it for the next task.
If `running: true` → verify it's responsive (take a quick screenshot or navigate to a blank page).

---

## Template: Spawning a Browser Sub-Agent Safely

```
1. Spawn sub-agent with runTimeoutSeconds set (e.g. 1200 for 20 min)
2. Immediately create cron watchdog (see Rule 1)
3. Tell user: "Agent running, watchdog set for X min, I'll alert you if stuck"
4. Respond normally to any messages in the meantime
5. When completion event arrives OR watchdog fires → check output, report results, kill cron
```

---

## Known Issues / Lessons Learned

### 2026-04-16 — LinkedIn 10-profile test
- Agent ran 28 min on a task that finished (9/10 profiles) at ~9 min
- Got stuck on profile #10 — CDP call hung, agent waited indefinitely
- No watchdog was set → main session went silent, user had to intervene
- Chrome hammering caused WSL/browser freeze
- **Fix applied:** This protocol file created. Always set watchdog cron going forward.

---

*Created: 2026-04-16*
*Applies to: Any task spawning a sub-agent that uses browser/CDP/mcporter*
