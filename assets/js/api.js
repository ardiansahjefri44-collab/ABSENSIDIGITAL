window.SFMS_API = {
  async post(action, payload = {}) {
    const res = await fetch(window.SFMS_CONFIG.GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({ action, payload })
    });

    const json = await res.json();

    if (!json.success) {
      throw new Error(json.message || "Request gagal");
    }

    return json;
  },

  login(username, password) {
    return this.post("login", { username, password });
  },

  bootstrap(session) {
    return this.post("bootstrap", { session });
  },

  getDashboardAnalytics(session, schoolid, month) {
    return this.post("getDashboardAnalytics", { session, schoolid, month });
  },

  getMonthlyReport(session, schoolid, month) {
    return this.post("getMonthlyReport", { session, schoolid, month });
  },

  saveStudentAttendanceBulk(payload) {
    return this.post("saveStudentAttendanceBulk", payload);
  },

  scanStudentAttendance(payload) {
    return this.post("scanStudentAttendance", payload);
  },

  saveTeacherAttendance(payload) {
    return this.post("saveTeacherAttendance", payload);
  },

  updateSettings(payload) {
    return this.post("updateSettings", payload);
  },

  getStudentArchives(session, schoolid) {
    return this.post("getStudentArchives", { session, schoolid });
  },

  deleteStudentArchive(id) {
    return this.post("deleteStudentArchive", { id });
  }
};
