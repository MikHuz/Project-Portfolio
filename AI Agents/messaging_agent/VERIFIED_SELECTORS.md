# VERIFIED_SELECTORS.md - Verified UI Element Selectors


This file contains a library of robust, verified selectors for frequently interacted-with UI elements across various platforms. These selectors are used as a  priority to search up first when doing a taks with headed browser automation (Priority 1 from BROWER_AUTOMATION.md"). When no selectors exist or they return wrong information or errors, you resort to priority=2, using ARIA refs from live snapshot with no selectors.


## Structure:
Selectors are organized by platform/context. Each entry should include:
- `selector`: The CSS selector string.
- `description`: A human-readable description of the element.
- `verified_by`: Who verified it (e.g., "discovery agent", "human").
- `date_verified`: Date of last verification (YYYY-MM-DD).
- `notes`: Any important usage notes or conditions.

## Guidelines for Adding/Updating:
- **Uniqueness:** Ensure the selector matches only one element on the intended page/component.
- **Stability:** Prefer selectors that are likely to survive UI updates (`id`, `data-testid`, `aria-label`, `role + aria-label`). Avoid brittle, auto-generated classes if possible.
- **Semantic:** Describe the element's purpose or identity, not just its styling.
- **Verification:** Only add selectors that have been explicitly tested and confirmed to work.

---

## Platform: Facebook Messenger

### Element: Messenger button
```yaml
selector: 'div[role="button"][aria-label="Messenger"][tabindex="0"]'
description: The button to open the Messenger chat interface.
verified_by: discovery agent
date_verified: 2026-06-26
notes: Found in the main Facebook navigation bar.
```

### Element: "Marketplace" chat button
selector: xpath=//*[normalize-space(text())="Marketplace"].
description: The button inside the chat window after clicking the "Messenger" button that will display
garage door lead customer messages

### Element: Close chat button
```yaml
selector: '[aria-label="Close chat"]'
description: The button to close an individual chat window within the Messenger dialog.
verified_by: human
date_verified: 2026-06-26
notes: Reliably found when an individual chat is in primary focus.
```

```

### Element: Chat Composer Input
```yaml
selector: '[contenteditable="true"]'
description: The input field where messages are typed in a chat conversation.
verified_by: human
date_verified: 2026-06-26
notes: Often a contenteditable div rather than a textarea.
```

### Element: Send Button
```yaml
selector: '[aria-label="Press Enter to send"]'
description: The button used to send a message in a chat conversation.
verified_by: human
date_verified: 2026-06-26
notes: Sometimes has text "Send" but aria-label is more reliable.
```

