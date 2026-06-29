import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(__dirname, "..");
const publicRoot = resolve(projectRoot, "public");
const port = Number.parseInt(process.env.PORT || "4173", 10);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"]
]);

const securityHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "img-src 'self' data:",
    "style-src 'self'",
    "script-src 'self'",
    "font-src 'self'",
    "connect-src 'self'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests"
  ].join("; "),
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Origin-Agent-Cluster": "?1",
  "Referrer-Policy": "no-referrer",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-Permitted-Cross-Domain-Policies": "none"
};

function setBaseHeaders(response, contentType = "text/plain; charset=utf-8") {
  response.setHeader("Content-Type", contentType);
  response.setHeader("Cache-Control", "no-store");
  for (const [name, value] of Object.entries(securityHeaders)) {
    response.setHeader(name, value);
  }
}

function resolvePublicPath(requestUrl) {
  const url = new URL(requestUrl, "http://localhost");
  const decodedPath = decodeURIComponent(url.pathname);
  const segments = decodedPath.split("/").filter(Boolean);

  if (segments.some((segment) => segment === ".." || segment.includes("\\") || segment.includes("\0"))) {
    return null;
  }

  const requestedSegments = segments.length === 0 ? ["index.html"] : segments;
  const resolvedPath = resolve(join(publicRoot, ...requestedSegments));

  if (!resolvedPath.startsWith(publicRoot)) {
    return null;
  }

  return resolvedPath;
}

async function serveStatic(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    setBaseHeaders(response);
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  if (request.url === "/healthz") {
    setBaseHeaders(response, "application/json; charset=utf-8");
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok", service: "devsecops-lab" }));
    return;
  }

  const filePath = resolvePublicPath(request.url || "/");
  if (!filePath) {
    setBaseHeaders(response);
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) {
      throw new Error("Not a file");
    }

    const contentType = mimeTypes.get(extname(filePath).toLowerCase()) || "application/octet-stream";
    setBaseHeaders(response, contentType);
    response.writeHead(200);

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    response.end(await readFile(filePath));
  } catch {
    setBaseHeaders(response);
    response.writeHead(404);
    response.end("Not found");
  }
}

export function createApp() {
  return createServer((request, response) => {
    serveStatic(request, response).catch(() => {
      setBaseHeaders(response);
      response.writeHead(500);
      response.end("Internal server error");
    });
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createApp().listen(port, () => {
    console.log(`DevSecOps Lab running at http://localhost:${port}`);
  });
}

export { securityHeaders };
