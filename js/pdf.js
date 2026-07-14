window.PdfPage = {
  async generate() {
    if (!AppState.currentItem?.rowNumber) {
      return Swal.fire("ยังไม่ได้เลือกรายการ", "กรุณาเลือกรายการก่อน", "warning");
    }
    try {
      const result = await Api.request("pdf.create3Pages", {
        sheetName: AppState.currentSheet,
        rowNumber: AppState.currentItem.rowNumber
      });
      if (result?.url) window.open(result.url, "_blank");
    } catch (err) {
      Swal.fire("ผิดพลาด", err.message, "error");
    }
  }
};
