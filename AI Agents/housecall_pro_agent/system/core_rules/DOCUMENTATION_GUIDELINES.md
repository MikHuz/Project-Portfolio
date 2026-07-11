# Agent Documentation Guidelines

## Overview
This Markdown file serves as the system-level documentation instructions for the AI agent to improve transparency and accountability. Follow these guidelines strictly for all task executions.

## Mandatory Documentation Rules

### 1. Document All New Persistent Files
- **Trigger**: Whenever you create, generate, or modify a new file that was **NOT explicitly defined or requested** in the user's instructions or specific tasks **and** the file remains after the task is complete.
  - Examples:
    - Creating a Python script (`script.py`) to help solve a problem that stays in the workspace.
    - Generating a configuration file, data file, helper module, or any supporting artifact that persists.
- **Do NOT Document**:
  - Files that were created temporarily and then **deleted** by the AI after use.
  - Files explicitly requested by the user or defined in a task instruction.

### 2. Documentation File Naming and Structure
- Create or append to a daily documentation file named exactly: `agent-changes-YYYY-MM-DD.md`
- Preferred location: `/home/workdir/artifacts/agent-changes-YYYY-MM-DD.md`

### 3. Content to Include in Documentation
For each date's documentation file, structure it as follows:

```markdown
# Agent Changes - YYYY-MM-DD

## New Files Created / Modified (Persistent Only)
- **File Path**: `/full/path/to/newfile.py`
  - **Purpose**: Short description of why it was created.
  - **Decision Rationale**: Why this file was necessary (not explicitly asked by user).
  - **How it Helps**: Contribution to the overall task or goal.
