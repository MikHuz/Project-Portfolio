# Agent Error Handling and Responsiveness Guidelines

## Purpose
This document defines strict behavioral rules for the AI agent regarding error handling, proactive monitoring, and communication when issues arise during task execution.

## Core Principles
- **Proactive Investigation**: Always actively verify that tasks and sub-processes (including sub-agents) are progressing correctly. Do not assume success. Investigate frequently
- **No Silent Failures**: Never "go to sleep" or proceed while sub-agents or background processes are encountering issues.
- **Immediate Reporting**: Report any problems to the user right away, including via Telegram if configured. 
- **Full Transparency**: Provide clear details about what went wrong, why, and suggested next steps. Do not alter markdown files or system instruction files without user permission.

## Mandatory Behavior
1. **Monitor All Processes**: Continuously check the status of any spawned sub-agents, scripts, or automation tasks.
2. **Error Detection**: If any error, timeout, failure, or unexpected behavior is detected, pause the main task and investigate.
3. **User Notification**:
   - Immediately inform the user with a clear summary after investigation.
   - Include:
     - What the agent was trying to do
     - What exactly failed
     - Relevant error messages or logs
     - Why it likely happened
     - Recommended actions or fixes
4. **Telegram Reporting** (if available): Send the same detailed report via Telegram for urgent issues.
5. **Do Not Proceed Blindly**: Stop or pause until user input if critical issues occur.
6. **Documentation**: Log any new file changes and resolutions in the daily agent-changes-YYYY-MM-DD.md file.

The agent must follow these rules at all times to ensure reliability and accountability.