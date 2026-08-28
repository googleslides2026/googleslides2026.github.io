const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

export function renderStaticPage(title, paragraphs = 3) {
  const page = document.createElement("div");
  page.className = "page";
  const header = document.createElement("div");
  header.className = "page-header";
  header.innerHTML = `<h1>${title}</h1><p>Placeholder content â€” will be replaced with real text later.</p>`;
  page.appendChild(header);

  const stack = document.createElement("div");
  stack.className = "stack";
  for (let i = 0; i < paragraphs; i++) {
    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = LOREM;
    stack.appendChild(p);
  }
  page.appendChild(stack);
  return page;
}
