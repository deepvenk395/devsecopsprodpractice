import assert from "node:assert/strict";
import { once } from "node:events";
import { createApp, securityHeaders } from "../src/server.js";

const server = createApp();
server.listen(0);
await once(server, "listening");
const { port } = server.address();
const baseUrl = `http://127.0.0.1:${port}`;

async function request(path, init) {
  return fetch(`${baseUrl}${path}`, init);
}

try {
  const home = await request("/");
  assert.equal(home.status, 200);
  assert.match(await home.text(), /DevSecOps Lab/);

  for (const [name, expected] of Object.entries(securityHeaders)) {
    assert.equal(home.headers.get(name.toLowerCase()), expected, `${name} header mismatch`);
  }

  const health = await request("/healthz");
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: "ok", service: "devsecops-lab" });

  const traversal = await request("/..%2Fpackage.json");
  assert.notEqual(traversal.status, 200);

  const method = await request("/", { method: "POST" });
  assert.equal(method.status, 405);

  console.log("All server tests passed.");
} finally {
  server.close();
}
