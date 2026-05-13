(function () {
  const state = window.SFMS_STATE;
  const auth = window.SFMS_AUTH;
  const router = window.SFMS_ROUTER;
  const u = window.SFMS_UTILS;

  function root() {
    return document.getElementById("app");
  }

  function navButton(route, label) {
    const active = state.route === route ? "active" : "";
    return `<button class="${active}" data-route="${route}">${label}</button>`;
  }

  function renderLogin(message = "") {
    root().innerHTML = `
      <div class="login-wrap">
        <div class="card login-card">
          <h2>Login SFMS</h2>
          <p class="muted">Masuk memakai akun dari Google Apps Script backend.</p>
          <form id="loginForm" class="grid">
            <input name="username" placeholder="Username" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit">Masuk</button>
          </form>
          <div class="muted" style="margin-top:12px;">
            Contoh seed: superadmin / 123456
          </div>
          ${message ? `<div class="error">${u.escapeHtml(message)}</div>` : ""}
        </div>
      </div>
    `;

    document.getElementById("loginForm").addEventListener("submit", onLoginSubmit);
  }

  function renderShell() {
  const s = state.session;

  if (!s) {
    renderLogin("Session tidak ditemukan");
    return;
  }

  root().innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">SFMS</div>
        <div class="brand-sub">Smart Foundation Management System</div>

        <div style="margin-bottom:18px;">
          <div><strong>${u.escapeHtml(s.name || "-")}</strong></div>
          <div class="muted" style="color:#cbd5e1;">${u.escapeHtml(s.role || "-")}</div>
          <div class="muted" style="color:#cbd5e1;">${u.escapeHtml(s.schoolid || "all")}</div>
        </div>

        <div class="nav" id="sideNav">
          ${navButton("dashboard", "Dashboard")}
          ${navButton("students", "Siswa")}
          ${navButton("classes", "Kelas")}
          ${navButton("attendance", "Absensi Siswa")}
          ${navButton("scanner", "Scanner")}
          ${navButton("teachers", "Guru & Mapel")}
          ${navButton("reports", "Laporan")}
          ${navButton("promotion", "Promosi")}
          ${navButton("archives", "Arsip")}
          ${navButton("settings", "Pengaturan")}
          <button id="logoutBtn" class="secondary">Keluar</button>
        </div>
      </aside>

      <main class="content">
        <div id="page"></div>
      </main>
    </div>
  `;

  u.qsa("[data-route]").forEach(btn => {
    btn.addEventListener("click", () => {
      router.setRoute(btn.dataset.route);
      renderShell();
    });
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    auth.logout();
    renderLogin();
  });

  router.render();
}

  async function onLoginSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value.trim();
    const password = form.password.value.trim();

    try {
      await auth.login(username, password);
      await auth.bootstrap();
      state.route = "dashboard";
      renderShell();
    } catch (err) {
      renderLogin(err.message || "Login gagal");
    }
  }

  async function boot() {
    const saved = u.loadSession();

    if (!saved) {
      renderLogin();
      return;
    }

    try {
      state.session = saved;
      await auth.bootstrap();
      state.route = "dashboard";
      renderShell();
    } catch (err) {
      auth.logout();
      renderLogin("Session habis atau bootstrap gagal");
    }
  }

  boot();
})();
