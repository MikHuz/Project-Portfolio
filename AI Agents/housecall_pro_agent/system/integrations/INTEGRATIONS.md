# INTEGRATIONS.md

## **HCP Agent API Key Access via Gateway Secrets**
_Last updated: Tue 2026-06-30 18:18 PDT_

**To securely access the `HOUSECALL_API_KEY` for Housecall Pro API calls:**

1.  **Ensure Gateway Configuration:**
    *   The `HOUSECALL_API_KEY` must be set as an `Environment` variable in the `openclaw-gateway.service` file (e.g., `/home/doorgi/.config/systemd/user/openclaw-gateway.service`):
        ```
        Environment="HOUSECALL_API_KEY=your_a…here"
        ```
    *   The Gateway's `auth-profiles` must be configured (via `openclaw secrets configure`) to map `profiles.house_call_pro.key` to an `env` provider alias (`hcp`) which references the `HOUSECALL_API_KEY` environment variable. The configuration should look like this:
        ```json
        "house_call_pro": {
          "type": "api_key",
          "provider": "hcp",
          "keyRef": {
            "source": "env",
            "provider": "hcp",
            "id": "HOUSECALL_API_KEY"
          }
        }
        ```
    *   After making changes to the service file or `auth-profiles`, ensure the Gateway service is restarted and secrets reloaded:
        ```bash
        openclaw gateway stop
        openclaw gateway start
        openclaw secrets reload
        ```

2.  **Using the Key in `exec` Commands:**
    *   When making `exec` calls that require the `HOUSECALL_API_KEY` in a header (e.g., for `curl`), reference it directly as a shell environment variable using **double quotes** around the entire header value to ensure proper expansion:

    ```python
    default_api.exec(command='''
      curl --request GET \
      --url 'https://api.housecallpro.com/customers?search=John&per_page=50&page=1' \
      --header 'Accept: application/json' \
      --header "Authorization: Bearer $HOUSECALL_API_KEY"
    ''')
    ```

    *   **Do not** attempt to pass the `HOUSECALL_API_KEY` via `env` parameter in Python with a hardcoded string or a `secret:` reference, as this has proven unreliable.
    *   **Do not** attempt to use `$(openclaw secrets get ...)` directly within the `exec` command string, as the `openclaw` CLI is not available in the `exec` subshell.



## Google Sheets Integration (mommited email)

## Authenticating for Write Operations

To perform write operations (e.g., append, update) to Google Sheets using the `gog` CLI with the `michaelhuziy@gmail.com` account, the `GOG_KEYRING_PASSWORD` environment variable must be set.

1.  **Retrieve the `GOG_KEYRING_PASSWORD`**:
    The password is exported in `~/.bashrc` as:
    ```bash
    export GOG_KEYRING_PASSWORD=***
    ```


2.  **Set Environment Variables**:
    Before executing any `gog` command that requires authentication, set the following environment variables:
    *   `GOG_KEYRING_BACKEND=file`
    *   `GOG_KEYRING_PASSWORD="***"` (replace "***" with the actual password)
    *   `--account ommitted` (to specify the Google account)

## Example: Appending a Row to a Google Sheet

To append a row to sheet EXAMPLE FAKE Google Sheet (ID: `1ETEhAtpVTcVVQC_SHVLwA8RhSjRkhlHcexW3rmgb7`), use the following command structure:

```bash
GOG_KEYRING_BACKEND=file GOG_KEYRING_PASSWORD="**
" gog sheets append "<SHEET_ID>" "<SHEET_NAME>!<RANGE>" \
  --values-json '[["Value1", "Value2", "Value3", "Value4", "Value5"]]' \
  --insert INSERT_ROWS \
  --account omitted
```

**Practical Example (appending a test row):**

```bash
GOG_KEYRING_BACKEND=file GOG_KEYRING_PASSWORD=*** gog sheets append "ommited" "Sheet1!A:E" \
  --values-json '[["Test Name", "Test City", "2026-06-22", "https://example.com/test", "No"]]' \
  --insert INSERT_ROWS \
  --account ommited
```

## Telegram
You have the ability use telegram and message users. The currently connected user is Mike, with user id 5667586768.

## 🌐 Browser Profile — ALWAYS Use `hcp`

This agent has a dedicated Chromium profile called **`hcp`** (port 18802, blue tint).

**Every single browser tool call must include `profile="hcp"`**, no exceptions:

```
browser action=start profile="hcp"
browser action=snapshot profile="hcp"
browser action=screenshot profile="hcp"
browser action=act profile="hcp" ...
```

- ✅ `profile="hcp"` — dedicated HCP login, isolated cookies
- ❌ No profile / `profile="openclaw"` / `profile="automation"` — wrong browser, wrong account

If the `hcp` profile isn't running yet, start it first: `browser action=start profile="hcp"`

---
