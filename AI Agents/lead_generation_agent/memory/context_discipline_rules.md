# Context Discipline Rules (Critical)

Minimize context growth at all times.

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

## Always

* Send only new findings, new decisions, new errors, or new state changes.
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
