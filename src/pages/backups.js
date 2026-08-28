import { showModal } from "../components/modal.js";

const KEYS = ["null_settings_v1", "null_favorites_v1", "null_recent_v1"];

function exportData() {
  const data = {};
  KEYS.forEach((k) => {
    const v = localStorage.getItem(k);
    if (v) data[k] = JSON.parse(v);
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "null-backup.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importData(file, onDone) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const validKeys = Object.keys(parsed).filter((k) => KEYS.includes(k));
      if (!validKeys.length) throw new Error("No recognizable NULL data found in this file.");
      validKeys.forEach((k) => localStorage.setItem(k, JSON.stringify(parsed[k])));
      onDone(true);
    } catch (err) {
      onDone(false, err.message);
    }
  };
  reader.readAsText(file);
}

export function renderBackups() {
  const page = document.createElement("div");
  page.className = "page";
  page.innerHTML = `<div class="page-header"><h1>Backups</h1><p>Export or import your local NULL data. Nothing is ever sent to a server.</p></div>`;

  const stack = document.createElement("div");
  stack.className = "stack";

  const exportBox = document.createElement("div");
  exportBox.className = "backup-box";
  exportBox.innerHTML = `<h3 style="margin-bottom:8px">Export</h3><p class="muted" style="margin-bottom:16px">Download your settings, favorites, and recently played as a JSON file.</p>`;
  const exportBtn = document.createElement("button");
  exportBtn.className = "btn btn-primary";
  exportBtn.textContent = "Export data";
  exportBtn.addEventListener("click", exportData);
  exportBox.appendChild(exportBtn);
  stack.appendChild(exportBox);

  const importBox = document.createElement("div");
  importBox.className = "backup-box";
  importBox.innerHTML = `<h3 style="margin-bottom:8px">Import</h3><p class="muted" style="margin-bottom:16px">Restore from a previously exported NULL backup file.</p>`;
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "application/json";
  fileInput.className = "visually-hidden";
  const importBtn = document.createElement("button");
  importBtn.className = "btn";
  importBtn.textContent = "Choose fileâ€¦";
  importBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    importData(file, (ok, message) => {
      showModal({
        title: ok ? "Import complete" : "Import failed",
        body: ok ? "Your data has been restored. Reload the page to see changes everywhere." : message,
        actions: [{ label: "OK", className: "btn-primary" }],
      });
    });
  });
  importBox.appendChild(importBtn);
  importBox.appendChild(fileInput);
  stack.appendChild(importBox);

  page.appendChild(stack);
  return page;
}
