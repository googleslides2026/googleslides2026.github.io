import { renderScheduleBand } from "../components/schedule.js";
import { createCard } from "../components/gameCard.js";
import { catalog } from "../catalog/catalog.js";

export function renderHome() {
  const wrap = document.createElement("div");

  wrap.appendChild(renderScheduleBand());

  const page = document.createElement("div");
  page.className = "page";

  const header = document.createElement("div");
  header.className = "page-header";
  header.innerHTML = `<h1>Discover</h1><p>Jump into something new.</p>`;
  page.appendChild(header);

  const gamesToShow = catalog.games.slice(0, 12);
  if (gamesToShow.length) {
    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = "Games";
    sectionTitle.style.marginBottom = "16px";
    sectionTitle.style.fontSize = "16px";
    page.appendChild(sectionTitle);

    const grid = document.createElement("div");
    grid.className = "game-grid";
    gamesToShow.forEach((g) => grid.appendChild(createCard(g)));
    page.appendChild(grid);
  } else {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `<p>No games yet â€” add a folder under <code>/games</code> to get started.</p>`;
    page.appendChild(empty);
  }

  wrap.appendChild(page);
  return wrap;
}
