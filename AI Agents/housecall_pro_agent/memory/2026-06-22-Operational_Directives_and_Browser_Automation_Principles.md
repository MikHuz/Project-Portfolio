# Memory Log for 2026-06-22 - Key Operational Directives and Browser Automation Principles

**Purpose:** This memory file was created at the request of the human to consolidate and highlight critical operational directives from `AGENTS.md` and `BROWSER_AUTOMATION.md`. Its goal is to provide essential context and rules for future session models that start without prior conversational history.

## Core Operational Directives (from AGENTS.md)
These rules govern my general behavior and interaction patterns, emphasizing efficiency and clarity.

- **Optimize for execution, not explanation.** My primary goal is to perform actions directly and effectively, minimizing extraneous commentary.
- **Prefer actions over reasoning text.** I should always prioritize taking a step over explaining my thought process, unless specifically asked.
- **Do not repeat or restate past steps unless something changed.** This prevents redundant information and keeps the interaction focused on progress.
- **Treat previous failures as resolved unless they recur.** I should not dwell on past issues once new actions are initiated.
- **NEVER summarize past steps, failures, or state unless directly required for the next action.** This is a critical rule to maintain forward momentum and concise communication.
- **Do not apologize.** Unless the human explicitly requests an explanation of a failure, apologies are to be avoided to maintain a direct and action-oriented tone.
- **Do not explain what already happened.** Focus on the next actionable step.
- **Only output the next actionable step.** My responses should be lean and directly guide the workflow.
- **Treat all previous errors as resolved unless the same error occurs again in the current step.** This reinforces the forward-only execution flow.
- **Apologies are forbidden unless the user explicitly requests an explanation of failure.**

## Task Execution Rules (from AGENTS.md)
These rules guide how I approach and execute specific tasks.

- **Focus only on the current objective.** Maintaining a narrow focus helps prevent scope creep and ensures efficient task completion.
- **Do not summarize progress unless explicitly asked.** Again, this minimizes unnecessary output and keeps the conversation efficient.
- **Do not apologize unless the user requests explanation of failure.** Consistency in avoiding apologies is key.
- **Do not repeat prior tool outputs or actions.** This prevents redundancy and ensures I'm always presenting new information or actions.
- **Maintain forward-only execution flow.** Every step should build on the previous one, driving towards the task goal.

## Memory Logging Rules (from AGENTS.md)
These guidelines dictate when and what kind of information should be preserved in memory files, ensuring long-term memory remains high-signal and free of transient data.

- **Create a new memory markdown file ONLY when one of the following occurs:**
    - A new rule is discovered that should change future behavior.
    - A new workflow is discovered that should be reused later.
    - A significant bug, limitation, or failure mode is discovered.
    - A meaningful system behavior is confirmed through testing.
    - Information is likely to remain useful across future sessions.
- **Do NOT create memory files for:** session summaries, task summaries, commentary, progress updates, routine actions performed, temporary observations, status reports, thought processes, plans that were not validated, or information already stored elsewhere. This prevents memory bloat with low-value data.
- **Memory files must contain only durable facts, rules, discoveries, or verified behaviors.** The content should be evergreen and universally applicable.
- **Do NOT include:** AX references, Element IDs, Ref numbers, Snapshot identifiers, Transient UI details, Conversation logs, Click-by-click histories, Execution timelines. These are ephemeral and specific to a single execution, not durable knowledge.
- **Default to NOT creating a memory file.** A missing memory file is preferable to a low-value memory file. This is a critical principle for maintaining memory quality.

## Browser Automation Principles (from BROWSER_AUTOMATION.md)
These are the foundational rules for reliable and robust interaction with web UIs, especially critical for House Call Pro automation.

### General Browser Automation Principles
- **Name identifies. Ref acts.** This is a core mantra: semantic descriptions are for identification, but the actual browser action must use the generated reference from the snapshot.
- **State Change Verification is MANDATORY.** After *any* action that is expected to alter the UI state (e.g., clicks, navigation, form submissions), I *must* pause and verify the new state using multiple conditions (titles, unique elements, absence of loaders, no errors). This prevents proceeding on a false assumption about the UI.
- **Always rediscover UI elements semantically.** I must identify elements based on visible text, labels, accessibility properties (role, aria-label), and overall page structure. This provides resilience against minor UI changes.
- **Prefer stable snapshot formats like `--format aria` or `refs="aria"`.** These formats tend to generate more robust and persistent references (`axN` refs) for Playwright actions.
- **Strictly avoid relying on ephemeral or fragile selectors.** This includes numeric refs from old snapshots, DOM indices, CSS selectors, XPath, pixel coordinates, or single-run observations. These are highly prone to breaking with even minor UI updates.

### Snapshot Strategy (Critical for Stability)
- **Explicitly identify Semantic Description and Current Ref after every snapshot.** This ensures I have a clear, actionable reference for subsequent steps.
- **Only refs from the most recent snapshot are valid.** Old refs are stale and must not be reused. If an element cannot be found, a *new* snapshot is the first step, not retrying with an old ref.
- **If an interaction fails with 3 different fresh refs, halt and escalate.** This indicates a deeper problem than just a stale reference, possibly a fundamental change in the UI or a tool issue.
- **A fresh snapshot is required before any complex action or suspected page change.** This ensures my understanding of the UI is always current.

### Execution Strategy
- **Semantic identification is *only* for finding the element; the `ref` is *always* for the action.** I must never use a semantic description (like "First Name textbox") directly as a `ref` in a browser action.
- **Every action requires semantic goal identification and current snapshot validation.** This disciplined approach prevents blind clicks and ensures I'm interacting with the correct element.
- **Avoid guessing; broaden search or re-snapshot if ambiguous.** Precision is paramount in UI automation.

### Memory System for Browser Automation (Critical for Long-Term Efficiency)
- **Knowledge persistence is limited to `MEMORY.md` under "## Technical Browser Navigation".** This section is dedicated to durable, generalized patterns, not transient details.
- **Only *reliable* and *generalized* patterns are allowed.** This includes stable navigation flows, UI structure patterns, consistent field schemas, robust heuristics, and effective recovery patterns. Raw DOM selectors or ephemeral refs are strictly forbidden.
- **Never store refs, ax identifiers, or snapshot-derived element IDs in memory.** These are dynamic and not suitable for long-term knowledge.

### Memory Update Rule (Anti-Noise + Learning)
- **Updates to `MEMORY.md` require specific triggers:** either a pattern observed at least twice, a successfully verified correction after a failure, or a high-value generalization not already present. This maintains the high-signal nature of `MEMORY.md`.
- **Always consolidate, update, and prefer concise entries.** This keeps `MEMORY.md` organized and actionable.

### Task Isolation
- **Browser automation tasks maintain local state only.** `MEMORY.md` should not be polluted with task-specific, transient details. Only generalized, reusable patterns are extracted at the end of a task.

### Error Handling & Recovery
- **Immediate re-snapshot and new ref acquisition upon stale ref.** This is the primary recovery mechanism for UI element issues.
- **NEVER retry stale refs without re-snapping.** This is a hard rule to prevent fruitless attempts with invalid references.

### Task Goal Awareness
- **Maintain strong awareness of the current task goal.** While memory provides heuristics, live validation of the UI is always necessary.
- **Memory accelerates discovery but does not replace live validation.** Each run is a fresh environment, and assumptions must be verified.
