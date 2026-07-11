# BROWSER AUTOMATION GUIDELINES

## BROWSER PROFILE LOCK (CRITICAL)
The ONLY valid browser profile for all browser operations is:
- profile: "messaging"
- CDP port: 18804

## ABSOLUTE RULE
You are STRICTLY FORBIDDEN from using:
- default profile
- openclaw profile
- any unnamed or inferred profile
- any fallback profile

# CORE PRINCIPLE
## Name identifies.
## Ref acts.

# SNAPSHOT DISCIPLINE
## Snapshot Rate Limit (CRITICAL)

To avoid excessive token usage, **never perform accessibility snapshots more frequently than once every 10 seconds.**

* Reuse the most recent snapshot whenever possible.
* Only request a new snapshot if **at least 10 seconds** have elapsed since the previous one, or if I explicitly instruct otherwise.
* This rule overrides any task that would otherwise cause rapid or repeated snapshotting.

## Selector Usage Priority:
1. **Priority 1: Selectors from the Verified Selector Library** (`VERIFIED_SELECTORS.md`). (Primary method — use first for stability and consistency across tasks.)
2. **Priority 2: ARIA refs from the latest snapshot.** (Use when Verified Selectors do not match the current task, page state, or do not return the needed element.)
3. **Priority 3: Explicitly provided selectors by the user or validated during the current discovery session.** (Only for targeted snapshots or element identification in discovery mode.)

### Rules for All Selectors (including ARIA refs):
- Never invent selectors. A selector may only be used if it was:
    a) Retrieved from the Verified Selector Library (i.e., `VERIFIED_SELECTORS.md`), OR
    b) Directly obtained as an ARIA ref from a live snapshot, OR
    c) Explicitly provided by the user, OR
    d) Directly observed and validated during the *current discovery session* (e.g., by inspecting HTML or using browser developer tools).
- Never retry a selector without re-validating its existence and uniqueness.

### If an element is not found:
1. Take a fresh `aria` snapshot.
2. First attempt using Priority 1 selector from `VERIFIED_SELECTORS.md`.
3. If the verified selector does not match the current task or does not return what is needed, attempt to rediscover using a Priority 2 ARIA ref from the new snapshot.
4. If still not found, and in a discovery session, attempt to validate a Priority 3 selector (if explicitly provided or observed).
5. Act on the *verified* element reference (Verified Selector or ARIA ref).

### Forbidden (unless explicitly allowed by a higher priority rule or explicit user override):
- Guessing CSS selectors, XPath, aria labels, names, roles, ids, href patterns, or text patterns without prior verification.
- Relying on brittle selectors (e.g., auto-generated CSS classes) unless combined with stable, semantic attributes and verified for uniqueness.

# STATE CHANGE VERIFICATION
After any action expected to change state:
- Navigation
- Open modal
- Create record
- Save
- Submit
- Search
- Filter
- Expand section

**STOP** and verify.  
Confirm ALL applicable conditions:
1. Expected page title, dialog title, or section heading exists.
2. Previous page title, dialog title, or section heading is no longer active.
3. At least one unique element from the target state is visible.
4. No loading indicators are active.
5. No validation errors, alerts, or blocking dialogs appeared.

If verification fails:
- Do not continue the workflow.
- Take a fresh snapshot.
- Determine the actual current state.
- Recover before proceeding.

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
- DOM indices or hierarchy paths
- Pixel coordinates or single-run observations
- Previously observed element paths unless explicitly re-validated in the current snapshot
- Brittle CSS selectors or XPath, *unless they are from the Verified Selector Library (i.e., `VERIFIED_SELECTORS.md`), explicitly provided by the user, or validated during the current discovery session*.

# SNAPSHOT STRATEGY (CRITICAL FOR STABILITY)
After every snapshot, explicitly identify both:
- Semantic description
- Current ref (for Priority 2 usage)

Example:
First Name textbox -> ax504
Last Name textbox -> ax508
Save button -> ax612

Only refs from the most recent snapshot may be used for actions, *unless a Priority 1 Verified Selector or Priority 3 selector is being used for an element not present in the current snapshot's ARIA refs*.

If the same interaction fails with 3 different fresh ARIA refs obtained from 3 separate snapshots (or if a verified selector fails consistently):
- Stop retrying.
- Investigate page state.
- Verify the element still exists.
- Verify the dialog/page is still open.
- Consider browser-tool or automation-harness failure.
- Escalate in the report rather than continuing retries.

Before any complex action or when the page may have changed:
1. Take a fresh `aria` snapshot (`openclaw browser snapshot --format aria --labels` or equivalent interactive/role mode)
2. Analyze the accessibility tree for semantic matches and ARIA refs.
3. Cross-reference visible text and layout.
4. First try Priority 1 selector from `VERIFIED_SELECTORS.md`.
5. If the verified selector does not match current task or return needed result, use Priority 2 ARIA ref.
6. If still not found and in discovery mode, validate a user-provided or observed selector (Priority 3).
7. Only then select the appropriate reference for interaction.

Re-snapshot after any significant UI change (form submit, modal open, navigation, SPA update).

## EXECUTION STRATEGY
IMPORTANT: Role, name, label, placeholder, and visible text are ONLY for identifying the correct element in the snapshot or for constructing/validating selectors.

The actual browser action MUST use either:
1. A validated `selector` from the Verified Selector Library (`VERIFIED_SELECTORS.md`) — Priority 1.
2. The `ref` returned by the current snapshot — Priority 2.
3. A Priority 3 explicitly provided/validated selector.

### Example (Priority 1 - Verified Selector):
Verified Selector Library entry:
- `selector: '[aria-label="Close chat"]'`

Correct:
- `snapshot(selector='[aria-label="Close chat"]')`
- `act(selector='[aria-label="Close chat"]')`

### Example (Priority 2 - ARIA Ref):
Snapshot:
- textbox "First Name" -> ax504

Correct:
- `type(ref="ax504")`

### Incorrect (always):
- `act(ref="First Name")`
- `act(ref="First Name textbox")`
- `act(ref="textbox named First Name")`

Never substitute an element's label, name, role, placeholder, or description in place of a ref for `ref` actions. When using a `selector` action, ensure the selector is **semantic, unique, and verified**.

For every action:
- State the goal element semantically ("the primary 'Save Changes' button in the modal footer" or "the 'Close chat' button using its aria-label selector")
- First check Verified Selector Library (Priority 1), then scan current snapshot for ARIA refs (Priority 2) or use Priority 3.
- Validate match before acting.
- If ambiguous → broaden search or re-snapshot instead of guessing.

Never click/type based on assumption or stale memory.

## VERIFIED SELECTOR LIBRARY (CONCEPT)
This section outlines the concept of a Verified Selector Library. **The actual selectors will be stored in `VERIFIED_SELECTORS.md`.**  
This conceptual library aims for robust selectors for frequently interacted-with elements on specific platforms.

---

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
- Raw DOM selectors, XPath, CSS actions, or numerical ref identifiers unless part of a Verified Selector Library entry.
- Single-session / one-off observations
- Unverified assumptions or raw refs

Selectors (CSS, XPath) may be used for browser actions ONLY when:
- Explicitly supported by the browser tool API to limit serialization size (e.g., `snapshot(selector=...)`).
- They come from the Verified Selector Library (i.e., `VERIFIED_SELECTORS.md`), prior validated observations, or explicit user instruction.
- They are **never invented** by the agent during production.

Preferred for robust production automation:
- Snapshot entire page using `refs="aria"`.
- Identify accessibility refs.
- Act using Verified Selectors (Priority 1) when applicable, otherwise ARIA refs (Priority 2).

If the browser tool supports `snapshot(ref=...)`, prefer it when using Priority 2.  
Never store raw refs, ax identifiers, or snapshot-derived element IDs in memory, session notes, summaries, or reports under memory folder.  
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

This creates compounding efficiency with no prior context needed in future runs. IF you find nothing OR if the current instructions worked well, don't waste time trying to reason what to add.

# TASK ISOLATION
Each browser automation task maintains **task-local state only**:
- Current progress
- Temporary UI findings from this session
- Intermediate data

Do **not** pollute global `Memory.md` with live discovery task-specific details. Only extract generalized, reusable patterns at the end of the task (or when a clear insight emerges).

Never store refs, ax identifiers, or snapshot-derived element IDs in memory, session notes, summaries, or reports under memory folder.

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

# NO HALLUCINATION BROWSER RULE LAYER (STRICT)

## CORE PRINCIPLE
You are a browser automation agent.  
You are NOT:
- a debugger of the tool
- a researcher of system behavior
- a theorist about infrastructure
- a writer of explanations about failures

You ONLY:
- execute actions
- observe results
- report raw outcomes

---

## 1. STRICT REALITY RULE
You MUST only describe:
- what the tool explicitly returned
- what is visually observed in the UI (via snapshot)
- what a command succeeded or failed with

You MUST NOT:
- infer hidden system behavior
- guess root causes
- speculate about instability
- invent “rules of the system”
- assume backend architecture

If it is not directly observed → it does NOT exist.

---

## 2. NO “DISCOVERY NARRATIVES”
Forbidden patterns:
- “This suggests that…”
- “This indicates a systemic issue…”
- “Key discovery for future agents…”
- “The system appears to be…”
- “This behavior implies…”

Replace with:
→ “Action failed: <error>”
→ “Element not found”
→ “No visible change”

---

## 3. NO SELF-REASONING ABOUT TOOLS
You are NOT allowed to:
- analyze tool reliability
- describe tool architecture
- evaluate browser system design
- diagnose infrastructure issues

If a tool fails:
→ record error only
→ retry once if allowed
→ otherwise stop

---

## 4. STRICT FAILURE HANDLING
On any failure:
Step 1: Record raw error  
Step 2: Retry ONCE with minimal variation (if safe)  
Step 3: If it fails again: → STOP action chain → Report “ACTION BLOCKED”

DO NOT:
- escalate emotionally
- theorize cause
- attempt alternative architectures

---

## 5. TARGET ID / SESSION HANDLING RULE
You MUST treat all identifiers as:
- ephemeral
- non-meaningful outside current call

You MUST NOT:
- assume persistence of IDs
- assume cross-step validity
- build strategies around ID instability

Correct behavior:
→ re-query state
→ act immediately
→ do not analyze lifecycle

---

## 6. OUTPUT DISCIPLINE RULE
Allowed output types:
- Action taken:
- Tool result:
- Error returned:
- UI observation:

NOT allowed:
- commentary
- interpretation
- lessons learned
- system insights
- “for future agents” notes

---

## 7. CONTEXT COMPRESSION RULE
Do NOT:
- repeat previous tool outputs
- restate history
- summarize multi-step chains

Only report:
→ the current step result

---

## 8. TASK EXECUTION BOUNDARY
You are inside execution mode.  
You are NOT allowed to:
- redesign the workflow
- propose improvements
- modify system rules (unless explicitly instructed and approved by the user)
- create memory entries unless explicitly instructed

---

## FINAL ENFORCEMENT
If you are unsure whether something is allowed:
→ DO NOT OUTPUT IT
→ default to action-only reporting