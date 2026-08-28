import { renderBarrel } from "../components/barrel.js";
import { catalog } from "../catalog/catalog.js";
import { navigate } from "../routing/router.js";
import { icon } from "../utilities/icons.js";

export function renderNotFound() {
  const page = document.createElement("div");
  page.className = "page";

  const wrap = document.createElement("div");
  wrap.className = "notfound";

  wrap.appendChild(renderBarrel());

  const h1 = document.createElement("h1");
  h1.textContent = "404 â€” Leaky Link";
  wrap.appendChild(h1);

  const p = document.createElement("p");
  p.textContent = "Looks like this link sprang a leak.";
  wrap.appendChild(p);

  const actions = document.createElement("div");
  actions.className = "notfound-actions";

  const backBtn = document.createElement("button");
  backBtn.className = "btn";
  backBtn.textContent = "Back";
  backBtn.addEventListener("click", () => history.back());
  actions.appendChild(backBtn);

  const homeBtn = document.createElement("a");
  homeBtn.className = "btn btn-primary";
  homeBtn.href = "/";
  homeBtn.textContent = "Back to Home";
  actions.appendChild(homeBtn);

  const gamesBtn = document.createElement("a");
  gamesBtn.className = "btn";
  gamesBtn.href = "/games";
  gamesBtn.textContent = "Games";
  actions.appendChild(gamesBtn);

  wrap.appendChild(actions);

  const searchWrap = document.createElement("div");
  searchWrap.className = "notfound-search";
  const input = document.createElement("input");
  input.className = "input";
  input.placeholder = "Search games and appsâ€¦";
  searchWrap.appendChild(input);

  const results = document.createElement("div");
  results.className = "stack";
  results.style.marginTop = "12px";
  searchWrap.appendChild(results);

  input.addEventListener("input", () => {
    const matches = catalog.search(input.value);
    results.innerHTML = "";
    matches.slice(0, 6).forEach((item) => {
      const row = document.createElement("div");
      row.className = "search-result-row";
      row.innerHTML = `<div class="search-result-meta"><div class="search-result-name">${item.title}</div></div><span class="search-result-type">${item.kind}</span>`;
      row.addEventListener("click", () => navigate(item.route));
      results.appendChild(row);
    });
  });

  wrap.appendChild(searchWrap);
  page.appendChild(wrap);
  return page;
}
