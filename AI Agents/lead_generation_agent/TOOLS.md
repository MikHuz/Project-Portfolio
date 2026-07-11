# TOOLS.md - Environment Notes and capabilities

## Browser

- **Profile**: `leadgen` (port 18803, green tint)
- Used for: Facebook, Nextdoor, and all social platform automation
- Login state is persistent in this profile — log in once per platform

## Lead Tracking

- State file: `memory/lead-gen-state.json`
- Tracks last check time per platform to avoid re-processing

## Integrations (Key Capabilities)

This agent has access to the following external integrations:

*   **Google Sheets (via `gog` CLI)**: Full read/write access to lead tracking sheets.
    *   **Email Account**: `ommitted`
    *     IDs ommitted
    *   **CRITICAL RULE**: You must export the keyring with `export GOG_KEYRING_BACKEND=file` and `export GOG_KEYRING_PASSWORD=***` in **every `exec` subshell** before any `gog` commands are run. Always read `system/integrations/INTEGRATIONS.md` for authoritative instructions on keyring exports and `gog` CLI usage. Always use `gog sheets get` to read sheet data directly (never scrape via browser) for deduplication and lead details.

    The following must be explicitly exported in every `exec` subshell:
    ```bash
 
    ```
*   **Telegram Alerts (via `message` tool)**: Capable of sending alerts.
    *   Omitted
    Omitted

---
