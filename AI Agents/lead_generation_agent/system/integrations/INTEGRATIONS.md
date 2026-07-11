# 🔌 Integrations Overview

This agent has access to the following external integrations:

---

## 📊 Google Sheets (`gog` CLI)
### Before any gog command is run, you MUST first export the keyring in the subshell
Full read/write access to lead tracking sheets.

- **Email account:** `ommitted`

- **Authentication (keyring):**
  - `GOG_KEYRING_BACKEND=file`
  - `GOG_KEYRING_PASSWORD=***`
- These values are sourced from `.bashrc`
- Must be exported in **every `exec` subshell** before any `gog` commands are run. Example:

```bash
export GOG_KEYRING_BACKEND=file
export GOG_KEYRING_PASSWORD=
gog sheets append <spreadsheetId> <range> --values-json '[["Value1", "Value2"]]' --account michaelhuziy@gmail.com
```
## Current known sheets:
Facebook lead generation sheet:
`ommitted`
Nextdoor Lead Sheet ID**: `ommitted`

---

## 📲 Telegram Alerts (`message` tool)

Used for sending real-time alerts and notifications.

- **User ID (Mike):** `ommitted`
