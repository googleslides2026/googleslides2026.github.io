export function renderLicense() {
  const page = document.createElement("div");
  page.className = "page";
  page.innerHTML = `
    <div class="page-header"><h1>License</h1></div>
    <div class="stack">
      <div class="card">
        <h3 style="margin-bottom:8px">NULL's source code</h3>
        <p class="muted">This project is licensed under the GNU Affero General Public License v3.0 (AGPLv3). See the <code>LICENSE</code> file in the repository for the full text.</p>
      </div>
      <div class="card">
        <h3 style="margin-bottom:8px">Third-party content</h3>
        <p class="muted">Games and apps hosted under <code>/games</code> and <code>/apps</code> are not part of NULL's own codebase and are not automatically covered by NULL's license. Each piece of third-party content may carry its own license or terms.</p>
      </div>
    </div>
  `;
  return page;
}
