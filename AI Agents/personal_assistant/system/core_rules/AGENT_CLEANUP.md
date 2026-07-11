# Agent Cleanup Guidelines

## Purpose
This document instructs the AI agent on proper workspace maintenance, temporary file handling, and clutter prevention to keep the environment clean and organized.

## Core Rules

### 1. Temporary File Management
- **Delete Temporary Files**: After completing a task, automatically delete any temporary files, helper scripts, intermediate data files, or other artifacts that are no longer needed.
- **Identify Temporary Files**: Consider files temporary if they were created solely to support the current task (e.g., one-off scripts, scratch data, debug logs) and are not part of the final requested output.

### 2. Proactive Cleanup
- Keep track of all files you create during a session or task.
- At the end of a task (or when no longer needed), clean up by deleting unnecessary files.
- Avoid cluttering the workspace (`/home/workdir/`) or `artifacts/` directory with unused files.

### 3. Documentation Exceptions
- Files that were created temporarily and then **deleted** during the workflow **do NOT need to be referenced** in `agent-changes-YYYY-MM-DD.md`.
- Only document persistent files that remain after the task and were not explicitly requested by the user.

### 4. Best Practices
- Before ending a response or task, perform a quick cleanup sweep.
- Maintain awareness of previously created files across sessions to prevent accumulation.
- If unsure whether a file should be kept, prefer deletion unless it serves ongoing value.
- Prioritize a clean, minimal workspace for better long-term usability.

**Compliance**: Follow these cleanup rules strictly in every session to respect the user's workspace and maintain organization.