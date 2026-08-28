// Vite only auto-copies the contents of /public into the build output.
// Our games/ and apps/ folders live at the project root (so the
// content-discovery convention in the README stays simple), so this
// script copies them â€” plus the GitHub Pages 404.html fallback â€” into
// dist/ after every build.

import { cpSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");

function copyIfExists(name) {
  const src = join(ROOT, name);
  const dest = join(DIST, name);
  if (existsSync(src)) {
    cpSync(src, dest, { recursive: true });
    console.log(`[copy-content] Copied ${name}/ into dist/`);
  }
}

copyIfExists("games");
copyIfExists("apps");

const notFoundSrc = join(ROOT, "404.html");
if (existsSync(notFoundSrc)) {
  cpSync(notFoundSrc, join(DIST, "404.html"));
  console.log("[copy-content] Copied 404.html into dist/");
}
