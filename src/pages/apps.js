import { catalog } from "../catalog/catalog.js";
import { createCard } from "../components/gameCard.js";
import { icon } from "../utilities/icons.js";

export function renderApps() {
  const page = document.createElement("div");
  page.className = "page";

  const header = document.createElement("div");
  header.className = "page-header";
  header.innerHTML = `<h1>Apps</h1>`;
  page.appendChild(header);

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";
  const searchInput = document.createElement("input");
  searchInput.className = "input";
  searchInput.placeholder = "Search appsâ€¦";
  const wrap = document.createElement("div");
  wrap.className = "input-wrap";
  wrap.appendChild(searchInput);
  toolbar.appendChild(wrap);
  page.appendChild(toolbar);

  const grid = document.createElement("div");
  grid.className = "game-grid";
  page.appendChild(grid);

  function draw() {
    const q = searchInput.value.trim().toLowerCase();
    const list = catalog.apps.filter((a) => !q || a.title.toLowerCase().includes(q));
    grid.innerHTML = "";
    if (!list.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.style.gridColumn = "1 / -1";
      empty.innerHTML = `${icon("apps")}<p>No apps found.</p>`;
      grid.appendChild(empty);
      return;
    }
    list.forEach((a) => grid.appendChild(createCard(a)));
  }

  searchInput.addEventListener("input", draw);
  draw();
  return page;
}
