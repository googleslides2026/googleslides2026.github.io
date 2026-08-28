const ANNOUNCEMENTS = [
  {
    date: "2026-08-28",
    title: "NULL launched",
    body: "Welcome to NULL, a better alternative to SG Games with more features. If you like messi, LEAVE! just kidding...but dont snitch please",
  },
];

export function renderAnnouncements() {
  const page = document.createElement("div");
  page.className = "page";
  page.innerHTML = `<div class="page-header"><h1>Announcements</h1><p>Updates, notices, and known issues.</p></div>`;

  const stack = document.createElement("div");
  stack.className = "stack";
  ANNOUNCEMENTS.forEach((a) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<div class="muted" style="margin-bottom:8px">${a.date}</div><h3 style="margin-bottom:8px">${a.title}</h3><p class="muted">${a.body}</p>`;
    stack.appendChild(card);
  });
  page.appendChild(stack);
  return page;
}
