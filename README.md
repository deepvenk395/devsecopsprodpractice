# DevSecOps Lab

A production-style website you can maintain to learn real DevSecOps habits: secure coding, CI gates, container hardening, release evidence, monitoring readiness, and incident practice.

## Run Locally

```powershell
node src/server.js
```

Open `http://localhost:4173`.

If `node` is not on PATH in Codex Desktop, use the bundled runtime:

```powershell
C:\Users\hp\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe src/server.js
```

## Verify

```powershell
npm run ci
```

Or with bundled Node:

```powershell
C:\Users\hp\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe tests/server.test.js
C:\Users\hp\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe scripts/security-check.js
```

## What To Practice

- Add a new feature and prove tests still pass.
- Intentionally break a security header, watch the check fail, then fix it.
- Add dependency scanning, secret scanning, SAST, and container scanning in CI.
- Build the Docker image and run the container with least privilege.
- Write a pull-request template with risk, rollback, and evidence sections.
- Simulate an incident using `docs/incident-runbook.md`.

## Production Concepts Included

- Content Security Policy and browser hardening headers.
- Path traversal protection in the static server.
- Health endpoint for readiness checks.
- Container runtime hardening in `docker-compose.yml`.
- GitHub Actions workflow with test, security, audit, build, and smoke-test gates.
- Threat model and incident runbook documents.
