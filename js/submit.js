window.SubmitPage = {
  render() {
    const root = document.getElementById("submitRoot");
    if (!root || root.dataset.ready === "1") return;

    root.innerHTML = `
      <div class="card">
        <div class="card-title"><i data-lucide="package"></i>ข้อมูลรายการสินค้า</div>
        <div class="card-body">
          <div class="form-grid">
            <div class="field"><label>ชื่อ-สกุลผู้แจ้ง</label><input id="reporter_name" class="input"></div>
            <div class="field"><label>เบอร์ติดต่อ</label><input id="reporter_tel" class="input" type="tel"></div>
            <div class="field col-span-2"><label>ชื่อรายการ</label><input id="item_name" class="input"></div>
            <div class="field"><label>หน่วย</label><input id="item_unit" class="input"></div>
            <div class="field"><label>ราคาทุน</label><input id="unit_cost" class="input" type="number"></div>
            <div class="field"><label>ราคาขาย</label><input id="price" class="input" type="number"></div>
            <div class="field"><label>หน่วยงานที่ขอ</label><input id="department" class="input"></div>
            <div class="field"><label>คลัง</label><select id="warehouse" class="input"></select></div>
            <div class="field col-span-2"><label>หมายเหตุ</label><textarea id="note" class="input"></textarea></div>
          </div>
          <div class="action-row">
            <button class="btn btn-primary" onclick="SubmitPage.save()">บันทึกข้อมูล</button>
          </div>
        </div>
      </div>
    `;
    root.dataset.ready = "1";
  },

  collect() {
    const ids = ["reporter_name","reporter_tel","item_name","item_unit","unit_cost","price","department","warehouse","note"];
    return Object.fromEntries(ids.map(id => [id, document.getElementById(id)?.value || ""]));
  },

  async save() {
    const data = this.collect();
    if (!data.item_name.trim()) {
      return Swal.fire("ข้อมูลไม่ครบ", "กรุณากรอกชื่อรายการ", "warning");
    }

    Swal.fire({ title: "กำลังบันทึก...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    try {
      await Api.request("item.create", data);
      await Swal.fire("สำเร็จ", "บันทึกข้อมูลแล้ว", "success");
    } catch (err) {
      Swal.fire("ผิดพลาด", err.message, "error");
    }
  }
};
