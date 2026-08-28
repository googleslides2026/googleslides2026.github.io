import { catalog } from "../catalog/catalog.js";
import { icon } from "../utilities/icons.js";
import { navigate } from "../routing/router.js";
import { recent } from "../state/recent.js";
import { settings } from "../state/settings.js";
import { setPlayerActive } from "../components/glow.js";
import { showModal } from "../components/modal.js";

export function renderPlayer(kind, id, listRoute) {
  const item = catalog.getById(kind, id);

  if (!item) {
    const empty = document.createElement("div");
    empty.className = "page";
    empty.innerHTML = `<div class="empty-state"><p>That ${kind} couldn't be found.</p></div>`;
    return empty;
  }

  if (kind === "game") recent.record(item.id);
  setPlayerActive(true);

  const shell = document.createElement("div");
  shell.className = "player-shell";

  const topbar = document.createElement("div");
  topbar.className = "player-topbar";

  const backBtn = document.createElement("button");
  backBtn.className = "btn btn-icon";
  backBtn.setAttribute("aria-label", "Back");
  backBtn.innerHTML = icon("back");
  backBtn.addEventListener("click", () => navigate(listRoute));
  topbar.appendChild(backBtn);

  const title = document.createElement("div");
  title.className = "player-title";
  title.textContent = item.title;
  topbar.appendChild(title);

  const actions = document.createElement("div");
  actions.className = "player-actions";

  const reloadBtn = document.createElement("button");
  reloadBtn.className = "btn btn-icon";
  reloadBtn.setAttribute("aria-label", "Reload");
  reloadBtn.innerHTML = icon("reload");
  actions.appendChild(reloadBtn);

  const fullscreenBtn = document.createElement("button");
  fullscreenBtn.className = "btn btn-icon";
  fullscreenBtn.setAttribute("aria-label", "Fullscreen");
  fullscreenBtn.innerHTML = icon("fullscreen");
  actions.appendChild(fullscreenBtn);

  topbar.appendChild(actions);
  shell.appendChild(topbar);

  const frameWrap = document.createElement("div");
  frameWrap.className = "player-frame-wrap";
  const iframe = document.createElement("iframe");
  iframe.src = item.htmlPath;
  iframe.title = item.title;
  // Content is treated as untrusted: sandboxed, with only the
  // capabilities a game plausibly needs, and no automatic permission
  // grants (section 84/44).
  iframe.setAttribute(
    "sandbox",
    "allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-modals"
  );
  iframe.allow = "fullscreen; gamepad";
  frameWrap.appendChild(iframe);
  shell.appendChild(frameWrap);

  reloadBtn.addEventListener("click", () => {
    iframe.src = iframe.src;
  });

  fullscreenBtn.addEventListener("click", () => {
    if (frameWrap.requestFullscreen) frameWrap.requestFullscreen();
  });

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      const showBar = settings.get().player.showBarAfterEsc;
      topbar.style.display = showBar ? "flex" : "none";
    } else {
      topbar.style.display = "none";
    }
  });

  // Section 45/46: warn before leaving NULL if content tries to navigate
  // the top-level page. We can only reliably intercept same-origin
  // postMessage-based requests and the browser's native beforeunload
  // prompt â€” we don't claim to catch every possible navigation.
  function beforeUnload(e) {
    if (!settings.get().player.confirmRedirect) return;
    e.preventDefault();
    e.returnValue = "";
  }
  window.addEventListener("beforeunload", beforeUnload);

  shell._cleanup = () => {
    window.removeEventListener("beforeunload", beforeUnload);
    setPlayerActive(false);
  };

  return shell;
}
