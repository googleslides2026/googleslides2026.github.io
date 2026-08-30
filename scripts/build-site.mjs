// Generates the entire NULL site as plain, separate HTML files — one
// real file per route, each a normal document with a classic (non-
// module) <script> tag. No client-side router, no ES modules, so it
// works whether opened directly from disk or served by GitHub Pages.
//
// Run with: npm run build

import { writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildCatalog, writeCatalogJs, ROOT } from "./generate-catalog.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, "dist");

function shell({ prefix, route, title, bodyInit }) {
  return `<!doctype html>
<html lang="en" data-prefix="${prefix}" data-route="${route}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="icon" id="null-favicon" href="${prefix}favicons/default.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="${prefix}assets/styles.css" />
</head>
<body>
  <div id="app"></div>
  <script src="${prefix}assets/catalog.js"></script>
  <script src="${prefix}assets/app.js"></script>
  <script>${bodyInit}</script>
</body>
</html>
`;
}

function writeFileEnsured(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

export function buildSite() {
  if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  const catalog = buildCatalog();

  // assets/ + favicons/ are plain static files — copy verbatim.
  cpSync(join(ROOT, "public", "favicons"), join(DIST, "favicons"), { recursive: true });
  cpSync(join(ROOT, "public", "assets"), join(DIST, "assets"), { recursive: true });
  // catalog.js gets (re)written fresh so it always reflects the current
  // games/apps folders, even if public/assets/catalog.js was stale.
  writeCatalogJs(catalog);
  cpSync(join(ROOT, "public", "assets", "catalog.js"), join(DIST, "assets", "catalog.js"));

  // Raw game/app content folders (the user's own files) — copied as-is.
  if (existsSync(join(ROOT, "games"))) cpSync(join(ROOT, "games"), join(DIST, "games"), { recursive: true });
  if (existsSync(join(ROOT, "apps"))) cpSync(join(ROOT, "apps"), join(DIST, "apps"), { recursive: true });

  // ---- depth 0: home ----
  writeFileEnsured(
    join(DIST, "index.html"),
    shell({
      prefix: "./",
      route: "",
      title: "NULL",
      bodyInit: `NULLAPP.boot(function(prefix){ return NULLAPP.renderHome(prefix); });`,
    })
  );

  // ---- depth 0: 404 (GitHub Pages serves this automatically for any unknown path) ----
  writeFileEnsured(
    join(DIST, "404.html"),
    shell({
      prefix: "./",
      route: "",
      title: "NULL — 404",
      bodyInit: `NULLAPP.boot(function(prefix){ return NULLAPP.renderNotFoundPage(prefix); });`,
    })
  );

  // ---- depth 1: top-level routes ----
  const depth1Pages = [
    { route: "games/", title: "NULL — Games", body: `NULLAPP.renderGamesPage(prefix, "all")` },
    { route: "apps/", title: "NULL — Apps", body: `NULLAPP.renderAppsPage(prefix)` },
    { route: "favorites/", title: "NULL — Favorites", body: `NULLAPP.renderGamesPage(prefix, "favorites")` },
    { route: "recent/", title: "NULL — Recently Played", body: `NULLAPP.renderGamesPage(prefix, "recent")` },
    { route: "announcements/", title: "NULL — Announcements", body: `NULLAPP.renderAnnouncementsPage()` },
    { route: "schedule/", title: "NULL — Schedule", body: `NULLAPP.renderSchedulePage()` },
    { route: "backups/", title: "NULL — Backups", body: `NULLAPP.renderBackupsPage()` },
    { route: "settings/", title: "NULL — Settings", body: `NULLAPP.renderSettingsPage(prefix)` },
    { route: "about/", title: "NULL — About", body: `NULLAPP.renderStaticPage("About")` },
    { route: "privacy/", title: "NULL — Privacy", body: `NULLAPP.renderStaticPage("Privacy Policy", 4)` },
    { route: "terms/", title: "NULL — Terms", body: `NULLAPP.renderStaticPage("Terms of Service", 5)` },
    { route: "cookies/", title: "NULL — Cookies", body: `NULLAPP.renderStaticPage("Cookie Policy", 2)` },
    { route: "district/", title: "NULL — District Statement", body: `NULLAPP.renderStaticPage("District Statement", 2)` },
    { route: "license/", title: "NULL — License", body: `NULLAPP.renderLicensePage()` },
  ];
  for (const p of depth1Pages) {
    writeFileEnsured(
      join(DIST, p.route, "index.html"),
      shell({
        prefix: "../",
        route: p.route,
        title: p.title,
        bodyInit: `NULLAPP.boot(function(prefix){ return ${p.body}; });`,
      })
    );
  }

  // ---- depth 2: per-game / per-app player pages ----
  // Generated INTO the same folder as the raw content (e.g.
  // games/hollow-knight/index.html sits next to hollow-knight.html),
  // so the iframe can reference the raw file by its bare filename with
  // zero path ambiguity.
  function buildPlayerPages(items, kind, listRoute) {
    for (const item of items) {
      const outPath = join(DIST, item.route, "index.html");
      const html = shell({
        prefix: "../../",
        route: "",
        title: `NULL — ${item.title}`,
        bodyInit: `NULLAPP.bootPlayer(function(prefix){ return NULLAPP.renderPlayerPage(prefix, ${JSON.stringify(kind)}, ${JSON.stringify(item.id)}, ${JSON.stringify(listRoute)}, ${JSON.stringify(item.htmlFile)}); });`,
      });
      writeFileEnsured(outPath, html);
    }
  }
  buildPlayerPages(catalog.games, "game", "../../games/");
  buildPlayerPages(catalog.apps, "app", "../../apps/");

  console.log(`[build-site] Built ${2 + depth1Pages.length + catalog.games.length + catalog.apps.length} pages into dist/`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildSite();
}
