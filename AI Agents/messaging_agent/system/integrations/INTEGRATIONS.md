# 🔌 Integrations Overview

This agent has access to the following external integrations:

---

## 📊 Google Sheets (`gog` CLI)

Full read/write access to lead tracking sheets.

- **Email account:** `michaelhuziy@gmail.com`

- **Authentication (keyring):**
  - `GOG_KEYRING_BACKEND`
  - `GOG_KEYRING_PASSWORD`

- These values are sourced from `.bashrc`
- Must be exported in **every `exec` subshell** before any `gog` commands are run

---
