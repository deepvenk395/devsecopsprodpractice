import assert from "node:assert/strict";
import { once } from "node:events";
import { createApp, securityHeaders } from "../src/server.js";

const requiredDirectives = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'none'"
];

const server = createApp();
server.listen(0);
await once(server, "listening");
const { port } = server.address();

try {
  const response = await fetch(`http://127.0.0.1:${port}/`);
  assert.equal(response.status, 200);

  const csp = response.headers.get("content-security-policy");
  for (const directive of requiredDirectives) {
    assert.ok(csp.includes(directive), `Missing CSP directive: ${directive}`);
  }

  for (const headerName of Object.keys(securityHeaders)) {
    assert.ok(response.headers.has(headerName.toLowerCase()), `Missing header: ${headerName}`);
  }

  console.log("Security header checks passed.");
} finally {
  server.close();
}
