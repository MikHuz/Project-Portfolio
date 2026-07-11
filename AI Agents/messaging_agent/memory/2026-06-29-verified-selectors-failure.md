# 2026-06-29-verified-selectors-failure.md

**Rule Reinforcement:** It is critical to **ALWAYS** consult `VERIFIED_SELECTORS.md` before performing any browser `act` or `snapshot` with a `selector`. Failure to do so leads to wasted tokens, debugging, and operational inefficiencies.

**Failure Mode:** Over-reliance on immediate snapshot ARIA `ref` attributes, even when `BROWSER_AUTOMATION.MD` explicitly states that `VERIFIED_SELECTORS.md` has the highest priority. This leads to brittle automation and unnecessary work.

**Action:** `AGENTS.md` has been updated under "Task Execution Rules" to enforce this priority. Future agents **MUST** adhere to this. 
