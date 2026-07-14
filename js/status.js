window.StatusPage = {
  async render() {
    const root = document.getElementById("statusRoot");
    root.innerHTML = `
      <div class="card">
        <div class="card-title"><i data-lucide="clipboard-list"></i>ตรวจสอบสถานะ</div>
        <div class="card-body">
          <div class="form-grid">
            <div class="field col-span-2">
              <label>ค้นหา</label>
              <input id="statusSearch" class="input" placeholder="ชื่อรายการ / หน่วยงาน / INV / SAP / HOS">
            </div>
          </div>
          <div class="action-row">
            <button class="btn btn-primary" onclick="StatusPage.load()">เรียกข้อมูล</button>
          </div>
          <div id="statusList" style="margin-top:18px;"></div>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  async load() {
    const list = document.getElementById("statusList");
    list.innerHTML = "กำลังโหลด...";
    try {
      const rows = await Api.request("item.list", { sheetName: AppState.currentSheet });
      list.innerHTML = (rows || []).map(row => `
        <div class="card" style="margin-top:12px;">
          <div class="card-body">
            <strong>${row.item_name || "-"}</strong>
            <div>สถานะ: ${row.status || "-"}</div>
          </div>
        </div>
      `).join("") || "ไม่พบข้อมูล";
    } catch (err) {
      list.innerHTML = "";
      Swal.fire("ผิดพลาด", err.message, "error");
    }
  }
};
