import "./styles/variables.css";
import "./styles/base.css";
import "./styles/components.css";

import { route, startRouter, setNotFound, navigate } from "./routing/router.js";
import { renderTopbar } from "./components/topbar.js";
import { renderFooter } from "./components/footer.js";
import { mountGlowBorder } from "./components/glow.js";
import { maybeShowMobileWarning } from "./components/mobileWarning.js";
import { maybeShowOnboarding } from "./components/onboarding.js";
import { settings } from "./state/settings.js";
import { applyTabCustomization } from "./utilities/tabCustomization.js";

import { renderHome } from "./pages/home.js";
import { renderGames } from "./pages/games.js";
import { renderApps } from "./pages/apps.js";
import { renderPlayer } from "./pages/player.js";
import { renderAnnouncements } from "./pages/announcements.js";
import { renderSchedulePage } from "./pages/schedule.js";
import { renderBackups } from "./pages/backups.js";
import { renderSettings } from "./pages/settings.js";
import { renderStaticPage } from "./pages/staticPage.js";
import { renderLicense } from "./pages/license.js";
import { renderNotFound } from "./pages/notfound.js";

const app = document.getElementById("app");
let currentPageCleanup = null;

function applyGlobalTheme() {
  const s = settings.get();
  document.documentElement.dataset.theme = s.theme;
  document.documentElement.dataset.performance = s.performanceMode ? "on" : "off";
  document.documentElement.style.setProperty("--accent-h", s.accentHue);
}
applyGlobalTheme();
applyTabCustomization();
settings.onChange(() => {
  applyGlobalTheme();
});

function renderLayout(pageEl) {
  if (currentPageCleanup) {
    currentPageCleanup();
    currentPageCleanup = null;
  }
  app.innerHTML = "";
  app.appendChild(renderTopbar());

  const main = document.createElement("main");
  main.appendChild(pageEl);
  app.appendChild(main);

  app.appendChild(renderFooter());

  if (pageEl._cleanup) currentPageCleanup = pageEl._cleanup;
}

// A dedicated full-bleed layout for the game/app player (still shares
// the footer/topbar-free shell so the player top bar reads as part of
// the same application per section 39).
function renderFullBleed(pageEl) {
  if (currentPageCleanup) {
    currentPageCleanup();
    currentPageCleanup = null;
  }
  app.innerHTML = "";
  app.appendChild(pageEl);
  if (pageEl._cleanup) currentPageCleanup = pageEl._cleanup;
}

route("/", () => renderLayout(renderHome()));
route("/games", () => renderLayout(renderGames({ mode: "all" })));
route("/apps", () => renderLayout(renderApps()));
route("/favorites", () => renderLayout(renderGames({ mode: "favorites" })));
route("/recent", () => renderLayout(renderGames({ mode: "recent" })));
route("/announcements", () => renderLayout(renderAnnouncements()));
route("/schedule", () => renderLayout(renderSchedulePage()));
route("/backups", () => renderLayout(renderBackups()));
route("/settings", () => renderLayout(renderSettings()));

route("/games/:id", (params) => renderFullBleed(renderPlayer("game", params.id, "/games")));
route("/apps/:id", (params) => renderFullBleed(renderPlayer("app", params.id, "/apps")));

route("/about", () => renderLayout(renderStaticPage("About")));
route("/privacy", () => renderLayout(renderStaticPage("Privacy Policy", 4)));
route("/terms", () => renderLayout(renderStaticPage("Terms of Service", 5)));
route("/cookies", () => renderLayout(renderStaticPage("Cookie Policy", 2)));
route("/district", () => renderLayout(renderStaticPage("District Statement", 2)));
route("/license", () => renderLayout(renderLicense()));

setNotFound(() => renderLayout(renderNotFound()));
route("/404", () => renderLayout(renderNotFound()));

mountGlowBorder();
startRouter();
maybeShowMobileWarning();
maybeShowOnboarding();
