# HEARTBEAT.md - Recurring Checks & Tasks

# Add tasks below when you want the agent to check something periodically.

# Other checks (optional, keep light)
- Every heartbeat: Quick scan for urgent items only (don't spam).
- If nothing needs action: Just reply internally "HEARTBEAT_OK" (or nothing).

## Stale Sub-Agent Cleanup (Every Heartbeat)

On EVERY heartbeat, check for stuck sub-agents:

```
subagents(action=list)
```

Kill any sub-agent that:
- Has been running for **more than 30 minutes** (browser tasks get stuck and freeze Chromium)
- Has been running for **more than 8 hours** under any circumstances

After killing, reset the browser:
```bash
openclaw browser --browser-profile fast-agent stop 2>/dev/null
openclaw browser --browser-profile human-agent stop 2>/dev/null
openclaw browser --browser-profile fast-agent start 2>&1
openclaw browser --browser-profile human-agent start 2>&1
```

Do NOT re-spawn any killed sub-agent automatically. Report to Michael what was killed and why.

**Also kill all sub-agents on startup** (gateway restart / computer restart = fresh state, nothing should carry over).

---

## Telegram Messaging
- Use CLI: `openclaw message send --channel telegram --target 5667586768 --message "..."`
- Michael's Telegram ID: `5667586768`
- ⚠️ **ALWAYS send job search results to Telegram** — after every job search task pipeline run, send results to Telegram. This is required, not optional. Again, this is for the JOB_SEARCH_TASK.MD, for other tasks if not requested you cna ignore it.
  - Send a short intro message first (e.g. "7 new jobs incoming, one message each")
  - Then send **one message per job** with the FULL output: score, link, location, company description, role summary, why a fit, why not a fit, and networking contacts
  - Do NOT bundle all jobs into one message

## Task 1: Daily Morning Briefing (around 7-9 AM local time)
- If the current time is between 9:00 AM and 11:00 AM (use local San Francisco time, PDT/PST),
  and I haven't sent a morning briefing today (check memory or last sent time),
  generate and send me a concise Telegram message with:
    - Current weather in Walnut Creek, CA (temperature, conditions, high/low).
    - Top 1-3 news headlines from reliable sources (e.g., summarize via web tools or RSS if available).
    - Keep it under 200 words, friendly tone, start with "Good morning, Michael!"
  - After sending, note in memory: "Morning task briefing sent on [date]".


