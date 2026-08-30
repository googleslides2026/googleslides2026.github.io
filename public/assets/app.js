/* NULL — single classic-script app file. No ES modules, no bundler.
   Every page includes this file with a plain <script src="...assets/app.js">
   tag, then calls NULLAPP.boot() once the page's own <html data-*> config
   attributes are in place. Everything lives on the NULLAPP namespace to
   avoid polluting globals. */
(function () {
  "use strict";

  var NULLAPP = {};
  window.NULLAPP = NULLAPP;

  // ---------------------------------------------------------------
  // ICONS
  // ---------------------------------------------------------------
  function wrap(paths, viewBox) {
    viewBox = viewBox || "0 0 24 24";
    return '<svg viewBox="' + viewBox + '" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + "</svg>";
  }
  var ICON_DEFS = {
    home: wrap('<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9"/>'),
    games: wrap('<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="16" cy="11.5" r="0.9" fill="currentColor"/><circle cx="18.2" cy="13.5" r="0.9" fill="currentColor"/>'),
    apps: wrap('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
    announcements: wrap('<path d="M4 10v4a1 1 0 0 0 1 1h2l4 4V5L7 9H5a1 1 0 0 0-1 1Z"/><path d="M16 9a3 3 0 0 1 0 6"/><path d="M18.5 6.5a7 7 0 0 1 0 11"/>'),
    schedule: wrap('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>'),
    backups: wrap('<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/>'),
    settings: wrap('<circle cx="12" cy="12" r="3"/><path d="M19.4 13a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V19a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1Z"/>'),
    search: wrap('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    starOutline: wrap('<path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17.1l-5.6 3 1.4-6.3-4.8-4.3 6.4-.6Z"/>'),
    starFilled: wrap('<path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17.1l-5.6 3 1.4-6.3-4.8-4.3 6.4-.6Z" fill="currentColor"/>'),
    back: wrap('<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>'),
    reload: wrap('<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 4v5h-5"/>'),
    fullscreen: wrap('<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>'),
    menu: wrap('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    close: wrap('<path d="m6 6 12 12M18 6 6 18"/>'),
    warning: wrap('<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4"/><circle cx="12" cy="17" r="0.9" fill="currentColor"/>'),
    chevronDown: wrap('<path d="m6 9 6 6 6-6"/>'),
    image: wrap('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 15-5-5-9 9"/>'),
    dice: wrap('<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="16" cy="16" r="1.1" fill="currentColor"/><circle cx="12" cy="12" r="1.1" fill="currentColor"/>'),
  };
  function icon(name, cls) {
    var svg = ICON_DEFS[name] || "";
    if (cls) svg = svg.replace("<svg ", '<svg class="' + cls + '" ');
    return svg;
  }
  NULLAPP.icon = icon;

  // ---------------------------------------------------------------
  // LOCAL STATE (settings / favorites / recent / plays)
  // ---------------------------------------------------------------
  function deepMerge(base, override) {
    var out = {};
    for (var k in base) out[k] = base[k];
    for (var k2 in override) {
      if (override[k2] && typeof override[k2] === "object" && !Array.isArray(override[k2])) {
        out[k2] = deepMerge(base[k2] || {}, override[k2]);
      } else {
        out[k2] = override[k2];
      }
    }
    return out;
  }

  var SETTINGS_DEFAULTS = {
    theme: "dark",
    accentHue: 210,
    performanceMode: false,
    glow: {
      enabled: false,
      preset: "rainbow",
      customColor1: "#00e676",
      customColor2: "#00c8ff",
      intensity: 1,
      speed: 1,
      hideDuringGames: true,
    },
    player: { showBarAfterEsc: true, confirmRedirect: true },
    tab: { preset: "default", customTitle: "", customIconUrl: "" },
    accessibility: { forceReducedMotion: false, underlineLinks: false, textScale: "normal" },
    mobileWarningDismissed: false,
    onboardingCompleted: false,
  };

  var SETTINGS_KEY = "null_settings_v1";
  var settingsState = loadSettings();
  function loadSettings() {
    try {
      var raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return JSON.parse(JSON.stringify(SETTINGS_DEFAULTS));
      return deepMerge(JSON.parse(JSON.stringify(SETTINGS_DEFAULTS)), JSON.parse(raw));
    } catch (e) {
      return JSON.parse(JSON.stringify(SETTINGS_DEFAULTS));
    }
  }
  var settingsListeners = [];
  function persistSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsState));
    settingsListeners.forEach(function (cb) {
      cb(settingsState);
    });
  }
  var settings = {
    get: function () {
      return settingsState;
    },
    update: function (patch) {
      settingsState = deepMerge(settingsState, patch);
      persistSettings();
      return settingsState;
    },
    reset: function () {
      settingsState = JSON.parse(JSON.stringify(SETTINGS_DEFAULTS));
      persistSettings();
      return settingsState;
    },
    onChange: function (cb) {
      settingsListeners.push(cb);
    },
  };
  NULLAPP.settings = settings;

  function makeSetStorage(key) {
    var data;
    try {
      data = new Set(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch (e) {
      data = new Set();
    }
    return {
      has: function (id) {
        return data.has(id);
      },
      toggle: function (id) {
        if (data.has(id)) data.delete(id);
        else data.add(id);
        localStorage.setItem(key, JSON.stringify(Array.from(data)));
        return data.has(id);
      },
      list: function () {
        return Array.from(data);
      },
      clear: function () {
        data = new Set();
        localStorage.setItem(key, JSON.stringify([]));
      },
    };
  }
  var favorites = makeSetStorage("null_favorites_v1");
  NULLAPP.favorites = favorites;

  function makeRecent(key, max) {
    var entries;
    try {
      entries = JSON.parse(localStorage.getItem(key) || "[]");
    } catch (e) {
      entries = [];
    }
    return {
      record: function (id) {
        entries = entries.filter(function (e) {
          return e.id !== id;
        });
        entries.unshift({ id: id, timestamp: Date.now() });
        entries = entries.slice(0, max);
        localStorage.setItem(key, JSON.stringify(entries));
      },
      list: function () {
        return entries;
      },
      clear: function () {
        entries = [];
        localStorage.setItem(key, JSON.stringify([]));
      },
    };
  }
  var recent = makeRecent("null_recent_v1", 60);
  NULLAPP.recent = recent;

  function makePlays(key) {
    var counts;
    try {
      counts = JSON.parse(localStorage.getItem(key) || "{}");
    } catch (e) {
      counts = {};
    }
    return {
      record: function (id) {
        counts[id] = (counts[id] || 0) + 1;
        localStorage.setItem(key, JSON.stringify(counts));
      },
      countFor: function (id) {
        return counts[id] || 0;
      },
      all: function () {
        return JSON.parse(JSON.stringify(counts));
      },
      clear: function () {
        counts = {};
        localStorage.setItem(key, JSON.stringify({}));
      },
    };
  }
  var plays = makePlays("null_plays_v1");
  NULLAPP.plays = plays;

  // ---------------------------------------------------------------
  // SCHEDULE ENGINE
  // Edit SCHEDULE below to match a real school day. 24-hour "HH:MM".
  // Mark an entry `passing: true` to have it count for timing without
  // showing up as its own visible entry.
  // ---------------------------------------------------------------
  var SCHEDULE = [
    { name: "Period 1", start: "08:00", end: "08:50" },
    { name: "Passing", start: "08:50", end: "08:55", passing: true },
    { name: "Period 2", start: "08:55", end: "09:45" },
    { name: "Passing", start: "09:45", end: "09:50", passing: true },
    { name: "Period 3", start: "09:50", end: "10:40" },
    { name: "Passing", start: "10:40", end: "10:45", passing: true },
    { name: "Period 4", start: "10:45", end: "11:35" },
    { name: "Lunch", start: "11:35", end: "12:05" },
    { name: "Period 5", start: "12:05", end: "12:55" },
    { name: "Passing", start: "12:55", end: "13:00", passing: true },
    { name: "Period 6", start: "13:00", end: "13:50" },
    { name: "Passing", start: "13:50", end: "13:55", passing: true },
    { name: "Period 7", start: "13:55", end: "14:45" },
    { name: "Passing", start: "14:45", end: "14:50", passing: true },
    { name: "Period 8", start: "14:50", end: "15:40" },
  ];
  NULLAPP.SCHEDULE = SCHEDULE;

  function toMinutes(hhmm) {
    var parts = hhmm.split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
  }
  function getScheduleState(now) {
    now = now || new Date();
    var nowMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    if (!SCHEDULE.length) return { state: "after-school" };
    var first = SCHEDULE[0];
    var last = SCHEDULE[SCHEDULE.length - 1];
    if (nowMinutes < toMinutes(first.start)) {
      return { state: "before-school", secondsUntilStart: Math.round((toMinutes(first.start) - nowMinutes) * 60) };
    }
    if (nowMinutes >= toMinutes(last.end)) {
      return { state: "after-school" };
    }
    for (var i = 0; i < SCHEDULE.length; i++) {
      var entry = SCHEDULE[i];
      var start = toMinutes(entry.start);
      var end = toMinutes(entry.end);
      if (nowMinutes >= start && nowMinutes < end) {
        var secondsLeft = Math.round((end - nowMinutes) * 60);
        var next = null;
        for (var j = i + 1; j < SCHEDULE.length; j++) {
          if (!SCHEDULE[j].passing) {
            next = SCHEDULE[j];
            break;
          }
        }
        return { state: "in-period", current: entry, secondsLeft: secondsLeft, next: next };
      }
    }
    return { state: "after-school" };
  }
  function formatMinSec(totalSeconds) {
    var m = Math.floor(totalSeconds / 60);
    var s = totalSeconds % 60;
    return m + ":" + String(s).padStart(2, "0");
  }
  function formatHMS(totalSeconds) {
    var h = Math.floor(totalSeconds / 3600);
    var m = Math.floor((totalSeconds % 3600) / 60);
    var s = totalSeconds % 60;
    return h + "h " + String(m).padStart(2, "0") + "m " + String(s).padStart(2, "0") + "s";
  }
  function visibleSchedule() {
    return SCHEDULE.filter(function (e) {
      return !e.passing;
    });
  }
  NULLAPP.schedule = {
    getState: getScheduleState,
    formatMinSec: formatMinSec,
    formatHMS: formatHMS,
    visible: visibleSchedule,
  };

  // ---------------------------------------------------------------
  // TAB CUSTOMIZATION (generic NULL-themed presets only)
  // ---------------------------------------------------------------
  var TAB_PRESETS = [
    { id: "default", label: "Default (NULL)", title: "NULL", icon: "favicons/default.svg" },
    { id: "null-1", label: "NULL 1", title: "NULL — 01", icon: "favicons/null-1.svg" },
    { id: "null-2", label: "NULL 2", title: "NULL — 02", icon: "favicons/null-2.svg" },
    { id: "null-3", label: "NULL 3", title: "NULL — 03", icon: "favicons/null-3.svg" },
    { id: "null-4", label: "NULL 4", title: "NULL — 04", icon: "favicons/null-4.svg" },
    { id: "null-5", label: "NULL 5", title: "NULL — 05", icon: "favicons/null-5.svg" },
    { id: "null-6", label: "NULL 6", title: "NULL — 06", icon: "favicons/null-6.svg" },
    { id: "null-7", label: "NULL 7", title: "NULL — 07", icon: "favicons/null-7.svg" },
    { id: "null-8", label: "NULL 8", title: "NULL — 08", icon: "favicons/null-8.svg" },
    { id: "null-9", label: "NULL 9", title: "NULL — 09", icon: "favicons/null-9.svg" },
    { id: "null-10", label: "NULL 10", title: "NULL — 10", icon: "favicons/null-10.svg" },
    { id: "custom", label: "Custom", title: "", icon: "" },
  ];
  NULLAPP.TAB_PRESETS = TAB_PRESETS;

  function currentTabPreview(prefix) {
    var tab = settings.get().tab;
    var preset = null;
    for (var i = 0; i < TAB_PRESETS.length; i++) {
      if (TAB_PRESETS[i].id === tab.preset) preset = TAB_PRESETS[i];
    }
    preset = preset || TAB_PRESETS[0];
    if (tab.preset === "custom") {
      return { title: tab.customTitle || "NULL", icon: tab.customIconUrl || prefix + "favicons/default.svg" };
    }
    return { title: preset.title, icon: prefix + preset.icon };
  }
  NULLAPP.currentTabPreview = currentTabPreview;

  function applyTabCustomization(prefix) {
    var p = currentTabPreview(prefix);
    document.title = p.title;
    var link = document.getElementById("null-favicon");
    if (link && p.icon) link.href = p.icon;
  }
  NULLAPP.applyTabCustomization = applyTabCustomization;

  // ---------------------------------------------------------------
  // GLOBAL THEME APPLICATION
  // ---------------------------------------------------------------
  var playerActive = false;
  function applyGlobalTheme(prefix) {
    var s = settings.get();
    document.documentElement.dataset.theme = s.theme;
    document.documentElement.dataset.performance = s.performanceMode ? "on" : "off";
    document.documentElement.style.setProperty("--accent-h", s.accentHue);
    document.documentElement.dataset.reduceMotion = s.accessibility.forceReducedMotion ? "on" : "off";
    document.documentElement.dataset.underlineLinks = s.accessibility.underlineLinks ? "on" : "off";
    var scaleMap = { normal: "100%", large: "112%", "extra-large": "125%" };
    document.documentElement.style.setProperty("--text-scale", scaleMap[s.accessibility.textScale] || "100%");
    applyTabCustomization(prefix);
    applyGlow();
  }
  NULLAPP.applyGlobalTheme = applyGlobalTheme;
  NULLAPP.setPlayerActive = function (active) {
    playerActive = active;
    applyGlow();
  };

  // ---------------------------------------------------------------
  // GLOW BORDER
  // ---------------------------------------------------------------
  var glowEl = null;
  function mountGlowBorder() {
    glowEl = document.createElement("div");
    glowEl.className = "glow-border";
    document.body.appendChild(glowEl);
    applyGlow();
  }
  function applyGlow() {
    if (!glowEl) return;
    var s = settings.get().glow;
    var shouldHide = playerActive && s.hideDuringGames;
    var active = s.enabled && !shouldHide;
    glowEl.classList.toggle("active", active);
    glowEl.classList.remove("rainbow", "duo");
    glowEl.style.removeProperty("--glow-c1");
    glowEl.style.removeProperty("--glow-c2");
    if (!active) return;
    if (s.preset === "rainbow") {
      glowEl.classList.add("rainbow");
    } else if (s.preset === "green-blue") {
      glowEl.classList.add("duo");
      glowEl.style.setProperty("--glow-c1", "#00e676");
      glowEl.style.setProperty("--glow-c2", "#00c8ff");
    } else if (s.preset === "blue-purple") {
      glowEl.classList.add("duo");
      glowEl.style.setProperty("--glow-c1", "#2979ff");
      glowEl.style.setProperty("--glow-c2", "#7c4dff");
    } else if (s.preset === "custom") {
      glowEl.classList.add("duo");
      glowEl.style.setProperty("--glow-c1", s.customColor1);
      glowEl.style.setProperty("--glow-c2", s.customColor2);
    }
    glowEl.style.animationDuration = 6 / (s.speed || 1) + "s";
    glowEl.style.opacity = String(0.4 + 0.6 * (s.intensity || 1));
  }
  settings.onChange(applyGlow);
  NULLAPP.mountGlowBorder = mountGlowBorder;

  // ---------------------------------------------------------------
  // CUSTOM DROPDOWN
  // ---------------------------------------------------------------
  var openDropdownCloser = null;
  function createDropdown(opts) {
    var options = opts.options,
      value = opts.value,
      ariaLabel = opts.ariaLabel || "";
    var root = document.createElement("div");
    root.className = "dropdown";

    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "dropdown-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    if (ariaLabel) trigger.setAttribute("aria-label", ariaLabel);
    var labelSpan = document.createElement("span");
    trigger.appendChild(labelSpan);
    var chevron = document.createElement("span");
    chevron.innerHTML = icon("chevronDown", "chevron");
    trigger.appendChild(chevron);
    root.appendChild(trigger);

    var current = value;
    var menu = null;

    function labelFor(v) {
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === v) return options[i].label;
      }
      return "";
    }
    function renderLabel() {
      labelSpan.textContent = labelFor(current);
    }
    function closeMenu() {
      if (menu) {
        menu.remove();
        menu = null;
      }
      trigger.setAttribute("aria-expanded", "false");
      if (openDropdownCloser === closeMenu) openDropdownCloser = null;
      document.removeEventListener("click", onDocClick, true);
      document.removeEventListener("keydown", onKeydown, true);
    }
    function onDocClick(e) {
      if (!root.contains(e.target)) closeMenu();
    }
    function onKeydown(e) {
      if (e.key === "Escape") {
        closeMenu();
        trigger.focus();
      }
    }
    function openMenu() {
      if (openDropdownCloser) openDropdownCloser();
      menu = document.createElement("div");
      menu.className = "dropdown-menu";
      menu.setAttribute("role", "listbox");
      options.forEach(function (opt) {
        var el = document.createElement("div");
        el.className = "dropdown-option";
        el.setAttribute("role", "option");
        el.tabIndex = 0;
        el.setAttribute("aria-selected", String(opt.value === current));
        el.textContent = opt.label;
        el.addEventListener("click", function () {
          setValue(opt.value, true);
          closeMenu();
          trigger.focus();
        });
        el.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setValue(opt.value, true);
            closeMenu();
            trigger.focus();
          }
        });
        menu.appendChild(el);
      });
      root.appendChild(menu);
      trigger.setAttribute("aria-expanded", "true");
      openDropdownCloser = closeMenu;
      document.addEventListener("click", onDocClick, true);
      document.addEventListener("keydown", onKeydown, true);
    }
    trigger.addEventListener("click", function () {
      if (menu) closeMenu();
      else openMenu();
    });
    function setValue(v, fire) {
      current = v;
      renderLabel();
      if (fire) root.dispatchEvent(new CustomEvent("change", { detail: { value: v } }));
    }
    root.setValue = setValue;
    root.getValue = function () {
      return current;
    };
    renderLabel();
    return root;
  }
  NULLAPP.createDropdown = createDropdown;

  // ---------------------------------------------------------------
  // MODAL
  // ---------------------------------------------------------------
  function showModal(opts) {
    var backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    var card = document.createElement("div");
    card.className = "modal-card" + (opts.danger ? " danger" : "");
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-modal", "true");
    var h2 = document.createElement("h2");
    h2.textContent = opts.title;
    card.appendChild(h2);
    if (opts.body) {
      var p = document.createElement("p");
      p.textContent = opts.body;
      card.appendChild(p);
    }
    var actionsRow = document.createElement("div");
    actionsRow.className = "modal-actions";
    function close() {
      backdrop.remove();
      document.removeEventListener("keydown", onKeydown);
    }
    function onKeydown(e) {
      if (e.key === "Escape") close();
    }
    (opts.actions || []).forEach(function (a) {
      var btn = document.createElement("button");
      btn.className = "btn " + (a.className || "");
      btn.textContent = a.label;
      btn.addEventListener("click", function () {
        if (a.onClick) a.onClick();
        if (a.closeOnClick !== false) close();
      });
      actionsRow.appendChild(btn);
    });
    card.appendChild(actionsRow);
    backdrop.appendChild(card);
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) close();
    });
    document.addEventListener("keydown", onKeydown);
    document.body.appendChild(backdrop);
    var firstBtn = actionsRow.querySelector("button");
    if (firstBtn) firstBtn.focus();
    return { close: close };
  }
  NULLAPP.showModal = showModal;

  function confirmDanger(opts) {
    showModal({
      title: "Are you sure?",
      body: opts.actionText,
      danger: true,
      actions: [
        { label: "Back", className: "btn-danger-filled" },
        { label: "Yes", className: "btn-danger-outline", onClick: opts.onConfirm },
      ],
    });
  }
  NULLAPP.confirmDanger = confirmDanger;

  // ---------------------------------------------------------------
  // CATALOG HELPERS
  // window.NULL_CATALOG is written by a generated <script> (assets/catalog.js)
  // that every page includes before this file. Routes/paths inside it are
  // root-relative WITHOUT a leading slash (e.g. "games/hollow-knight/"),
  // so every link/asset URL is built as PREFIX + item.route etc, where
  // PREFIX is this page's own relative path back to the site root.
  // ---------------------------------------------------------------
  function getCatalog() {
    return window.NULL_CATALOG || { games: [], apps: [] };
  }
  NULLAPP.catalog = {
    all: function () {
      var c = getCatalog();
      return c.games.concat(c.apps);
    },
    games: function () {
      return getCatalog().games;
    },
    apps: function () {
      return getCatalog().apps;
    },
    getById: function (kind, id) {
      var list = kind === "game" ? getCatalog().games : getCatalog().apps;
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
      return null;
    },
    randomGame: function () {
      var games = getCatalog().games;
      if (!games.length) return null;
      return games[Math.floor(Math.random() * games.length)];
    },
    search: function (query) {
      var q = query.trim().toLowerCase();
      if (!q) return [];
      return this.all().filter(function (item) {
        if (item.title.toLowerCase().indexOf(q) !== -1) return true;
        return (item.labels || []).some(function (l) {
          return l.toLowerCase().indexOf(q) !== -1;
        });
      });
    },
    sortGames: function (list, mode, playCounts) {
      playCounts = playCounts || {};
      var copy = list.slice();
      if (mode === "az") return copy.sort(function (a, b) { return a.title.localeCompare(b.title); });
      if (mode === "za") return copy.sort(function (a, b) { return b.title.localeCompare(a.title); });
      if (mode === "newest") return copy; // catalog is generated in folder-scan order; top of folder = newest
      return copy.sort(function (a, b) { return (playCounts[b.id] || 0) - (playCounts[a.id] || 0); }); // popular
    },
    filterByLabel: function (list, label) {
      if (!label || label === "all") return list;
      return list.filter(function (item) {
        return (item.labels || []).indexOf(label) !== -1;
      });
    },
    allLabels: function (list) {
      var set = {};
      list.forEach(function (item) {
        (item.labels || []).forEach(function (l) {
          set[l] = true;
        });
      });
      var out = ["all"];
      Object.keys(set).sort().forEach(function (l) {
        out.push(l);
      });
      return out;
    },
  };

  // ---------------------------------------------------------------
  // GAME / APP CARD
  // ---------------------------------------------------------------
  function createCard(item, prefix) {
    var card = document.createElement("div");
    card.className = "game-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", item.title);

    var thumbWrap = document.createElement("div");
    thumbWrap.className = "game-thumb-wrap";
    function fallback() {
      var el = document.createElement("div");
      el.className = "game-thumb-fallback";
      el.innerHTML = icon("image");
      return el;
    }
    if (item.thumbnail) {
      var img = document.createElement("img");
      img.src = prefix + item.thumbnail;
      img.alt = "";
      img.loading = "lazy";
      img.onerror = function () {
        thumbWrap.innerHTML = "";
        thumbWrap.appendChild(fallback());
      };
      thumbWrap.appendChild(img);
    } else {
      thumbWrap.appendChild(fallback());
    }
    card.appendChild(thumbWrap);

    var body = document.createElement("div");
    body.className = "game-card-body";
    var title = document.createElement("div");
    title.className = "game-card-title";
    title.textContent = item.title;
    body.appendChild(title);

    var footerRow = document.createElement("div");
    footerRow.className = "game-card-footer";
    var labelsWrap = document.createElement("div");
    labelsWrap.className = "game-labels";
    var labelsTrack = document.createElement("div");
    labelsTrack.className = "game-labels-track";
    labelsTrack.textContent = (item.labels || ["Uncategorized"]).join("   •   ");
    labelsWrap.appendChild(labelsTrack);
    footerRow.appendChild(labelsWrap);

    if ((item.labels || []).length > 1) {
      requestAnimationFrame(function () {
        if (labelsTrack.scrollWidth > labelsWrap.clientWidth) {
          labelsTrack.classList.add("scrolling");
          labelsTrack.style.setProperty("--scroll-distance", labelsTrack.scrollWidth - labelsWrap.clientWidth + 12 + "px");
        }
      });
    }

    var star = document.createElement("button");
    var isFav = favorites.has(item.id);
    star.className = "fav-star" + (isFav ? " active" : "");
    star.setAttribute("aria-label", isFav ? "Remove from favorites" : "Add to favorites");
    star.innerHTML = icon(isFav ? "starFilled" : "starOutline");
    star.addEventListener("click", function (e) {
      e.stopPropagation();
      var nowFav = favorites.toggle(item.id);
      star.classList.toggle("active", nowFav);
      star.innerHTML = icon(nowFav ? "starFilled" : "starOutline");
      star.setAttribute("aria-label", nowFav ? "Remove from favorites" : "Add to favorites");
    });
    footerRow.appendChild(star);
    body.appendChild(footerRow);
    card.appendChild(body);

    function go() {
      window.location.href = prefix + item.route;
    }
    card.addEventListener("click", go);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
    return card;
  }
  NULLAPP.createCard = createCard;

  // ---------------------------------------------------------------
  // TOPBAR + FOOTER
  // ---------------------------------------------------------------
  var NAV_ITEMS = [
    { label: "Games", route: "games/" },
    { label: "Apps", route: "apps/" },
    { label: "Announcements", route: "announcements/" },
    { label: "Schedule", route: "schedule/" },
    { label: "Backups", route: "backups/" },
    { label: "Settings", route: "settings/" },
  ];
  function renderTopbar(prefix, activeRoute) {
    var bar = document.createElement("header");
    bar.className = "topbar";

    var left = document.createElement("div");
    left.className = "topbar-left";
    var homeBtn = document.createElement("a");
    homeBtn.href = prefix || ".";
    homeBtn.className = "home-btn";
    homeBtn.setAttribute("aria-label", "Home");
    homeBtn.innerHTML = icon("home");
    left.appendChild(homeBtn);
    var brand = document.createElement("a");
    brand.href = prefix || ".";
    brand.className = "brand";
    brand.textContent = "NULL";
    left.appendChild(brand);
    bar.appendChild(left);

    var right = document.createElement("div");
    right.className = "row";

    var navLinks = document.createElement("nav");
    navLinks.className = "nav-links";
    NAV_ITEMS.forEach(function (item) {
      var a = document.createElement("a");
      a.href = prefix + item.route;
      a.className = "nav-link" + (activeRoute === item.route ? " active" : "");
      a.textContent = item.label;
      navLinks.appendChild(a);
    });
    right.appendChild(navLinks);

    var searchBtn = document.createElement("button");
    searchBtn.className = "nav-icon-btn";
    searchBtn.setAttribute("aria-label", "Search");
    searchBtn.innerHTML = icon("search");
    searchBtn.addEventListener("click", function () {
      openSearch(prefix);
    });
    right.appendChild(searchBtn);

    var mobileBtn = document.createElement("button");
    mobileBtn.className = "nav-icon-btn mobile-menu-btn";
    mobileBtn.setAttribute("aria-label", "Menu");
    mobileBtn.innerHTML = icon("menu");
    right.appendChild(mobileBtn);

    var mobileMenuEl = null;
    function closeMobileMenu() {
      if (mobileMenuEl) mobileMenuEl.remove();
      mobileMenuEl = null;
      document.removeEventListener("click", onDocClick, true);
    }
    function onDocClick(e) {
      if (mobileMenuEl && !mobileMenuEl.contains(e.target) && e.target !== mobileBtn) closeMobileMenu();
    }
    mobileBtn.addEventListener("click", function () {
      if (mobileMenuEl) {
        closeMobileMenu();
        return;
      }
      mobileMenuEl = document.createElement("div");
      mobileMenuEl.className = "mobile-menu";
      NAV_ITEMS.forEach(function (item) {
        var a = document.createElement("a");
        a.href = prefix + item.route;
        a.textContent = item.label;
        mobileMenuEl.appendChild(a);
      });
      bar.appendChild(mobileMenuEl);
      setTimeout(function () {
        document.addEventListener("click", onDocClick, true);
      }, 0);
    });

    bar.appendChild(right);
    return bar;
  }
  NULLAPP.renderTopbar = renderTopbar;

  var FOOTER_LINKS = [
    { label: "About", route: "about/" },
    { label: "Privacy", route: "privacy/" },
    { label: "Terms", route: "terms/" },
    { label: "Cookies", route: "cookies/" },
    { label: "District Statement", route: "district/" },
    { label: "License", route: "license/" },
  ];
  function renderFooter(prefix) {
    var footer = document.createElement("footer");
    footer.className = "site-footer";
    var inner = document.createElement("div");
    inner.className = "footer-inner";
    var brand = document.createElement("span");
    brand.textContent = "© NULL";
    inner.appendChild(brand);
    var linksWrap = document.createElement("div");
    linksWrap.className = "footer-links";
    FOOTER_LINKS.forEach(function (l) {
      var a = document.createElement("a");
      a.href = prefix + l.route;
      a.textContent = l.label;
      linksWrap.appendChild(a);
    });
    inner.appendChild(linksWrap);
    footer.appendChild(inner);
    return footer;
  }
  NULLAPP.renderFooter = renderFooter;

  // ---------------------------------------------------------------
  // SEARCH OVERLAY
  // ---------------------------------------------------------------
  var searchOverlayEl = null;
  function openSearch(prefix) {
    if (searchOverlayEl) return;
    searchOverlayEl = document.createElement("div");
    searchOverlayEl.className = "search-overlay";

    var row = document.createElement("div");
    row.className = "search-bar-row";
    var backBtn = document.createElement("button");
    backBtn.className = "btn btn-icon";
    backBtn.setAttribute("aria-label", "Back");
    backBtn.innerHTML = icon("back");
    backBtn.addEventListener("click", closeSearch);
    row.appendChild(backBtn);

    var inputWrap = document.createElement("div");
    inputWrap.className = "search-input-wrap";
    inputWrap.innerHTML = icon("search");
    var input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.placeholder = "Search games, apps…";
    inputWrap.appendChild(input);
    row.appendChild(inputWrap);
    searchOverlayEl.appendChild(row);

    var results = document.createElement("div");
    results.className = "search-results";
    searchOverlayEl.appendChild(results);

    function renderResults(query) {
      results.innerHTML = "";
      if (!query.trim()) return;
      var matches = NULLAPP.catalog.search(query);
      if (!matches.length) {
        var empty = document.createElement("div");
        empty.className = "search-empty";
        empty.textContent = "No results.";
        results.appendChild(empty);
        return;
      }
      matches.forEach(function (item) {
        var r = document.createElement("div");
        r.className = "search-result-row";
        r.tabIndex = 0;
        var thumb = document.createElement("img");
        thumb.className = "search-result-thumb";
        thumb.src = item.thumbnail ? prefix + item.thumbnail : "";
        thumb.alt = "";
        thumb.onerror = function () {
          thumb.style.visibility = "hidden";
        };
        r.appendChild(thumb);
        var meta = document.createElement("div");
        meta.className = "search-result-meta";
        var name = document.createElement("div");
        name.className = "search-result-name";
        name.textContent = item.title;
        meta.appendChild(name);
        var sub = document.createElement("div");
        sub.className = "search-result-sub";
        sub.textContent = (item.labels || []).join(", ");
        meta.appendChild(sub);
        r.appendChild(meta);
        var type = document.createElement("span");
        type.className = "search-result-type";
        type.textContent = item.kind;
        r.appendChild(type);
        function go() {
          window.location.href = prefix + item.route;
        }
        r.addEventListener("click", go);
        r.addEventListener("keydown", function (e) {
          if (e.key === "Enter") go();
        });
        results.appendChild(r);
      });
    }
    input.addEventListener("input", function () {
      renderResults(input.value);
    });
    function onKeydown(e) {
      if (e.key === "Escape") closeSearch();
    }
    document.addEventListener("keydown", onKeydown);
    searchOverlayEl._cleanup = function () {
      document.removeEventListener("keydown", onKeydown);
    };
    document.body.appendChild(searchOverlayEl);
    input.focus();
  }
  function closeSearch() {
    if (!searchOverlayEl) return;
    if (searchOverlayEl._cleanup) searchOverlayEl._cleanup();
    searchOverlayEl.remove();
    searchOverlayEl = null;
  }
  NULLAPP.openSearch = openSearch;

  // ---------------------------------------------------------------
  // MOBILE WARNING + ONBOARDING
  // ---------------------------------------------------------------
  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth < 640;
  }
  function maybeShowMobileWarning() {
    if (settings.get().mobileWarningDismissed) return;
    if (!isMobileDevice()) return;
    showModal({
      title: "NULL isn't meant to run on mobile devices.",
      body: "Some games, controls, and layouts work much better on desktop. You can still use NULL if you want.",
      actions: [
        {
          label: "OK",
          className: "btn-primary",
          onClick: function () {
            settings.update({ mobileWarningDismissed: true });
          },
        },
      ],
    });
  }
  NULLAPP.maybeShowMobileWarning = maybeShowMobileWarning;

  var ONBOARDING_STEPS = [
    { label: "Welcome", title: "Welcome to NULL", body: "NULL is a clean, fast hub for games and apps — built around a simple black-and-white design and a permanent school schedule on the homepage." },
    { label: "Navigation", title: "Getting around", body: "Games, Apps, Announcements, Schedule, Backups, and Settings all live in the top bar. Everything's one click away." },
    { label: "Games", title: "Finding something to play", body: "Search, sort, and filter the library. Star favorites, revisit recent games, or hit Random for a surprise — every game opens in a clean fullscreen player." },
    { label: "Schedule", title: "The schedule", body: "The homepage always shows Current Period, Time Left, and Next Period during school hours, plus dedicated states before and after school." },
    { label: "Customization", title: "Make it yours", body: "Switch between dark and light mode, pick an accent color, turn on the animated Glow Border, and customize your browser tab's title and icon." },
    { label: "Game Player", title: "Inside a game", body: "Use Back, Reload, and Fullscreen from the player's top bar. Leaving fullscreen with Esc brings the bar back automatically (configurable in Settings)." },
    { label: "Settings", title: "Everything saves automatically", body: "Every setting you change is saved locally right away — no save button needed." },
    { label: "Local Data", title: "Your data stays local", body: "Favorites, recently played, and settings are all stored in your browser only. You can back them up or clear them anytime from Settings." },
    { label: "Terms", title: "One last thing", body: "By continuing, you're acknowledging you've reviewed NULL's Terms of Service and related legal pages, linked in the footer." },
  ];
  function maybeShowOnboarding() {
    if (settings.get().onboardingCompleted) return;
    var stepIndex = 0;
    var backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    var card = document.createElement("div");
    card.className = "modal-card onboarding-card";
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-modal", "true");
    var progress = document.createElement("div");
    progress.className = "onboarding-progress";
    ONBOARDING_STEPS.forEach(function () {
      progress.appendChild(document.createElement("span"));
    });
    card.appendChild(progress);
    var content = document.createElement("div");
    content.className = "onboarding-content";
    card.appendChild(content);
    var actions = document.createElement("div");
    actions.className = "modal-actions";
    var nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-primary";
    actions.appendChild(nextBtn);
    card.appendChild(actions);

    function draw() {
      var step = ONBOARDING_STEPS[stepIndex];
      content.innerHTML =
        '<div class="onboarding-step-label">' + step.label + '</div><h2 style="margin-bottom:12px">' + step.title + '</h2><p class="muted">' + step.body + "</p>";
      Array.prototype.forEach.call(progress.children, function (el, i) {
        el.classList.toggle("done", i <= stepIndex);
      });
      nextBtn.textContent = stepIndex === ONBOARDING_STEPS.length - 1 ? "Done" : "Next →";
    }
    nextBtn.addEventListener("click", function () {
      if (stepIndex === ONBOARDING_STEPS.length - 1) {
        settings.update({ onboardingCompleted: true });
        backdrop.remove();
        return;
      }
      stepIndex++;
      draw();
    });
    draw();
    backdrop.appendChild(card);
    document.body.appendChild(backdrop);
  }
  NULLAPP.maybeShowOnboarding = maybeShowOnboarding;

  // ---------------------------------------------------------------
  // 404 BARREL
  // ---------------------------------------------------------------
  function renderBarrel() {
    var wrap = document.createElement("div");
    wrap.innerHTML =
      '<svg viewBox="0 0 220 260" width="180" height="212" aria-hidden="true">' +
      '<defs><linearGradient id="barrelWood" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#3a2a1a"/><stop offset="50%" stop-color="#5a4028"/><stop offset="100%" stop-color="#3a2a1a"/></linearGradient></defs>' +
      '<ellipse cx="110" cy="240" rx="55" ry="10" fill="var(--accent)" opacity="0.18"><animate attributeName="rx" values="45;58;45" dur="3s" repeatCount="indefinite" /></ellipse>' +
      '<path d="M55 40 C 40 40 38 200 55 210 L 165 210 C 182 200 180 40 165 40 Z" fill="url(#barrelWood)" stroke="#241a10" stroke-width="3"/>' +
      '<ellipse cx="110" cy="40" rx="55" ry="14" fill="#4a341f" stroke="#241a10" stroke-width="3"/>' +
      '<ellipse cx="110" cy="210" rx="55" ry="14" fill="#2e2013" stroke="#241a10" stroke-width="3"/>' +
      '<path d="M42 75 C 70 68 150 68 178 75" fill="none" stroke="#c9c9cf" stroke-width="7" opacity="0.85"/>' +
      '<path d="M38 130 C 70 122 150 122 182 130" fill="none" stroke="#c9c9cf" stroke-width="7" opacity="0.85"/>' +
      '<path d="M42 178 C 70 172 150 172 178 178" fill="none" stroke="#c9c9cf" stroke-width="7" opacity="0.85"/>' +
      '<ellipse cx="150" cy="150" rx="9" ry="6" fill="#151016" stroke="#0a0a0b" stroke-width="2"/>' +
      '<path d="M150 154 C 150 170 148 185 148 205" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" opacity="0.9"><animate attributeName="d" values="M150 154 C 150 170 148 185 148 205;M150 154 C 152 172 146 188 149 205;M150 154 C 150 170 148 185 148 205" dur="1.6s" repeatCount="indefinite"/></path>' +
      '<circle cx="149" cy="215" r="3.5" fill="var(--accent)"><animate attributeName="cy" values="205;236;205" dur="1.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" dur="1.4s" repeatCount="indefinite"/></circle>' +
      '<circle cx="151" cy="215" r="2.5" fill="var(--accent)"><animate attributeName="cy" values="208;238;208" dur="1.4s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" dur="1.4s" begin="0.5s" repeatCount="indefinite"/></circle>' +
      "</svg>";
    var svg = wrap.firstElementChild;
    if (document.documentElement.dataset.performance === "on") {
      var anims = svg.querySelectorAll("animate");
      Array.prototype.forEach.call(anims, function (a) {
        a.remove();
      });
    }
    return svg;
  }
  NULLAPP.renderBarrel = renderBarrel;

  // ---------------------------------------------------------------
  // PAGE RENDERERS
  // Each takes (prefix) — the relative path back to site root from the
  // current page's location — and returns a DOM element to mount.
  // ---------------------------------------------------------------
  var PAGE_SIZE = 30;

  function renderHome(prefix) {
    var wrap = document.createElement("div");
    wrap.appendChild(renderScheduleBand());

    var page = document.createElement("div");
    page.className = "page";
    var header = document.createElement("div");
    header.className = "page-header";
    header.innerHTML = "<h1>Discover</h1><p>Jump into something new.</p>";
    page.appendChild(header);

    var games = NULLAPP.catalog.games().slice(0, 12);
    if (games.length) {
      var sectionTitle = document.createElement("h2");
      sectionTitle.textContent = "Games";
      sectionTitle.style.marginBottom = "16px";
      sectionTitle.style.fontSize = "16px";
      page.appendChild(sectionTitle);
      var grid = document.createElement("div");
      grid.className = "game-grid";
      games.forEach(function (g) {
        grid.appendChild(createCard(g, prefix));
      });
      page.appendChild(grid);
    } else {
      var empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = "<p>No games yet — add a folder under <code>games/</code> to get started.</p>";
      page.appendChild(empty);
    }
    wrap.appendChild(page);
    return wrap;
  }
  NULLAPP.renderHome = renderHome;

  function renderScheduleBand() {
    var band = document.createElement("div");
    band.className = "schedule-band";
    var inner = document.createElement("div");
    inner.className = "schedule-inner";
    band.appendChild(inner);

    function card(label, value, sublabel) {
      var el = document.createElement("div");
      el.className = "schedule-card";
      el.innerHTML =
        '<div class="label">' + label + '</div><div class="value">' + value + "</div>" + (sublabel ? '<div class="label" style="margin-top:8px">' + sublabel + "</div>" : "");
      return el;
    }
    function draw() {
      var s = getScheduleState();
      inner.innerHTML = "";
      if (s.state === "before-school") {
        inner.classList.add("single");
        inner.appendChild(card("Before School", '<span class="countdown">' + formatHMS(s.secondsUntilStart) + "</span>", "Time Till Start"));
        return;
      }
      if (s.state === "after-school") {
        inner.classList.add("single");
        inner.appendChild(card("After School", "See you tomorrow.", ""));
        return;
      }
      inner.classList.remove("single");
      inner.appendChild(card("Current Period", s.current.name, ""));
      inner.appendChild(card("Time Left", '<span class="countdown">' + formatMinSec(s.secondsLeft) + "</span>", ""));
      inner.appendChild(card("Next Period", s.next ? s.next.name : "—", ""));
    }
    draw();
    var intervalId = setInterval(draw, 1000);
    band._cleanup = function () {
      clearInterval(intervalId);
    };
    return band;
  }
  NULLAPP.renderScheduleBand = renderScheduleBand;

  function renderGamesPage(prefix, mode) {
    mode = mode || "all";
    var page = document.createElement("div");
    page.className = "page";
    var header = document.createElement("div");
    header.className = "page-header";
    var titles = { all: "Games", favorites: "Favorites", recent: "Recently Played" };
    header.innerHTML = "<h1>" + titles[mode] + "</h1>";
    page.appendChild(header);

    var toolbar = document.createElement("div");
    toolbar.className = "toolbar";
    var searchWrap = document.createElement("div");
    searchWrap.className = "input-wrap";
    var searchInput = document.createElement("input");
    searchInput.className = "input";
    searchInput.placeholder = "Search games…";
    searchWrap.appendChild(searchInput);
    toolbar.appendChild(searchWrap);

    var sortDropdown = createDropdown({
      options: [
        { value: "popular", label: "Popular" },
        { value: "newest", label: "Newest" },
        { value: "az", label: "A–Z" },
        { value: "za", label: "Z–A" },
      ],
      value: "popular",
      ariaLabel: "Sort games",
    });
    toolbar.appendChild(sortDropdown);

    var labelOptions = NULLAPP.catalog.allLabels(NULLAPP.catalog.games()).map(function (l) {
      return { value: l, label: l === "all" ? "All labels" : l };
    });
    var filterDropdown = createDropdown({ options: labelOptions, value: "all", ariaLabel: "Filter by label" });
    toolbar.appendChild(filterDropdown);

    var randomBtn = document.createElement("button");
    randomBtn.className = "btn";
    randomBtn.innerHTML = icon("dice") + " Random";
    randomBtn.style.display = "inline-flex";
    randomBtn.style.gap = "8px";
    randomBtn.style.alignItems = "center";
    randomBtn.addEventListener("click", function () {
      var g = NULLAPP.catalog.randomGame();
      if (g) window.location.href = prefix + g.route;
    });
    toolbar.appendChild(randomBtn);
    page.appendChild(toolbar);

    var grid = document.createElement("div");
    grid.className = "game-grid";
    page.appendChild(grid);
    var pagination = document.createElement("div");
    pagination.className = "pagination";
    page.appendChild(pagination);

    var currentPage = 1;

    function baseList() {
      if (mode === "favorites") {
        var ids = favorites.list();
        return NULLAPP.catalog.games().filter(function (g) {
          return ids.indexOf(g.id) !== -1;
        });
      }
      if (mode === "recent") {
        return recent
          .list()
          .map(function (r) {
            return NULLAPP.catalog.getById("game", r.id);
          })
          .filter(Boolean);
      }
      return NULLAPP.catalog.games();
    }
    function computeList() {
      var list = baseList();
      var q = searchInput.value.trim().toLowerCase();
      if (q) {
        list = list.filter(function (g) {
          return g.title.toLowerCase().indexOf(q) !== -1 || (g.labels || []).some(function (l) { return l.toLowerCase().indexOf(q) !== -1; });
        });
      }
      list = NULLAPP.catalog.filterByLabel(list, filterDropdown.getValue());
      if (mode !== "recent") list = NULLAPP.catalog.sortGames(list, sortDropdown.getValue(), plays.all());
      return list;
    }
    function draw() {
      var list = computeList();
      grid.innerHTML = "";
      pagination.innerHTML = "";
      if (!list.length) {
        var empty = document.createElement("div");
        empty.className = "empty-state";
        empty.innerHTML = icon("search") + "<p>No games found.</p>";
        grid.appendChild(empty);
        return;
      }
      var totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
      currentPage = Math.min(currentPage, totalPages);
      var start = (currentPage - 1) * PAGE_SIZE;
      list.slice(start, start + PAGE_SIZE).forEach(function (g) {
        grid.appendChild(createCard(g, prefix));
      });
      if (totalPages > 1) {
        for (var i = 1; i <= totalPages; i++) {
          (function (pageNum) {
            var btn = document.createElement("button");
            btn.className = "btn" + (pageNum === currentPage ? " btn-primary" : "");
            btn.textContent = String(pageNum);
            btn.addEventListener("click", function () {
              currentPage = pageNum;
              draw();
              window.scrollTo({ top: 0, behavior: "smooth" });
            });
            pagination.appendChild(btn);
          })(i);
        }
      }
    }
    searchInput.addEventListener("input", function () {
      currentPage = 1;
      draw();
    });
    sortDropdown.addEventListener("change", function () {
      currentPage = 1;
      draw();
    });
    filterDropdown.addEventListener("change", function () {
      currentPage = 1;
      draw();
    });
    draw();
    return page;
  }
  NULLAPP.renderGamesPage = renderGamesPage;

  function renderAppsPage(prefix) {
    var page = document.createElement("div");
    page.className = "page";
    var header = document.createElement("div");
    header.className = "page-header";
    header.innerHTML = "<h1>Apps</h1>";
    page.appendChild(header);

    var toolbar = document.createElement("div");
    toolbar.className = "toolbar";
    var wrap = document.createElement("div");
    wrap.className = "input-wrap";
    var searchInput = document.createElement("input");
    searchInput.className = "input";
    searchInput.placeholder = "Search apps…";
    wrap.appendChild(searchInput);
    toolbar.appendChild(wrap);
    page.appendChild(toolbar);

    var grid = document.createElement("div");
    grid.className = "game-grid";
    page.appendChild(grid);

    function draw() {
      var q = searchInput.value.trim().toLowerCase();
      var list = NULLAPP.catalog.apps().filter(function (a) {
        return !q || a.title.toLowerCase().indexOf(q) !== -1;
      });
      grid.innerHTML = "";
      if (!list.length) {
        var empty = document.createElement("div");
        empty.className = "empty-state";
        empty.innerHTML = icon("apps") + "<p>No apps found.</p>";
        grid.appendChild(empty);
        return;
      }
      list.forEach(function (a) {
        grid.appendChild(createCard(a, prefix));
      });
    }
    searchInput.addEventListener("input", draw);
    draw();
    return page;
  }
  NULLAPP.renderAppsPage = renderAppsPage;

  function renderPlayerPage(prefix, kind, id, listRoute, rawHtmlFile) {
    var item = NULLAPP.catalog.getById(kind, id);
    if (!item) {
      var empty = document.createElement("div");
      empty.className = "page";
      empty.innerHTML = '<div class="empty-state"><p>That ' + kind + " couldn't be found.</p></div>";
      return empty;
    }
    if (kind === "game") {
      recent.record(item.id);
      plays.record(item.id);
    }
    NULLAPP.setPlayerActive(true);

    var shell = document.createElement("div");
    shell.className = "player-shell";
    var topbar = document.createElement("div");
    topbar.className = "player-topbar";
    var backBtn = document.createElement("button");
    backBtn.className = "btn btn-icon";
    backBtn.setAttribute("aria-label", "Back");
    backBtn.innerHTML = icon("back");
    backBtn.addEventListener("click", function () {
      window.location.href = prefix + listRoute;
    });
    topbar.appendChild(backBtn);
    var title = document.createElement("div");
    title.className = "player-title";
    title.textContent = item.title;
    topbar.appendChild(title);
    var actions = document.createElement("div");
    actions.className = "player-actions";
    var reloadBtn = document.createElement("button");
    reloadBtn.className = "btn btn-icon";
    reloadBtn.setAttribute("aria-label", "Reload");
    reloadBtn.innerHTML = icon("reload");
    actions.appendChild(reloadBtn);
    var fullscreenBtn = document.createElement("button");
    fullscreenBtn.className = "btn btn-icon";
    fullscreenBtn.setAttribute("aria-label", "Fullscreen");
    fullscreenBtn.innerHTML = icon("fullscreen");
    actions.appendChild(fullscreenBtn);
    topbar.appendChild(actions);
    shell.appendChild(topbar);

    var frameWrap = document.createElement("div");
    frameWrap.className = "player-frame-wrap";
    var iframe = document.createElement("iframe");
    // Same-folder relative filename — avoids any prefix/depth ambiguity.
    iframe.src = rawHtmlFile;
    iframe.title = item.title;
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-modals");
    iframe.allow = "fullscreen; gamepad";
    frameWrap.appendChild(iframe);
    shell.appendChild(frameWrap);

    reloadBtn.addEventListener("click", function () {
      iframe.src = iframe.src;
    });
    fullscreenBtn.addEventListener("click", function () {
      if (frameWrap.requestFullscreen) frameWrap.requestFullscreen();
    });
    document.addEventListener("fullscreenchange", function () {
      if (!document.fullscreenElement) {
        topbar.style.display = settings.get().player.showBarAfterEsc ? "flex" : "none";
      } else {
        topbar.style.display = "none";
      }
    });
    function beforeUnload(e) {
      if (!settings.get().player.confirmRedirect) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", beforeUnload);
    return shell;
  }
  NULLAPP.renderPlayerPage = renderPlayerPage;

  function row(labelText, descText, control) {
    var el = document.createElement("div");
    el.className = "settings-row";
    var left = document.createElement("div");
    left.innerHTML = '<div class="settings-row-label">' + labelText + "</div>" + (descText ? '<div class="settings-row-desc">' + descText + "</div>" : "");
    el.appendChild(left);
    var right = document.createElement("div");
    right.className = "settings-control";
    right.appendChild(control);
    el.appendChild(right);
    return el;
  }
  function section(title, danger) {
    var el = document.createElement("div");
    el.className = "settings-section" + (danger ? " danger-zone" : "");
    var h2 = document.createElement("h2");
    h2.textContent = title;
    el.appendChild(h2);
    return el;
  }
  function toggleEl(initialOn, onChange) {
    var btn = document.createElement("button");
    btn.className = "toggle" + (initialOn ? " on" : "");
    btn.setAttribute("role", "switch");
    btn.setAttribute("aria-checked", String(initialOn));
    btn.addEventListener("click", function () {
      var isOn = !btn.classList.contains("on");
      btn.classList.toggle("on", isOn);
      btn.setAttribute("aria-checked", String(isOn));
      onChange(isOn);
    });
    return btn;
  }
  function sliderEl(opts) {
    var wrap = document.createElement("div");
    wrap.className = "row";
    wrap.style.gap = "12px";
    wrap.style.minWidth = "180px";
    var input = document.createElement("input");
    input.type = "range";
    input.min = String(opts.min);
    input.max = String(opts.max);
    input.step = String(opts.step);
    input.value = String(opts.value);
    input.style.flex = "1";
    var valueLabel = document.createElement("span");
    valueLabel.className = "muted";
    valueLabel.style.minWidth = "36px";
    valueLabel.style.textAlign = "right";
    valueLabel.textContent = opts.formatLabel ? opts.formatLabel(opts.value) : opts.value;
    input.addEventListener("input", function () {
      var v = Number(input.value);
      valueLabel.textContent = opts.formatLabel ? opts.formatLabel(v) : v;
      opts.onChange(v);
    });
    wrap.appendChild(input);
    wrap.appendChild(valueLabel);
    return wrap;
  }

  function renderSettingsPage(prefix) {
    var page = document.createElement("div");
    page.className = "page";
    page.innerHTML = '<div class="page-header"><h1>Settings</h1></div>';

    var appearance = section("Appearance");
    var themeDropdown = createDropdown({
      options: [
        { value: "dark", label: "Dark Mode" },
        { value: "light", label: "Light Mode" },
      ],
      value: settings.get().theme,
    });
    themeDropdown.addEventListener("change", function (e) {
      settings.update({ theme: e.detail.value });
    });
    appearance.appendChild(row("Theme", "Dark mode is the default.", themeDropdown));

    var swatchWrap = document.createElement("div");
    swatchWrap.className = "color-swatches";
    [210, 260, 320, 0, 30, 150].forEach(function (h) {
      var sw = document.createElement("button");
      sw.className = "color-swatch" + (settings.get().accentHue === h ? " selected" : "");
      sw.style.background = "hsl(" + h + " 90% 60%)";
      sw.addEventListener("click", function () {
        settings.update({ accentHue: h });
        Array.prototype.forEach.call(swatchWrap.children, function (c) {
          c.classList.remove("selected");
        });
        sw.classList.add("selected");
      });
      swatchWrap.appendChild(sw);
    });
    appearance.appendChild(row("Accent Color", "Subtly affects buttons, focus states, and highlights.", swatchWrap));
    page.appendChild(appearance);

    var accessibility = section("Accessibility");
    var acc = settings.get().accessibility;
    accessibility.appendChild(row("Reduce Motion", "Turns off decorative animation, independent of your OS setting.", toggleEl(acc.forceReducedMotion, function (on) { settings.update({ accessibility: { forceReducedMotion: on } }); })));
    accessibility.appendChild(row("Underline Links", "Adds underlines to text links for extra visibility.", toggleEl(acc.underlineLinks, function (on) { settings.update({ accessibility: { underlineLinks: on } }); })));
    var textScaleDropdown = createDropdown({
      options: [
        { value: "normal", label: "Normal" },
        { value: "large", label: "Large" },
        { value: "extra-large", label: "Extra Large" },
      ],
      value: acc.textScale,
    });
    textScaleDropdown.addEventListener("change", function (e) {
      settings.update({ accessibility: { textScale: e.detail.value } });
    });
    accessibility.appendChild(row("Text Size", "", textScaleDropdown));
    page.appendChild(accessibility);

    var glow = section("Glow Border");
    var g = settings.get().glow;
    glow.appendChild(row("Glow Border", "Off by default — an animated glow around the edge of the site.", toggleEl(g.enabled, function (on) { settings.update({ glow: { enabled: on } }); })));
    var presetDropdown = createDropdown({
      options: [
        { value: "rainbow", label: "Rainbow" },
        { value: "green-blue", label: "Green + Blue" },
        { value: "blue-purple", label: "Blue + Purple" },
        { value: "custom", label: "Custom" },
      ],
      value: g.preset,
    });
    presetDropdown.addEventListener("change", function (e) {
      settings.update({ glow: { preset: e.detail.value } });
    });
    glow.appendChild(row("Preset", "", presetDropdown));
    var customColors = document.createElement("div");
    customColors.className = "row";
    var c1 = document.createElement("input");
    c1.type = "color";
    c1.value = g.customColor1;
    c1.addEventListener("input", function () {
      settings.update({ glow: { customColor1: c1.value } });
    });
    var c2 = document.createElement("input");
    c2.type = "color";
    c2.value = g.customColor2;
    c2.addEventListener("input", function () {
      settings.update({ glow: { customColor2: c2.value } });
    });
    customColors.appendChild(c1);
    customColors.appendChild(c2);
    glow.appendChild(row("Custom Colors", "Used when preset is set to Custom.", customColors));
    var gameGlowDropdown = createDropdown({
      options: [
        { value: "remove", label: "Remove During Game" },
        { value: "keep", label: "Keep During Game" },
      ],
      value: g.hideDuringGames ? "remove" : "keep",
    });
    gameGlowDropdown.addEventListener("change", function (e) {
      settings.update({ glow: { hideDuringGames: e.detail.value === "remove" } });
    });
    glow.appendChild(row("Glow Border While Playing", "", gameGlowDropdown));
    glow.appendChild(row("Intensity", "How bright the glow appears.", sliderEl({ min: 0.5, max: 2, step: 0.1, value: g.intensity, formatLabel: function (v) { return Math.round(v * 100) + "%"; }, onChange: function (v) { settings.update({ glow: { intensity: v } }); } })));
    glow.appendChild(row("Speed", "How fast the glow animates.", sliderEl({ min: 0.5, max: 2, step: 0.1, value: g.speed, formatLabel: function (v) { return Math.round(v * 100) + "%"; }, onChange: function (v) { settings.update({ glow: { speed: v } }); } })));
    page.appendChild(glow);

    var tab = section("Browser Tab");
    var tabState = settings.get().tab;
    var tabDropdown = createDropdown({
      options: TAB_PRESETS.map(function (p) {
        return { value: p.id, label: p.label };
      }),
      value: tabState.preset,
    });
    var customFieldsWrap = document.createElement("div");
    var previewWrap = document.createElement("div");
    function redrawPreview() {
      var p = currentTabPreview(prefix);
      previewWrap.innerHTML = '<div class="tab-preview">' + (p.icon ? '<img src="' + p.icon + '" alt="">' : "") + "<span>" + p.title + "</span></div>";
    }
    function redrawCustomFields() {
      customFieldsWrap.innerHTML = "";
      if (settings.get().tab.preset !== "custom") return;
      var nameInput = document.createElement("input");
      nameInput.className = "input";
      nameInput.placeholder = "Custom tab title";
      nameInput.value = settings.get().tab.customTitle;
      nameInput.addEventListener("input", function () {
        settings.update({ tab: { customTitle: nameInput.value } });
        redrawPreview();
      });
      customFieldsWrap.appendChild(row("Custom Name", "", nameInput));
      var iconInput = document.createElement("input");
      iconInput.className = "input";
      iconInput.placeholder = "Icon URL, or upload below";
      iconInput.value = settings.get().tab.customIconUrl;
      iconInput.addEventListener("input", function () {
        settings.update({ tab: { customIconUrl: iconInput.value } });
        redrawPreview();
      });
      customFieldsWrap.appendChild(row("Custom Icon URL", "", iconInput));
      var fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.addEventListener("change", function () {
        var file = fileInput.files && fileInput.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          settings.update({ tab: { customIconUrl: reader.result } });
          redrawPreview();
        };
        reader.readAsDataURL(file);
      });
      customFieldsWrap.appendChild(row("Upload Icon", "Automatically fits favicon dimensions.", fileInput));
    }
    tabDropdown.addEventListener("change", function (e) {
      settings.update({ tab: { preset: e.detail.value } });
      redrawCustomFields();
      redrawPreview();
    });
    tab.appendChild(row("Preset", "NULL-themed title + favicon presets.", tabDropdown));
    tab.appendChild(customFieldsWrap);
    tab.appendChild(row("Live Preview", "", previewWrap));
    redrawCustomFields();
    redrawPreview();
    page.appendChild(tab);

    var player = section("Game Player");
    var p2 = settings.get().player;
    player.appendChild(row("Show Player Bar After Leaving Fullscreen", "When enabled, pressing Esc brings the top bar back automatically.", toggleEl(p2.showBarAfterEsc, function (on) { settings.update({ player: { showBarAfterEsc: on } }); })));
    player.appendChild(row("Ask for verification before redirecting", "Warns before content tries to navigate you away from NULL.", toggleEl(p2.confirmRedirect, function (on) { settings.update({ player: { confirmRedirect: on } }); })));
    page.appendChild(player);

    var data = section("Data");
    var favBtn = document.createElement("a");
    favBtn.className = "btn";
    favBtn.href = prefix + "favorites/";
    favBtn.textContent = "View Favorites";
    data.appendChild(row("Favorites", favorites.list().length + " saved", favBtn));
    var recentBtn = document.createElement("a");
    recentBtn.className = "btn";
    recentBtn.href = prefix + "recent/";
    recentBtn.textContent = "View Recently Played";
    data.appendChild(row("Recently Played", recent.list().length + " entries", recentBtn));
    var backupsBtn = document.createElement("a");
    backupsBtn.className = "btn";
    backupsBtn.href = prefix + "backups/";
    backupsBtn.textContent = "Go to Backups";
    data.appendChild(row("Backups", "Export or import your local data.", backupsBtn));
    page.appendChild(data);

    var danger = section("Danger Zone", true);
    danger.appendChild(
      row(
        "Performance Mode",
        "Strips nonessential animation, blur, and shadows to save resources.",
        toggleEl(settings.get().performanceMode, function (on) {
          confirmDanger({ actionText: "Are you sure you want to " + (on ? "enable" : "disable") + " Performance Mode?", onConfirm: function () { settings.update({ performanceMode: on }); } });
        })
      )
    );
    var clearFavBtn = document.createElement("button");
    clearFavBtn.className = "btn btn-danger-outline";
    clearFavBtn.textContent = "Clear Favorites";
    clearFavBtn.addEventListener("click", function () {
      confirmDanger({ actionText: "Are you sure you want to clear all favorites?", onConfirm: function () { favorites.clear(); } });
    });
    danger.appendChild(row("Clear Favorites", "", clearFavBtn));
    var clearRecentBtn = document.createElement("button");
    clearRecentBtn.className = "btn btn-danger-outline";
    clearRecentBtn.textContent = "Clear Recently Played";
    clearRecentBtn.addEventListener("click", function () {
      confirmDanger({ actionText: "Are you sure you want to clear recently played?", onConfirm: function () { recent.clear(); } });
    });
    danger.appendChild(row("Clear Recently Played", "", clearRecentBtn));
    var clearLsBtn = document.createElement("button");
    clearLsBtn.className = "btn btn-danger-outline";
    clearLsBtn.textContent = "Clear LocalStorage";
    clearLsBtn.addEventListener("click", function () {
      confirmDanger({
        actionText: "Are you sure you want to clear LocalStorage? This removes settings, favorites, and recently played.",
        onConfirm: function () {
          localStorage.clear();
          location.reload();
        },
      });
    });
    danger.appendChild(row("Clear LocalStorage", "Removes all local NULL data.", clearLsBtn));
    var resetBtn = document.createElement("button");
    resetBtn.className = "btn btn-danger-filled";
    resetBtn.textContent = "Reset NULL";
    resetBtn.addEventListener("click", function () {
      confirmDanger({
        actionText: "Are you sure you want to reset NULL to its defaults? Onboarding will show again.",
        onConfirm: function () {
          settings.reset();
          favorites.clear();
          recent.clear();
          plays.clear();
          location.reload();
        },
      });
    });
    danger.appendChild(row("Reset NULL", "Restores all local settings and data to defaults.", resetBtn));
    page.appendChild(danger);

    return page;
  }
  NULLAPP.renderSettingsPage = renderSettingsPage;

  function renderSchedulePage() {
    var wrap = document.createElement("div");
    wrap.appendChild(renderScheduleBand());
    var page = document.createElement("div");
    page.className = "page";
    page.innerHTML = '<div class="page-header"><h1>Schedule</h1><p>Passing periods are used internally for timing but aren\'t listed below.</p></div>';
    var list = document.createElement("div");
    list.className = "stack";
    visibleSchedule().forEach(function (entry) {
      var r = document.createElement("div");
      r.className = "card row";
      r.style.justifyContent = "space-between";
      r.innerHTML = '<span style="font-weight:600">' + entry.name + '</span><span class="muted">' + entry.start + " – " + entry.end + "</span>";
      list.appendChild(r);
    });
    page.appendChild(list);
    wrap.appendChild(page);
    return wrap;
  }
  NULLAPP.renderSchedulePage = renderSchedulePage;

  function renderBackupsPage() {
    var KEYS = ["null_settings_v1", "null_favorites_v1", "null_recent_v1", "null_plays_v1"];
    var page = document.createElement("div");
    page.className = "page";
    page.innerHTML = '<div class="page-header"><h1>Backups</h1><p>Export or import your local NULL data. Nothing is ever sent to a server.</p></div>';
    var stack = document.createElement("div");
    stack.className = "stack";

    var exportBox = document.createElement("div");
    exportBox.className = "backup-box";
    exportBox.innerHTML = '<h3 style="margin-bottom:8px">Export</h3><p class="muted" style="margin-bottom:16px">Download your settings, favorites, recently played, and play counts as a JSON file.</p>';
    var exportBtn = document.createElement("button");
    exportBtn.className = "btn btn-primary";
    exportBtn.textContent = "Export data";
    exportBtn.addEventListener("click", function () {
      var data = {};
      KEYS.forEach(function (k) {
        var v = localStorage.getItem(k);
        if (v) data[k] = JSON.parse(v);
      });
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "null-backup.json";
      a.click();
      URL.revokeObjectURL(url);
    });
    exportBox.appendChild(exportBtn);
    stack.appendChild(exportBox);

    var importBox = document.createElement("div");
    importBox.className = "backup-box";
    importBox.innerHTML = '<h3 style="margin-bottom:8px">Import</h3><p class="muted" style="margin-bottom:16px">Restore from a previously exported NULL backup file.</p>';
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";
    fileInput.className = "visually-hidden";
    var importBtn = document.createElement("button");
    importBtn.className = "btn";
    importBtn.textContent = "Choose file…";
    importBtn.addEventListener("click", function () {
      fileInput.click();
    });
    fileInput.addEventListener("change", function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var parsed = JSON.parse(reader.result);
          var validKeys = Object.keys(parsed).filter(function (k) {
            return KEYS.indexOf(k) !== -1;
          });
          if (!validKeys.length) throw new Error("No recognizable NULL data found in this file.");
          validKeys.forEach(function (k) {
            localStorage.setItem(k, JSON.stringify(parsed[k]));
          });
          showModal({ title: "Import complete", body: "Your data has been restored. Reload the page to see changes everywhere.", actions: [{ label: "OK", className: "btn-primary" }] });
        } catch (err) {
          showModal({ title: "Import failed", body: err.message, actions: [{ label: "OK", className: "btn-primary" }] });
        }
      };
      reader.readAsText(file);
    });
    importBox.appendChild(importBtn);
    importBox.appendChild(fileInput);
    stack.appendChild(importBox);
    page.appendChild(stack);
    return page;
  }
  NULLAPP.renderBackupsPage = renderBackupsPage;

  function renderAnnouncementsPage() {
    var ANNOUNCEMENTS = [
      { date: "2026-08-30", title: "NULL launched", body: "Welcome to NULL — automatic game/app discovery, a permanent schedule widget, and a fully custom design system, all running as plain static pages." },
    ];
    var page = document.createElement("div");
    page.className = "page";
    page.innerHTML = '<div class="page-header"><h1>Announcements</h1><p>Updates, notices, and known issues.</p></div>';
    var stack = document.createElement("div");
    stack.className = "stack";
    ANNOUNCEMENTS.forEach(function (a) {
      var card = document.createElement("div");
      card.className = "card";
      card.innerHTML = '<div class="muted" style="margin-bottom:8px">' + a.date + '</div><h3 style="margin-bottom:8px">' + a.title + '</h3><p class="muted">' + a.body + "</p>";
      stack.appendChild(card);
    });
    page.appendChild(stack);
    return page;
  }
  NULLAPP.renderAnnouncementsPage = renderAnnouncementsPage;

  var LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
  function renderStaticPage(title, paragraphs) {
    paragraphs = paragraphs || 3;
    var page = document.createElement("div");
    page.className = "page";
    page.innerHTML = '<div class="page-header"><h1>' + title + '</h1><p>Placeholder content — will be replaced with real text later.</p></div>';
    var stack = document.createElement("div");
    stack.className = "stack";
    for (var i = 0; i < paragraphs; i++) {
      var p = document.createElement("p");
      p.className = "muted";
      p.textContent = LOREM;
      stack.appendChild(p);
    }
    page.appendChild(stack);
    return page;
  }
  NULLAPP.renderStaticPage = renderStaticPage;

  function renderLicensePage() {
    var page = document.createElement("div");
    page.className = "page";
    page.innerHTML =
      '<div class="page-header"><h1>License</h1></div><div class="stack">' +
      '<div class="card"><h3 style="margin-bottom:8px">NULL\'s source code</h3><p class="muted">This project is licensed under the GNU Affero General Public License v3.0 (AGPLv3). See the <code>LICENSE</code> file in the repository for the full text.</p></div>' +
      '<div class="card"><h3 style="margin-bottom:8px">Third-party content</h3><p class="muted">Games and apps hosted under <code>games/</code> and <code>apps/</code> are not part of NULL\'s own codebase and are not automatically covered by NULL\'s license. Each piece of third-party content may carry its own license or terms.</p></div></div>';
    return page;
  }
  NULLAPP.renderLicensePage = renderLicensePage;

  function renderNotFoundPage(prefix) {
    var page = document.createElement("div");
    page.className = "page";
    var wrap = document.createElement("div");
    wrap.className = "notfound";
    wrap.appendChild(renderBarrel());
    var h1 = document.createElement("h1");
    h1.textContent = "404 — Leaky Link";
    wrap.appendChild(h1);
    var p = document.createElement("p");
    p.textContent = "Looks like this link sprang a leak.";
    wrap.appendChild(p);

    var actions = document.createElement("div");
    actions.className = "notfound-actions";
    var backBtn = document.createElement("button");
    backBtn.className = "btn";
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", function () {
      history.back();
    });
    actions.appendChild(backBtn);
    var homeBtn = document.createElement("a");
    homeBtn.className = "btn btn-primary";
    homeBtn.href = prefix || ".";
    homeBtn.textContent = "Back to Home";
    actions.appendChild(homeBtn);
    var gamesBtn = document.createElement("a");
    gamesBtn.className = "btn";
    gamesBtn.href = prefix + "games/";
    gamesBtn.textContent = "Games";
    actions.appendChild(gamesBtn);
    wrap.appendChild(actions);

    var searchWrap = document.createElement("div");
    searchWrap.className = "notfound-search";
    var input = document.createElement("input");
    input.className = "input";
    input.placeholder = "Search games and apps…";
    searchWrap.appendChild(input);
    var results = document.createElement("div");
    results.className = "stack";
    results.style.marginTop = "12px";
    searchWrap.appendChild(results);
    input.addEventListener("input", function () {
      var matches = NULLAPP.catalog.search(input.value).slice(0, 6);
      results.innerHTML = "";
      matches.forEach(function (item) {
        var r = document.createElement("div");
        r.className = "search-result-row";
        r.innerHTML = '<div class="search-result-meta"><div class="search-result-name">' + item.title + '</div></div><span class="search-result-type">' + item.kind + "</span>";
        r.addEventListener("click", function () {
          window.location.href = prefix + item.route;
        });
        results.appendChild(r);
      });
    });
    wrap.appendChild(searchWrap);
    page.appendChild(wrap);
    return page;
  }
  NULLAPP.renderNotFoundPage = renderNotFoundPage;

  // ---------------------------------------------------------------
  // BOOT
  // Every page's <html> tag carries data-prefix (relative path back to
  // the site root) and data-route (which page this is). boot() wires up
  // the shared shell (topbar/footer/glow/mobile warning/onboarding) and
  // mounts the page-specific content into #app.
  // ---------------------------------------------------------------
  NULLAPP.boot = function (renderPageContent) {
    var html = document.documentElement;
    var prefix = html.getAttribute("data-prefix") || "./";
    var route = html.getAttribute("data-route") || "";

    applyGlobalTheme(prefix);
    settings.onChange(function () {
      applyGlobalTheme(prefix);
    });

    var app = document.getElementById("app");
    app.innerHTML = "";
    app.appendChild(renderTopbar(prefix, route));
    var main = document.createElement("main");
    var content = renderPageContent(prefix);
    main.appendChild(content);
    app.appendChild(main);
    app.appendChild(renderFooter(prefix));

    mountGlowBorder();
    maybeShowMobileWarning();
    maybeShowOnboarding();
  };

  // Full-bleed boot for the game/app player (no topbar/footer chrome
  // around it, matching the rest of NULL's theme via the player's own bar).
  NULLAPP.bootPlayer = function (renderPageContent) {
    var html = document.documentElement;
    var prefix = html.getAttribute("data-prefix") || "./";
    applyGlobalTheme(prefix);
    settings.onChange(function () {
      applyGlobalTheme(prefix);
    });
    var app = document.getElementById("app");
    app.innerHTML = "";
    app.appendChild(renderPageContent(prefix));
    mountGlowBorder();
  };

})();



