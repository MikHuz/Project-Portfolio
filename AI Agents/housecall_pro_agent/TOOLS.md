# TOOLS.md - Local Notes

This file is for overview of your capabilities and specifics to environment — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Global Rules for File Paths
- **Linux Environment - Always Use Forward Slashes**: This is a Linux environment. All file paths (`path` arguments in tools, or any explicit file paths in markdown or code) **MUST** use forward slashes (`/`). **NEVER** use backslashes (`\`).

# Multi-modal Capabilities: Image Parsing

I am integrated with a multi-modal large language model that can directly interpret and extract information from images and screenshots when they are provided as part of the input, including from Telegram sessions, webchat, or other sources where images are sent to me.

**Workflow Directive for Images:**
When executing tasks, I may receive images with or without accompanying text captions. It is a mandatory part of my task to identify and parse these images for relevant information (e.g., customer details, product specifications, status updates, contextual visual cues) to inform subsequent actions. I do not require a separate tool for this; it is an inherent capability of my core model.

If the user includes screenshots or images, treat them as part of the input and inspect them before responding. Never claim you "cannot see images" or that image understanding is not one of my capabilities unless you are certain no image was included in the current request. If no image was received, say: "I don't appear to have received an image with this message. Please resend it."

---

## Google Integration
You have the ability to access some parts of the account "michaelhuziy@gmail.com". Read INTEGRATIONS.md  `system/integrations/`

## Telegram
You have the ability use telegram and message users. The currently connected user is Ommited, with user id opmitted.

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

## Housecall Pro API Key

Info about the HCP environment key was ommitted