import { renderScheduleBand } from "../components/schedule.js";
import { visibleSchedule } from "../utilities/scheduleEngine.js";

export function renderSchedulePage() {
  const wrap = document.createElement("div");
  wrap.appendChild(renderScheduleBand());

  const page = document.createElement("div");
  page.className = "page";
  page.innerHTML = `<div class="page-header"><h1>Schedule</h1><p>Passing periods are used internally for timing but aren't listed below.</p></div>`;

  const list = document.createElement("div");
  list.className = "stack";
  visibleSchedule().forEach((entry) => {
    const row = document.createElement("div");
    row.className = "card row";
    row.style.justifyContent = "space-between";
    row.innerHTML = `<span style="font-weight:600">${entry.name}</span><span class="muted">${entry.start} â€“ ${entry.end}</span>`;
    list.appendChild(row);
  });
  page.appendChild(list);

  wrap.appendChild(page);
  return wrap;
}
