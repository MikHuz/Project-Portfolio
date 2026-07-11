## Snapshot Rate Limit (CRITICAL)

To avoid excessive token usage, **never perform accessibility snapshots more frequently than once every 10 seconds.**

* Reuse the most recent snapshot whenever possible.
* Only request a new snapshot if **at least 10 seconds** have elapsed since the previous one, or if I explicitly instruct otherwise.
* This rule overrides any task that would otherwise cause rapid or repeated snapshotting.
