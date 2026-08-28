// Scans /games and /apps at build time (and on `npm run dev` / `npm run catalog`)
// and generates src/catalog/catalog.json â€” the single source of truth the
// frontend reads from. You never need to edit this file by hand: just add
// a folder under games/ or apps/ following the structure below and rerun
// `npm run catalog` (or restart `npm run dev` / rebuild).
//
// Expected folder shape:
//   games/<slug>/<slug>.html
//   games/<slug>/<thumbnail>.(png|jpg|jpeg|webp|gif|svg)   [optional]
//   games/<slug>/Label.txt                                  [optional]
//
// Multiple labels: put one per line, or comma-separated, in Label.txt.

import { readdirSync, statSync, existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];

function slugToTitle(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function readLabels(folderPath) {
  const labelFile = join(folderPath, "Label.txt");
  if (!existsSync(labelFile)) return ["Uncategorized"];
  try {
    const raw = readFileSync(labelFile, "utf-8").trim();
    if (!raw) return ["Uncategorized"];
    // Support either newline-separated or comma-separated labels.
    const parts = raw
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.length ? parts : ["Uncategorized"];
  } catch {
    return ["Uncategorized"];
  }
}

function findThumbnail(folderPath, slug) {
  let files;
  try {
    files = readdirSync(folderPath);
  } catch {
    return null;
  }
  // Prefer a thumbnail literally named after the slug, else take the
  // first image file we find in the folder.
  const bySlug = files.find((f) => IMAGE_EXTS.includes(extname(f).toLowerCase()) && f.startsWith(slug));
  if (bySlug) return bySlug;
  const anyImage = files.find((f) => IMAGE_EXTS.includes(extname(f).toLowerCase()));
  return anyImage || null;
}

function findHtml(folderPath, slug) {
  let files;
  try {
    files = readdirSync(folderPath);
  } catch {
    return null;
  }
  const bySlug = files.find((f) => f.toLowerCase() === `${slug}.html`);
  if (bySlug) return bySlug;
  const anyHtml = files.find((f) => extname(f).toLowerCase() === ".html");
  return anyHtml || null;
}

function scanDirectory(kind, dirName) {
  const dirPath = join(ROOT, dirName);
  if (!existsSync(dirPath)) return [];

  const entries = readdirSync(dirPath).filter((name) => {
    const full = join(dirPath, name);
    try {
      return statSync(full).isDirectory();
    } catch {
      return false;
    }
  });

  const results = [];
  for (const slug of entries) {
    const folderPath = join(dirPath, slug);
    const html = findHtml(folderPath, slug);

    // Section 91: an invalid/broken folder (no playable HTML) is skipped
    // gracefully rather than producing a broken card.
    if (!html) {
      console.warn(`[catalog] Skipping ${kind}/${slug}: no HTML file found.`);
      continue;
    }

    const thumbnail = findThumbnail(folderPath, slug);
    const labels = readLabels(folderPath);

    results.push({
      id: slug,
      kind,
      title: slugToTitle(slug),
      route: `/${dirName}/${slug}`,
      htmlPath: `/${dirName}/${slug}/${html}`,
      thumbnail: thumbnail ? `/${dirName}/${slug}/${thumbnail}` : null,
      labels,
    });
  }

  // Stable alphabetical order; the frontend re-sorts as needed (A-Z, Z-A,
  // Newest, Popular) but this keeps generation deterministic.
  results.sort((a, b) => a.title.localeCompare(b.title));
  return results;
}

function generate() {
  const games = scanDirectory("game", "games");
  const apps = scanDirectory("app", "apps");

  const catalog = {
    generatedAt: new Date().toISOString(),
    games,
    apps,
  };

  const outDir = join(ROOT, "src", "catalog");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "catalog.json"), JSON.stringify(catalog, null, 2));

  console.log(`[catalog] Generated catalog: ${games.length} game(s), ${apps.length} app(s).`);
}

generate();
