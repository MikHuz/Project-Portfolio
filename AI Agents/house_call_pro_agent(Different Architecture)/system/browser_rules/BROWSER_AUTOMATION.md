# CORE PRINCIPLE
## Name identifies.
## Ref acts.

## Always rediscover UI elements using:

- Visible text / labels
- Accessibility properties (role, aria-label, aria-labelledby, name, placeholder)
- Semantic structure (forms, headings, sections, landmarks)
- Spatial / visual layout (top nav, sidebar, modal footer, primary CTA area, card patterns)
- Consistent patterns across similar pages (e.g., "save button is usually the primary button in the form footer")

## Prefer stable snapshot formats:
- `--format aria` or `refs="aria"` for more persistent `axN` refs (binds better to DOM via Playwright when available)
- Use role/name information from aria snapshots to identify elements. Actions should still use snapshot refs.

## Strictly avoid relying on:
- Numeric refs from old snapshots (`12`, `e12`, etc.) without fresh validation
- DOM indices, CSS selectors, XPath, or hierarchy paths
- Pixel coordinates or single-run observations
- Previously observed element paths unless explicitly re-validated in the current snapshot

# SNAPSHOT STRATEGY (CRITICAL FOR STABILITY)

After every snapshot, explicitly identify both:
- Semantic description
- Current ref

Example:

First Name textbox -> ax504
Last Name textbox -> ax508
Save button -> ax612

Only refs from the most recent snapshot may be used for actions.

If the same interaction fails with 3 different fresh refs obtained from 3 separate snapshots:

- Stop retrying.
- Investigate page state.
- Verify the element still exists.
- Verify the dialog/page is still open.
- Consider browser-tool or automation-harness failure.
- Escalate in the report rather than continuing retries.

Before any complex action or when the page may have changed:
1. Take a fresh snapshot (`openclaw browser snapshot --format aria --labels` or equivalent interactive/role mode)
2. Analyze the accessibility tree for semantic matches
3. Cross-reference visible text and layout
4. Only then select refs for interaction

Re-snapshot after any significant UI change (form submit, modal open, navigation, SPA update).

# EXECUTION STRATEGY

IMPORTANT: Role, name, label, placeholder, and visible text are ONLY for identifying the correct element in the snapshot.

The actual browser action MUST use the ref returned by the current snapshot.

### Example:
Snapshot:
- textbox "First Name" -> ax504

### Correct:
type(ref="ax504")

### Incorrect:
type(ref="First Name")
type(ref="First Name textbox")
type(ref="textbox named First Name")

Never substitute an element's label, name, role, placeholder, or description in place of a ref.

For every action:
- State the goal element semantically ("the primary 'Save Changes' button in the modal footer")
- Scan the current snapshot for candidates using role + name + visible text + location
- Validate match before acting
- If ambiguous → broaden search (e.g., "any button containing 'Save'") or re-snapshot instead of guessing

Never click/type based on assumption or stale memory.

# MEMORY SYSTEM (CRITICAL FOR LONG-TERM EFFICIENCY)

You may persist knowledge **only** in `Memory.md` (or equivalent long-term memory file).
Write under its section "## Technical Browser Navigation"
## Allowed & encouraged to write:
- Reliable navigation flows ("Settings → Billing → Invoices → Download works consistently")
- UI structure patterns ("Primary action buttons are usually in the bottom-right of modals / forms")
- Stable field schemas ("Lead form consistently contains: Full Name, Phone, Email, Address, Company")
- Reliable heuristics ("Search input is labeled 'Search' or has placeholder 'Find records...'")
- Recovery patterns ("When 'Save' button is disabled, check validation errors in .error class near form")
- Snapshot best practices that worked ("aria format gives more stable refs on this domain after reload")
- Confirmed anti-patterns ("Avoid relying on sidebar collapse state — always expand first")

## Forbidden to write:
- Raw DOM selectors, XPath, CSS paths, or numerical ref identifiers
- Single-session / one-off observations
- Unverified assumptions or raw refs

Never store refs, ax identifiers, or snapshot-derived element IDs in memory, session notes, summaries, or reports under memory folder
Never store refs, ax identifiers, or snapshot-derived element IDs in memory, session notes, summaries, or reports under memory folder.
Refs are valid only for the current snapshot.

Refs are valid only for the current snapshot.
# MEMORY UPDATE RULE (ANTI-NOISE + LEARNING)

Before writing to `Memory.md`:
1. The pattern MUST have been observed **at least twice** in separate sessions/runs, OR
2. A failure occurred and the corrected approach was successfully verified, OR
3. It is a high-value generalization not already present

Always:
- Consolidate duplicates
- Overwrite or update outdated entries (mark with date if needed)
- Prefer concise, actionable entries
- After writing, note in the current task log: "Added/Updated Memory.md entry: [short description]"

# TASK ISOLATION

Each browser automation task maintains **task-local state only**:
- Current progress
- Temporary UI findings from this session
- Intermediate data

Do **not** pollute global `Memory.md` with live discovery task-specific details. Only extract generalized, reusable patterns at the end of the task (or when a clear insight emerges).
Never store refs, ax identifiers, or snapshot-derived element IDs in memory, session notes, summaries, or reports under memory folder

# LEARNING & DOCUMENTATION RULE

Your goal is to progressively reduce rediscovery cost across sessions while keeping memory clean and high-signal.

At the end of each task (or after discovering something useful):
- Review what worked reliably
- Generalize into a reusable pattern
- If qualified, add to `Memory.md`
- Summarize in task notes: "Key learning: [one-liner] → added to memory"

This creates compounding efficiency with no prior context needed in future runs. IF you find nothing OR if the current instructions worked well, don't waste time trying to reason what to add.

# ERROR HANDLING & RECOVERY

If an element cannot be found or a ref is stale:

1. Re-snapshot immediately.
2. Locate the element again in the NEW snapshot.
3. Record the NEW ref.
4. Use ONLY the NEW ref.

Do not reuse old refs.
Do not use labels, names, placeholders, or natural-language descriptions as refs.

NEVER retry stale refs without re-snapping.

# TASK GOAL AWARENESS

Maintain strong awareness of the current task goal (e.g., `next_door_lead_gen`). Use past memory patterns as heuristics only — validate everything in the live session. IF the current instructions worked well, don't waste time trying to reason what to add.


Each run is a fresh environment. Memory accelerates discovery, it does not replace it.

