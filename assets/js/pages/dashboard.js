window.SFMS_PAGES = window.SFMS_PAGES || {};

window.SFMS_PAGES.dashboard = function () {
  const state = window.SFMS_STATE;
  const u = window.SFMS_UTILS;
  const session = state.session;
  const db = state.db;

  document.getElementById("page").innerHTML = `
    <div class="topbar">
      <div>
        <h2>Dashboard</h2>
        <div class="muted">Login sebagai ${u.escapeHtml(session.name)} (${u.escapeHtml(session.role)})</div>
      </div>
    </div>

    <div class="grid grid-3">
      <div class="card">
        <div class="muted">Sekolah</div>
        <div class="kpi">${db.schools.length}</div>
      </div>
      <div class="card">
        <div class="muted">Kelas</div>
        <div class="kpi">${db.classes.length}</div>
      </div>
      <div class="card">
        <div class="muted">Siswa</div>
        <div class="kpi">${db.students.length}</div>
      </div>
      <div class="card">
        <div class="muted">Guru</div>
        <div class="kpi">${db.teachers.length}</div>
      </div>
      <div class="card">
        <div class="muted">Mapel</div>
        <div class="kpi">${db.subjects.length}</div>
      </div>
      <div class="card">
        <div class="muted">Arsip siswa</div>
        <div class="kpi">${db.studentArchives.length}</div>
      </div>
    </div>

    <div class="card" style="margin-top:16px;">
      <h3>Info session</h3>
      <div class="table-wrap">
        <table>
          <tbody>
            <tr><th>Nama</th><td>${u.escapeHtml(session.name)}</td></tr>
            <tr><th>Username</th><td>${u.escapeHtml(session.username)}</td></tr>
            <tr><th>Role</th><td>${u.escapeHtml(session.role)}</td></tr>
            <tr><th>School ID</th><td>${u.escapeHtml(session.schoolid || "-")}</td></tr>
            <tr><th>Login at</th><td>${u.escapeHtml(session.loginat || "-")}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
};
