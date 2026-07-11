# Memory

You wake up fresh each session. These files are your continuity:

- **Daily notes:** `memory/YYYY-MM-DD.md` or named files(create `memory/` if needed) — raw logs of what happened
- **Long-term:** `MEMORY.md` — your curated memories, like a human's long-term memory

Capture what matters that actually matters. Decisions, context, things to remember. Skip the secrets unless asked to keep them.

### 🧠 MEMORY.md - Your Long-Term Memory

- **ONLY load in main session** (direct chats with your human)
- **DO NOT load in shared contexts** (Discord, group chats, sessions with other people)
- This is for **security** — contains personal context that shouldn't leak to strangers
- You can **read, edit, and update** MEMORY.md freely in main sessions
- Write significant events, thoughts, decisions, opinions, lessons learned
- This is your curated memory — the distilled essence, not raw logs
- Over time, review your daily files and update MEMORY.md with what's worth keeping

### 📝 Write It Down - No "Mental Notes"!

- **Memory is limited** — if you want to remember something, WRITE IT TO A FILE
- "Mental notes" don't survive session restarts. Files do. Write it in directory made for this purpose, likely under /memory. DO NOT write to dynamic output directory for your memory tasks, that is for the human's reference, not your memory.
- When someone says "remember this" → update `memory/YYYY-MM-DD.md` or relevant file
- When you learn a lesson → update `AGENTS.md`, `TOOLS.md`, or the relevant skill
- When you make a mistake → document it so future-you doesn't repeat it
- **Text > Brain** 📝
## Memory

You wake up fresh each session. These files are your continuity:

- **Daily notes:** `memory/YYYY-MM-DD.md` (create `memory/` if needed) — raw logs of what happened
- **Long-term:** `MEMORY.md` — your curated memories, like a human's long-term memory

Capture what matters. Decisions, context, things to remember. Skip the secrets unless asked to keep them.

### 🧠 MEMORY.md - Your Long-Term Memory

- **ONLY load in main session** (direct chats with your human)
- **DO NOT load in shared contexts** (Discord, group chats, sessions with other people)
- This is for **security** — contains personal context that shouldn't leak to strangers
- You can **read, edit, and update** MEMORY.md freely in main sessions
- Write significant events, thoughts, decisions, opinions, lessons learned
- This is your curated memory — the distilled essence, not raw logs
- Over time, review your daily files and update MEMORY.md with what's worth keeping

### 📝 Write It Down - No "Mental Notes"!

- **Memory is limited** — if you want to remember something, WRITE IT TO A FILE
- "Mental notes" don't survive session restarts. Files do. Write it in directory made for this purpose, likely under /memory. DO NOT write to dynamic output directory for your memory tasks, that is for the human's reference, not your memory.
- When someone says "remember this" → update `memory/YYYY-MM-DD.md` or relevant file
- When you learn a lesson → update `AGENTS.md`, `TOOLS.md`, or the relevant skill
- When you make a mistake → document it so future-you doesn't repeat it
- **Text > Brain** 📝

# Memory Logging Rules

Built on your context discipline rules, memory files are for durable knowledge only. It should only be knowledge that may aid future sessions in accomplishing tasks better and faster without hurdles.

Create a new memory markdown file ONLY when one of the following occurs:
* A new rule is discovered that should change future behavior.
* A new workflow is discovered that should be reused later.
* A significant bug, limitation, or failure mode is discovered.
* A meaningful system behavior is confirmed through testing.
* Information is likely to remain useful across future sessions with or without current context.

Do NOT create memory files for:

* Session summaries
* Task summaries
* Commentary
* Progress updates
* Routine actions performed
* Temporary observations
* Status reports
* Thought processes
* Plans that were not validated
* Information already stored elsewhere

Memory files must contain only durable facts, rules, discoveries, or verified behaviors. They must be short but impactful, not text  narrations.

For browser related documentation work, when deciding to create a new memory file entry, they do NOT include:

* AX references (ABSOLUTELY NEVER INCLUDE THESE)
* Element IDs
* Ref numbers (ABSOLUTELY NEVER INCLUDE THESE)
* Snapshot identifiers
* Transient UI details
* Conversation logs
* Click-by-click histories
* Execution timelines
* Summaries of our conversations unless they are directly relevant for context that address an issue
* Internal thinking processes 
## ABSOLUTELY DO NOT WRTIE DOWN SESSION SUMMARIES OR ACTUAL PASTED MESSAGE THREADS OR INTERNAL THINKING PROCESSES PROCSSES.

Examples that may be included:
*Search textbox labeled "Search Nextdoor"
*Primary blue "Create Lead" button
*Customer Name field inside Customer Details section

Bad Example 1:

"Clicked New Customer, filled form, Save button was ax502."(NEVER say temporary snap references)

Bad Example 2:

"Today I worked on customer creation and did this task and...*info that doesn't actually aid*"

Good Example 1:

"HCP customer creation requires verifying the customer detail page after save."

Good Example 2:

"Nextdoor search filters may reset between searches and must be re-verified."

A missing memory file is preferable to a low-value memory file. Memory files should be small.

### IF you still see any numerical ax/ref mentions in any file including the memory file, DO NOT use these for your browser automation work, and delete them from the text reference if you encounter it.

