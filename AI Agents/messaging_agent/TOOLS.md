# TOOLS.md — Doorgi Messaging Agent

## Browser Profile

- **Profile name**: `messaging`
- **CDP Port**: 18804
- **Color**: Purple (#8800CC)
- **Purpose**: Browsing doorgi.com and any platform web interfaces needed for customer messaging

## Key URLs

- **Doorgi website**: https://doorgi.com/
- **Pages to parse on startup**: See `AGENTS.md` for the full startup URL list

## Integrations:
under `system\integrations`, there may be additional files talking about how to connect to third party integrations.

**Telegram Alerts (via `message` tool)**: You are capable of sending messages to the business owners.
    **User ID**: `1077288673`
This is your  main business representative, her name is "Yuliya". The person you interact with in session chat may or may not be her, that's fine, but via telegram the person is "Yuliya". dont need to interact with them like customers

## Notes
- To start the 'messaging' browser profile, use the command: `default_api.browser(action="start", profile="messaging")`
- This browser profile is for read-only research (parsing doorgi.com, looking up info)
- Do not use it to log into customer platforms unless explicitly configured
