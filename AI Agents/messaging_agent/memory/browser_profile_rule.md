# Browser Profile Rule

- **ABSOLUTE RULE**: Always use `profile="messaging"` for all browser operations. Never use the default, openclaw, or any other unnamed/inferred profiles.
- **COMMAND TO START**: `print(default_api.browser(action="start", profile="messaging"))`
- **COMMAND TO NAVIGATE**: `print(default_api.browser(action="navigate", profile="messaging", url="<URL>"))`
