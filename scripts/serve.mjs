// Tiny zero-dependency static file server, for local preview only.
// GitHub Pages does the actual serving in production — this is just so
// you can run `npm run build && npm run serve` and click around before
// pushing. Serves dist/ on http://localhost:5173.

import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "dist");
const PORT = 5173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = join(ROOT, urlPath);

    let s;
    try {
      s = await stat(filePath);
    } catch {
      s = null;
    }
    if (s && s.isDirectory()) filePath = join(filePath, "index.html");
    if (!s && !urlPath.includes(".")) filePath = join(filePath, "index.html");

    let data;
    try {
      data = await readFile(filePath);
    } catch {
      // Mimic GitHub Pages: unknown paths fall back to 404.html
      data = await readFile(join(ROOT, "404.html"));
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
      return;
    }
    res.writeHead(200, { "Content-Type": TYPES[extname(filePath)] || "application/octet-stream" });
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end("Server error: " + err.message);
  }
});

server.listen(PORT, () => {
  console.log(`[serve] NULL running at http://localhost:${PORT}/`);
  console.log(`[serve] (Run "npm run build" first if dist/ doesn't exist yet.)`);
});
