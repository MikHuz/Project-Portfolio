# RTK_COMMANDS.md — Token-Efficient CLI Commands

## What is RTK?

RTK (Rust Token Killer) is installed at `/home/doorgi/.local/bin/rtk`. It compresses CLI output before it enters the context window — same results, far fewer tokens (~89% avg reduction).

## The Rule: Use `rtk` Prefix for ALL Supported Commands

Whenever running any supported command inside an `exec` call, **always use the `rtk` version.** This applies to all agents, all tasks, all sub-agents.

Run `rtk --help` to see the full list. Key ones for this environment:

### ⭐ Playwright (Most Important for This Setup)
| Raw | RTK |
|---|---|
| `npx playwright test ...` | `rtk playwright ...` |
| `playwright test ...` | `rtk playwright ...` |

Compresses verbose E2E test output — keeps failures, strips passing boilerplate. Critical for HCP and lead gen automation tasks.

### File System
| Raw | RTK |
|---|---|
| `find <path> ...` | `rtk find <path> ...` |
| `grep <pattern> ...` | `rtk grep <pattern> ...` |
| `ls <path>` | `rtk ls <path>` |
| `tree <path>` | `rtk tree <path>` |
| `diff <a> <b>` | `rtk diff <a> <b>` |
| `wc ...` | `rtk wc ...` |

### Git / Version Control
| Raw | RTK |
|---|---|
| `git status` | `rtk git status` |
| `git log ...` | `rtk git log ...` |
| `git diff ...` | `rtk git diff ...` |

### JS / Node
| Raw | RTK |
|---|---|
| `npm run ...` | `rtk npm run ...` |
| `npx ...` | `rtk npx ...` |
| `pnpm ...` | `rtk pnpm ...` |
| `tsc` | `rtk tsc` |

### Python
| Raw | RTK |
|---|---|
| `pytest ...` | `rtk pytest ...` |
| `pip ...` | `rtk pip ...` |
| `mypy ...` | `rtk mypy ...` |
| `ruff ...` | `rtk ruff ...` |

### Rust
| Raw | RTK |
|---|---|
| `cargo test ...` | `rtk cargo test ...` |
| `cargo build ...` | `rtk cargo build ...` |

### Infra
| Raw | RTK |
|---|---|
| `docker ...` | `rtk docker ...` |
| `kubectl ...` | `rtk kubectl ...` |
| `curl ...` | `rtk curl ...` |

### Smart Utilities
- `rtk err <cmd>` — run any command, show only errors/warnings
- `rtk test <cmd>` — run tests, show only failures
- `rtk log <file>` — filtered, deduplicated log output
- `rtk json <file>` — compact JSON output
- `rtk pipe` — stdin mode: pipe any command through RTK

## What RTK Does NOT Cover

For everything else (`openclaw`, `python` scripts, `node`, `bash` scripts, etc.) — use normally, no `rtk` prefix.

## Sub-Agents Must Follow This Too

When spawning a sub-agent, always include in the task brief:
> "Use `rtk` prefix for find, grep, git, ls, and all other supported CLI commands. RTK is installed at `/home/doorgi/.local/bin/rtk`. Read `system/core_rules/RTK_COMMANDS.md` for the full rule."
