window.AppState = {
  isAdmin: false,
  currentUser: null,
  currentSheet: "",
  currentItem: null
};

function showPage(pageName) {
  document.querySelectorAll(".page-section").forEach(el => el.classList.add("hidden"));
  document.getElementById(`page-${pageName}`)?.classList.remove("hidden");

  document.querySelectorAll("#mainNav .nav-btn").forEach(btn => {
    btn.classList.toggle("nav-active", btn.dataset.page === pageName);
  });

  if (pageName === "submit") SubmitPage.render();
  if (pageName === "status") StatusPage.render();
  if (pageName === "workflow") WorkflowPage.render();
  if (pageName === "admin") AdminPage.render();

  if (window.lucide) lucide.createIcons();
}

function applyRoleUI() {
  document.querySelectorAll(".admin-only").forEach(el => {
    el.classList.toggle("hidden", !AppState.isAdmin);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#mainNav .nav-btn").forEach(btn => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
  });

  document.getElementById("adminBtn")?.addEventListener("click", () => {
    Swal.fire("กำลังพัฒนา", "โมดูล Login จะเชื่อมใน Phase 2", "info");
  });

  applyRoleUI();
  showPage("submit");
});
