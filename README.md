# New Items V5 Starter

แพ็กเกจนี้เป็นฐานเริ่มต้นสำหรับย้ายระบบ New Items V4 ไปเป็น:

- GitHub Pages = Front-end
- Google Apps Script = JSON API
- Google Sheet/Drive = Database และ Storage

## สิ่งที่มีใน Starter

- โครงสร้างไฟล์แยกโมดูล
- หน้า Submit พื้นฐาน
- หน้า Status พื้นฐาน
- Workflow 4 TAB
  - ตอนที่ 1 ผู้เสนอ
  - ตอนที่ 2 หัวหน้า
  - ตอนที่ 3 คณะกรรมการ
  - มติและผู้ลงนาม
- API Mapping Column AD–BN
- API บันทึก/อ่าน Workflow

## สิ่งที่ยังไม่เปิดใช้งาน

Starter นี้ยังไม่ใช่ตัวแทน V4 สำหรับใช้งานจริง และยังขาด:

- Login/Admin เต็มรูปแบบ
- Upload Drive
- Edit/Delete/Move Sheet
- CSV
- PDF หน้า 1 เดิม
- PDF หน้า 2–3
- User/Warehouse/System Settings
- การเติมค่าที่โหลดกลับลงทุกช่อง Front-end

## วิธีเริ่มทดสอบ

1. สร้าง Apps Script Project ใหม่ชื่อ `New Items V5 API`
2. สร้างไฟล์ `.gs` ตามไฟล์ในโฟลเดอร์ `gas`
3. Deploy เป็น Web App:
   - Execute as: Me
   - Who has access: Anyone
4. คัดลอก URL `/exec`
5. ใส่ใน `js/config.js`
6. อัปโหลดโฟลเดอร์หน้าเว็บขึ้น GitHub Pages

## คำแนะนำ

อย่าแทน V4 ที่ใช้งานจริงในตอนนี้ ให้ทดสอบ V5 ใน URL และ Apps Script แยกก่อน
