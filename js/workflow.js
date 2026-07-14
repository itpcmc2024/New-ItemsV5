const WORKFLOW_TABS = [
  ["part1", "ตอนที่ 1 ผู้เสนอ"],
  ["part2", "ตอนที่ 2 หัวหน้า"],
  ["part3", "ตอนที่ 3 คณะกรรมการ"],
  ["resolution", "มติและผู้ลงนาม"]
];

window.WorkflowPage = {
  activeTab: "part1",

  render() {
    const root = document.getElementById("workflowRoot");
    root.innerHTML = `
      <div class="sub-tabs">
        ${WORKFLOW_TABS.map(([id, label]) =>
          `<button class="sub-tab ${id === this.activeTab ? "active" : ""}" onclick="WorkflowPage.openTab('${id}')">${label}</button>`
        ).join("")}
      </div>
      <div id="workflowContent"></div>
    `;
    this.renderActive();
  },

  openTab(tab) {
    this.activeTab = tab;
    this.render();
  },

  renderActive() {
    const root = document.getElementById("workflowContent");
    if (this.activeTab === "part1") root.innerHTML = this.part1Html();
    if (this.activeTab === "part2") root.innerHTML = this.part2Html();
    if (this.activeTab === "part3") root.innerHTML = this.part3Html();
    if (this.activeTab === "resolution") root.innerHTML = this.resolutionHtml();
    if (window.lucide) lucide.createIcons();
  },

  part1Html() {
    return `
      <div class="card">
        <div class="card-title"><i data-lucide="file-pen-line"></i>ตอนที่ 1 สำหรับผู้เสนอ</div>
        <div class="card-body">
          <div class="field">
            <label>ประเภทการเสนอ (AD)</label>
            <div class="radio-grid">
              ${["แบบปกติ","แบบเฉพาะราย เข้ารอบปกติ","ฉุกเฉิน"].map(v =>
                `<label class="radio-card"><input type="radio" name="wf_type" value="${v}">${v}</label>`
              ).join("")}
            </div>
          </div>

          <div class="form-grid" style="margin-top:18px;">
            <div class="field col-span-2"><label>ชื่อวัสดุ (AE)</label><input id="wf_item_name2" class="input"></div>
            <div class="field"><label>ชื่อตามระเบียบกรมบัญชีกลาง (AF)</label><input id="wf_item_name3" class="input"></div>
            <div class="field"><label>รหัสอุปกรณ์ (AG)</label><input id="wf_item_cgd_code" class="input"></div>
            <div class="field"><label>ขนาด (AH)</label><input id="wf_size" class="input"></div>
            <div class="field"><label>หน่วย (AI)</label><input id="wf_item_unit2" class="input"></div>
            <div class="field col-span-2"><label>อัตราการใช้ (AJ)</label><input id="wf_usage_rate" class="input"></div>
            <div class="field col-span-2"><label>เหตุผลความต้องการ (AK)</label><textarea id="wf_reason1" class="input"></textarea></div>
            <div class="field"><label>ราคาที่ขอซื้อ (AL)</label><input id="wf_unit_cost2" type="number" class="input"></div>
            <div class="field"><label>บริษัทผู้จำหน่าย (AM)</label><input id="wf_vendor" class="input"></div>
            <div class="field"><label>เบอร์โทรบริษัท (AN)</label><input id="wf_vendor_tel" type="tel" class="input"></div>
            <div class="field col-span-2"><label>วัสดุทดแทน/เหตุผลเพิ่มเติม (AO)</label><textarea id="wf_substitute_reason" class="input"></textarea></div>
            <div class="field"><label>ผู้เสนอ 1 (AP)</label><input id="wf_proposer1" class="input"></div>
            <div class="field"><label>วันที่ผู้เสนอ 1 (AQ)</label><input id="wf_proposer_date1" type="date" class="input"></div>
            <div class="field"><label>ผู้เสนอ 2 (AR)</label><input id="wf_proposer2" class="input"></div>
            <div class="field"><label>วันที่ผู้เสนอ 2 (AS)</label><input id="wf_proposer_date2" type="date" class="input"></div>
          </div>
          ${this.actionButtons()}
        </div>
      </div>`;
  },

  part2Html() {
    return `
      <div class="card">
        <div class="card-title"><i data-lucide="user-check"></i>ตอนที่ 2 สำหรับหัวหน้าสาขา/ฝ่าย/งาน</div>
        <div class="card-body">
          <div class="form-grid">
            <div class="field col-span-2"><label>ความเห็นหัวหน้า (AT)</label><textarea id="wf_boss_comment" class="input"></textarea></div>
            <div class="field"><label>ชื่อผู้ลงนาม (AU)</label><input id="wf_boss_sign" class="input"></div>
            <div class="field"><label>ตำแหน่ง (AV)</label><input id="wf_boss_position" class="input"></div>
            <div class="field"><label>วันที่ลงนาม (BN)</label><input id="wf_boss_date" type="date" class="input"></div>
          </div>
          ${this.actionButtons()}
        </div>
      </div>`;
  },

  part3Html() {
    return `
      <div class="card">
        <div class="card-title"><i data-lucide="users-round"></i>ตอนที่ 3 สำหรับคณะกรรมการ</div>
        <div class="card-body">
          <div class="field">
            <label>สถานะวัสดุในโรงพยาบาล (AW)</label>
            <div class="radio-grid">
              ${["มีในโรงพยาบาลในคลัง","ไม่มีในโรงพยาบาลมาก่อน"].map(v =>
                `<label class="radio-card"><input type="radio" name="wf_status2" value="${v}">${v}</label>`
              ).join("")}
            </div>
          </div>
          <div class="form-grid" style="margin-top:18px;">
            <div class="field"><label>ราคากรมบัญชีกลาง (AX)</label><input id="wf_cgd_price" type="number" class="input"></div>
            <div class="field"><label>รหัสอุปกรณ์/รหัสรายการ (AY)</label><input id="wf_committee_cgd_code" class="input"></div>
            <div class="field"><label>ราคาขาย (AZ)</label><input id="wf_hos_price" type="number" class="input"></div>
            <div class="field"><label>ค่าส่วนเกิน (BA)</label><input id="wf_hos_copay" type="number" class="input"></div>
            <div class="field col-span-2"><label>ข้อมูลอื่น ๆ (BB)</label><textarea id="wf_note2" class="input"></textarea></div>
            <div class="field"><label>กรรมการ/เลขานุการ (BC)</label><input id="wf_secretary_sign" class="input"></div>
            <div class="field"><label>วันที่ (BD)</label><input id="wf_secretary_date" type="date" class="input"></div>
          </div>
          ${this.actionButtons()}
        </div>
      </div>`;
  },

  resolutionHtml() {
    return `
      <div class="card">
        <div class="card-title"><i data-lucide="badge-check"></i>มติที่ประชุมและผู้ลงนาม</div>
        <div class="card-body">
          <div class="form-grid">
            <div class="field"><label>วันที่สรุปมติ (BE)</label><input id="wf_summarize_date" type="date" class="input"></div>
            <div class="field">
              <label>ผลมติ (BM)</label>
              <select id="wf_resolution_status" class="input">
                <option value="">-- เลือก --</option>
                <option>อนุมัติให้ดำเนินการ</option>
                <option>ไม่อนุมัติ</option>
              </select>
            </div>
            <div class="field col-span-2"><label>เหตุผล (BF)</label><textarea id="wf_resolution_reason" class="input"></textarea></div>

            <div class="field"><label>ผู้ลงนาม 1 (BG)</label><input id="wf_director_sign1" class="input"></div>
            <div class="field"><label>วันที่ 1 (BH)</label><input id="wf_director_date1" type="date" class="input"></div>
            <div class="field"><label>ผู้ลงนาม 2 (BI)</label><input id="wf_director_sign2" class="input"></div>
            <div class="field"><label>วันที่ 2 (BJ)</label><input id="wf_director_date2" type="date" class="input"></div>
            <div class="field"><label>ผู้ลงนาม 3 (BK)</label><input id="wf_director_sign3" class="input"></div>
            <div class="field"><label>วันที่ 3 (BL)</label><input id="wf_director_date3" type="date" class="input"></div>
          </div>
          ${this.actionButtons()}
        </div>
      </div>`;
  },

  actionButtons() {
    return `
      <div class="action-row">
        <button class="btn btn-secondary" onclick="WorkflowPage.load()">โหลดข้อมูล</button>
        <button class="btn btn-primary" onclick="WorkflowPage.save()">บันทึก</button>
        <button class="btn btn-success" onclick="PdfPage.generate()">สร้าง PDF 3 หน้า</button>
      </div>`;
  },

  collectAll() {
    const value = id => document.getElementById(id)?.value || "";
    const checked = name => document.querySelector(`input[name="${name}"]:checked`)?.value || "";

    return {
      type: checked("wf_type"),
      item_name2: value("wf_item_name2"),
      item_name3: value("wf_item_name3"),
      item_cgd_code: value("wf_item_cgd_code"),
      size: value("wf_size"),
      item_unit2: value("wf_item_unit2"),
      usage_rate: value("wf_usage_rate"),
      reason1: value("wf_reason1"),
      unit_cost2: value("wf_unit_cost2"),
      vendor: value("wf_vendor"),
      vendor_tel: value("wf_vendor_tel"),
      substitute_reason: value("wf_substitute_reason"),
      proposer1: value("wf_proposer1"),
      proposer_date1: value("wf_proposer_date1"),
      proposer2: value("wf_proposer2"),
      proposer_date2: value("wf_proposer_date2"),
      boss_comment: value("wf_boss_comment"),
      boss_sign: value("wf_boss_sign"),
      boss_position: value("wf_boss_position"),
      boss_date: value("wf_boss_date"),
      status2: checked("wf_status2"),
      cgd_price: value("wf_cgd_price"),
      committee_cgd_code: value("wf_committee_cgd_code"),
      hos_price: value("wf_hos_price"),
      hos_copay: value("wf_hos_copay"),
      note2: value("wf_note2"),
      secretary_sign: value("wf_secretary_sign"),
      secretary_date: value("wf_secretary_date"),
      summarize_date: value("wf_summarize_date"),
      resolution_reason: value("wf_resolution_reason"),
      director_sign1: value("wf_director_sign1"),
      director_date1: value("wf_director_date1"),
      director_sign2: value("wf_director_sign2"),
      director_date2: value("wf_director_date2"),
      director_sign3: value("wf_director_sign3"),
      director_date3: value("wf_director_date3"),
      resolution_status: value("wf_resolution_status")
    };
  },

  async save() {
    if (!AppState.currentItem?.rowNumber) {
      return Swal.fire("ยังไม่ได้เลือกรายการ", "กรุณาเลือกรายการจากหน้าตรวจสอบสถานะก่อน", "warning");
    }
    try {
      await Api.request("workflow.save", {
        sheetName: AppState.currentSheet,
        rowNumber: AppState.currentItem.rowNumber,
        data: this.collectAll()
      });
      Swal.fire("สำเร็จ", "บันทึกข้อมูล Workflow แล้ว", "success");
    } catch (err) {
      Swal.fire("ผิดพลาด", err.message, "error");
    }
  },

  async load() {
    if (!AppState.currentItem?.rowNumber) {
      return Swal.fire("ยังไม่ได้เลือกรายการ", "กรุณาเลือกรายการก่อน", "warning");
    }
    try {
      const data = await Api.request("workflow.get", {
        sheetName: AppState.currentSheet,
        rowNumber: AppState.currentItem.rowNumber
      });
      Swal.fire("โหลดข้อมูลแล้ว", "Phase ถัดไปจะเชื่อมค่าเข้าทุกช่องอัตโนมัติ", "success");
      console.log(data);
    } catch (err) {
      Swal.fire("ผิดพลาด", err.message, "error");
    }
  }
};
