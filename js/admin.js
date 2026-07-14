window.AdminPage = {
  render() {
    document.getElementById("adminRoot").innerHTML = `
      <div class="card">
        <div class="card-title"><i data-lucide="settings"></i>ตั้งค่าระบบ</div>
        <div class="card-body">
          <p>โมดูลตั้งค่า Sheet Default, เปลี่ยนชื่อชีท, User และ Warehouse จะย้ายเข้ามาใน Phase 2</p>
        </div>
      </div>
    `;
  }
};
