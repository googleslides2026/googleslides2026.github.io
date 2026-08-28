import { catalog } from "../catalog/catalog.js";
import { createCard } from "../components/gameCard.js";
import { createDropdown } from "../components/dropdown.js";
import { icon } from "../utilities/icons.js";
import { navigate } from "../routing/router.js";
import { favorites } from "../state/favorites.js";
import { recent } from "../state/recent.js";

const PAGE_SIZE = 30;

export function renderGames({ mode = "all" } = {}) {
  const page = document.createElement("div");
  page.className = "page";

  const header = document.createElement("div");
  header.className = "page-header";
  const titles = { all: "Games", favorites: "Favorites", recent: "Recently Played" };
  header.innerHTML = `<h1>${titles[mode]}</h1>`;
  page.appendChild(header);

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";

  const searchWrap = document.createElement("div");
  searchWrap.className = "input-wrap";
  const searchInput = document.createElement("input");
  searchInput.className = "input";
  searchInput.placeholder = "Search gamesâ€¦";
  searchWrap.appendChild(searchInput);
  toolbar.appendChild(searchWrap);

  const sortDropdown = createDropdown({
    options: [
      { value: "popular", label: "Popular" },
      { value: "newest", label: "Newest" },
      { value: "az", label: "Aâ€“Z" },
      { value: "za", label: "Zâ€“A" },
    ],
    value: "popular",
    ariaLabel: "Sort games",
  });
  toolbar.appendChild(sortDropdown);

  let labelOptions = catalog.allLabels(catalog.games).map((l) => ({ value: l, label: l === "all" ? "All labels" : l }));
  const filterDropdown = createDropdown({ options: labelOptions, value: "all", ariaLabel: "Filter by label" });
  toolbar.appendChild(filterDropdown);

  const randomBtn = document.createElement("button");
  randomBtn.className = "btn";
  randomBtn.innerHTML = `${icon("dice")} Random`;
  randomBtn.style.display = "inline-flex";
  randomBtn.style.gap = "8px";
  randomBtn.style.alignItems = "center";
  randomBtn.addEventListener("click", () => {
    const g = catalog.randomGame();
    if (g) navigate(g.route);
  });
  toolbar.appendChild(randomBtn);

  page.appendChild(toolbar);

  const grid = document.createElement("div");
  grid.className = "game-grid";
  page.appendChild(grid);

  const pagination = document.createElement("div");
  pagination.className = "pagination";
  page.appendChild(pagination);

  let currentPage = 1;

  function baseList() {
    if (mode === "favorites") {
      const ids = favorites.list();
      return catalog.games.filter((g) => ids.includes(g.id));
    }
    if (mode === "recent") {
      const ids = recent.list().map((r) => r.id);
      return ids.map((id) => catalog.getById("game", id)).filter(Boolean);
    }
    return catalog.games;
  }

  function computeList() {
    let list = baseList();
    const q = searchInput.value.trim().toLowerCase();
    if (q) list = list.filter((g) => g.title.toLowerCase().includes(q) || g.labels?.some((l) => l.toLowerCase().includes(q)));
    list = catalog.filterByLabel(list, filterDropdown.getValue());
    if (mode !== "recent") list = catalog.sortGames(list, sortDropdown.getValue());
    return list;
  }

  function draw() {
    const list = computeList();
    grid.innerHTML = "";
    pagination.innerHTML = "";

    if (!list.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.style.gridColumn = "1 / -1";
      empty.innerHTML = `${icon("search")}<p>No games found.</p>`;
      grid.appendChild(empty);
      return;
    }

    const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    currentPage = Math.min(currentPage, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = list.slice(start, start + PAGE_SIZE);
    pageItems.forEach((g) => grid.appendChild(createCard(g)));

    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = "btn" + (i === currentPage ? " btn-primary" : "");
        btn.textContent = String(i);
        btn.addEventListener("click", () => {
          currentPage = i;
          draw();
        });
        pagination.appendChild(btn);
      }
    }
  }

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    draw();
  });
  sortDropdown.addEventListener("change", () => {
    currentPage = 1;
    draw();
  });
  filterDropdown.addEventListener("change", () => {
    currentPage = 1;
    draw();
  });

  draw();
  return page;
}
