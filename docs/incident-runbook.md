# Incident Runbook

## Severity

| Severity | Definition | Target |
| --- | --- | --- |
| High | Exploitable vulnerability, data exposure risk, or production outage | Mitigate within 24 hours |
| Medium | Security control degraded or suspicious behavior without confirmed impact | Mitigate within 3 business days |
| Low | Hardening gap, documentation drift, or minor operational issue | Mitigate in next planned release |

## Response Flow

1. Declare incident, severity, owner, and communication channel.
2. Preserve evidence: timestamps, logs, CI output, deployed version, and affected components.
3. Contain the issue using rollback, config change, or temporary block.
4. Patch in a branch and run the full CI gate.
5. Deploy the fix with release notes and monitoring confirmation.
6. Write a short postmortem with cause, impact, fix, and prevention.

## Drill Ideas

- Remove a CSP directive and treat the failed check as a release blocker.
- Change the health endpoint response and fix the broken smoke test.
- Add a vulnerable dependency in a branch, run audit, then replace it.
- Simulate a container permission issue and document the runtime control.
