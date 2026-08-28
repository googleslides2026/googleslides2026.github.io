import { settings } from "../state/settings.js";
import { favorites } from "../state/favorites.js";
import { recent } from "../state/recent.js";
import { createDropdown } from "../components/dropdown.js";
import { confirmDanger } from "../components/modal.js";
import { TAB_PRESETS, currentTabPreview } from "../utilities/tabCustomization.js";

function toggle(initialOn, onChange) {
  const btn = document.createElement("button");
  btn.className = "toggle" + (initialOn ? " on" : "");
  btn.setAttribute("role", "switch");
  btn.setAttribute("aria-checked", String(initialOn));
  btn.addEventListener("click", () => {
    const isOn = !btn.classList.contains("on");
    btn.classList.toggle("on", isOn);
    btn.setAttribute("aria-checked", String(isOn));
    onChange(isOn);
  });
  return btn;
}

function row(labelText, descText, control) {
  const el = document.createElement("div");
  el.className = "settings-row";
  const left = document.createElement("div");
  left.innerHTML = `<div class="settings-row-label">${labelText}</div>${descText ? `<div class="settings-row-desc">${descText}</div>` : ""}`;
  el.appendChild(left);
  const right = document.createElement("div");
  right.className = "settings-control";
  right.appendChild(control);
  el.appendChild(right);
  return el;
}

function section(title, danger = false) {
  const el = document.createElement("div");
  el.className = "settings-section" + (danger ? " danger-zone" : "");
  const h2 = document.createElement("h2");
  h2.textContent = title;
  el.appendChild(h2);
  return el;
}

export function renderSettings() {
  const page = document.createElement("div");
  page.className = "page";
  page.innerHTML = `<div class="page-header"><h1>Settings</h1></div>`;

  // ---------------- Appearance ----------------
  const appearance = section("Appearance");

  const themeDropdown = createDropdown({
    options: [
      { value: "dark", label: "Dark Mode" },
      { value: "light", label: "Light Mode" },
    ],
    value: settings.get().theme,
  });
  themeDropdown.addEventListener("change", (e) => settings.update({ theme: e.detail.value }));
  appearance.appendChild(row("Theme", "Dark mode is the default.", themeDropdown));

  const swatchWrap = document.createElement("div");
  swatchWrap.className = "color-swatches";
  const hues = [210, 260, 320, 0, 30, 150];
  hues.forEach((h) => {
    const sw = document.createElement("button");
    sw.className = "color-swatch" + (settings.get().accentHue === h ? " selected" : "");
    sw.style.background = `hsl(${h} 90% 60%)`;
    sw.addEventListener("click", () => {
      settings.update({ accentHue: h });
      [...swatchWrap.children].forEach((c) => c.classList.remove("selected"));
      sw.classList.add("selected");
    });
    swatchWrap.appendChild(sw);
  });
  appearance.appendChild(row("Accent Color", "Subtly affects buttons, focus states, and highlights.", swatchWrap));
  page.appendChild(appearance);

  // ---------------- Glow Border ----------------
  const glow = section("Glow Border");
  const g = settings.get().glow;

  glow.appendChild(
    row(
      "Glow Border",
      "Off by default â€” an animated glow around the edge of the site.",
      toggle(g.enabled, (on) => settings.update({ glow: { enabled: on } }))
    )
  );

  const presetDropdown = createDropdown({
    options: [
      { value: "rainbow", label: "Rainbow" },
      { value: "green-blue", label: "Green + Blue" },
      { value: "blue-purple", label: "Blue + Purple" },
      { value: "custom", label: "Custom" },
    ],
    value: g.preset,
  });
  presetDropdown.addEventListener("change", (e) => settings.update({ glow: { preset: e.detail.value } }));
  glow.appendChild(row("Preset", "", presetDropdown));

  const customColors = document.createElement("div");
  customColors.className = "row";
  const c1 = document.createElement("input");
  c1.type = "color";
  c1.value = g.customColor1;
  c1.addEventListener("input", () => settings.update({ glow: { customColor1: c1.value } }));
  const c2 = document.createElement("input");
  c2.type = "color";
  c2.value = g.customColor2;
  c2.addEventListener("input", () => settings.update({ glow: { customColor2: c2.value } }));
  customColors.append(c1, c2);
  glow.appendChild(row("Custom Colors", "Used when preset is set to Custom.", customColors));

  const gameGlowDropdown = createDropdown({
    options: [
      { value: "remove", label: "Remove During Game" },
      { value: "keep", label: "Keep During Game" },
    ],
    value: g.hideDuringGames ? "remove" : "keep",
  });
  gameGlowDropdown.addEventListener("change", (e) =>
    settings.update({ glow: { hideDuringGames: e.detail.value === "remove" } })
  );
  glow.appendChild(row("Glow Border While Playing", "", gameGlowDropdown));
  page.appendChild(glow);

  // ---------------- Browser Tab ----------------
  const tab = section("Browser Tab");
  const tabState = settings.get().tab;

  const tabDropdown = createDropdown({
    options: TAB_PRESETS.map((p) => ({ value: p.id, label: p.label })),
    value: tabState.preset,
  });
  tabDropdown.addEventListener("change", (e) => {
    settings.update({ tab: { preset: e.detail.value } });
    redrawCustomFields();
    redrawPreview();
  });
  tab.appendChild(row("Preset", "NULL-themed title + favicon presets.", tabDropdown));

  const customFieldsWrap = document.createElement("div");
  tab.appendChild(customFieldsWrap);

  function redrawCustomFields() {
    customFieldsWrap.innerHTML = "";
    if (settings.get().tab.preset !== "custom") return;

    const nameInput = document.createElement("input");
    nameInput.className = "input";
    nameInput.placeholder = "Custom tab title";
    nameInput.value = settings.get().tab.customTitle;
    nameInput.addEventListener("input", () => {
      settings.update({ tab: { customTitle: nameInput.value } });
      redrawPreview();
    });
    customFieldsWrap.appendChild(row("Custom Name", "", nameInput));

    const iconInput = document.createElement("input");
    iconInput.className = "input";
    iconInput.placeholder = "Icon URL, or upload below";
    iconInput.value = settings.get().tab.customIconUrl;
    iconInput.addEventListener("input", () => {
      settings.update({ tab: { customIconUrl: iconInput.value } });
      redrawPreview();
    });
    customFieldsWrap.appendChild(row("Custom Icon URL", "", iconInput));

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        settings.update({ tab: { customIconUrl: reader.result } });
        redrawPreview();
      };
      reader.readAsDataURL(file);
    });
    customFieldsWrap.appendChild(row("Upload Icon", "Automatically fits favicon dimensions.", fileInput));
  }
  redrawCustomFields();

  const previewWrap = document.createElement("div");
  tab.appendChild(row("Live Preview", "", previewWrap));

  function redrawPreview() {
    const { title, icon } = currentTabPreview();
    previewWrap.innerHTML = `<div class="tab-preview">${icon ? `<img src="${icon}" alt="" />` : ""}<span>${title}</span></div>`;
  }
  redrawPreview();

  page.appendChild(tab);

  // ---------------- Game Player ----------------
  const player = section("Game Player");
  const p = settings.get().player;

  player.appendChild(
    row(
      "Show Player Bar After Leaving Fullscreen",
      "When enabled, pressing Esc brings the top bar back automatically.",
      toggle(p.showBarAfterEsc, (on) => settings.update({ player: { showBarAfterEsc: on } }))
    )
  );
  player.appendChild(
    row(
      "Ask for verification before redirecting",
      "Warns before content tries to navigate you away from NULL.",
      toggle(p.confirmRedirect, (on) => settings.update({ player: { confirmRedirect: on } }))
    )
  );
  page.appendChild(player);

  // ---------------- Data ----------------
  const data = section("Data");
  const favBtn = document.createElement("a");
  favBtn.className = "btn";
  favBtn.href = "/favorites";
  favBtn.textContent = "View Favorites";
  data.appendChild(row("Favorites", `${favorites.list().length} saved`, favBtn));

  const recentBtn = document.createElement("a");
  recentBtn.className = "btn";
  recentBtn.href = "/recent";
  recentBtn.textContent = "View Recently Played";
  data.appendChild(row("Recently Played", `${recent.list().length} entries`, recentBtn));

  const backupsBtn = document.createElement("a");
  backupsBtn.className = "btn";
  backupsBtn.href = "/backups";
  backupsBtn.textContent = "Go to Backups";
  data.appendChild(row("Backups", "Export or import your local data.", backupsBtn));
  page.appendChild(data);

  // ---------------- Danger Zone ----------------
  const danger = section("Danger Zone", true);

  danger.appendChild(
    row(
      "Performance Mode",
      "Strips nonessential animation, blur, and shadows to save resources.",
      toggle(settings.get().performanceMode, (on) => {
        confirmDangerToggle(on, "enable Performance Mode", () => settings.update({ performanceMode: on }));
      })
    )
  );

  function confirmDangerToggle(desiredState, label, onConfirm) {
    confirmDanger({ actionText: `Are you sure you want to ${label}?`, onConfirm });
  }

  const clearFavBtn = document.createElement("button");
  clearFavBtn.className = "btn btn-danger-outline";
  clearFavBtn.textContent = "Clear Favorites";
  clearFavBtn.addEventListener("click", () =>
    confirmDanger({ actionText: "Are you sure you want to clear all favorites?", onConfirm: () => favorites.clear() })
  );
  danger.appendChild(row("Clear Favorites", "", clearFavBtn));

  const clearRecentBtn = document.createElement("button");
  clearRecentBtn.className = "btn btn-danger-outline";
  clearRecentBtn.textContent = "Clear Recently Played";
  clearRecentBtn.addEventListener("click", () =>
    confirmDanger({ actionText: "Are you sure you want to clear recently played?", onConfirm: () => recent.clear() })
  );
  danger.appendChild(row("Clear Recently Played", "", clearRecentBtn));

  const clearLsBtn = document.createElement("button");
  clearLsBtn.className = "btn btn-danger-outline";
  clearLsBtn.textContent = "Clear LocalStorage";
  clearLsBtn.addEventListener("click", () =>
    confirmDanger({
      actionText: "Are you sure you want to clear LocalStorage? This removes settings, favorites, and recently played.",
      onConfirm: () => {
        localStorage.clear();
        location.reload();
      },
    })
  );
  danger.appendChild(row("Clear LocalStorage", "Removes all local NULL data.", clearLsBtn));

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn btn-danger-filled";
  resetBtn.textContent = "Reset NULL";
  resetBtn.addEventListener("click", () =>
    confirmDanger({
      actionText: "Are you sure you want to reset NULL to its defaults? Onboarding will show again.",
      onConfirm: () => {
        settings.reset();
        favorites.clear();
        recent.clear();
        location.reload();
      },
    })
  );
  danger.appendChild(row("Reset NULL", "Restores all local settings and data to defaults.", resetBtn));

  page.appendChild(danger);

  return page;
}
