# Threat Model

## System

DevSecOps Lab is a static website served by a small Node HTTP server. It has no user database, payment flow, or external API by default, which makes it a safe base for learning secure delivery.

## Assets

- Website source code and generated visual assets.
- CI workflow configuration.
- Container image and runtime configuration.
- Release evidence produced by tests, scans, and reviews.

## Trust Boundaries

- Browser to web server over HTTP locally or HTTPS in production.
- Repository to CI runner.
- CI runner to container registry or hosting platform.
- Operator laptop to production environment.

## Primary Risks

| Risk | Example | Control |
| --- | --- | --- |
| Path traversal | Request attempts to read files outside `public` | Normalize and resolve public paths |
| XSS | Unsafe script execution from modified UI code | Strict CSP and no inline scripts |
| Clickjacking | Site embedded in attacker frame | `frame-ancestors 'none'` and `X-Frame-Options` |
| Dependency risk | Vulnerable package added later | `npm audit`, review, and pinning |
| Container breakout | Excess Linux capabilities | Non-root user, read-only filesystem, dropped capabilities |
| Weak release process | Unsafe change promoted quickly | PR review, CI gates, rollback notes |

## Practice Extensions

- Add a form and server API, then document validation, rate limits, logging, and abuse cases.
- Add authentication with a mock identity provider and document session risks.
- Add deployment to a cloud service and record secrets handling, IAM, and monitoring controls.
