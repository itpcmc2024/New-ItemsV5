window.Api = {
  async request(action, payload = {}) {
    const url = window.APP_CONFIG.API_URL;
    if (!url || url.includes("PASTE_YOUR")) {
      throw new Error("ยังไม่ได้ตั้งค่า API_URL ใน js/config.js");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, payload })
    });

    if (!response.ok) {
      throw new Error(`API HTTP ${response.status}`);
    }

    const result = await response.json();
    if (!result.ok) {
      throw new Error(result.message || "เกิดข้อผิดพลาดจาก API");
    }
    return result.data;
  }
};
