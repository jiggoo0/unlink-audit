# unlink-audit

## 🎯 วัตถุประสงค์ (Objective)

โดเมนนี้มีหน้าที่จัดการเกี่ยวกับ **Security Audit & Compliance** โดยจะเป็นระบบบันทึกและตรวจสอบความปลอดภัยส่วนกลาง (Logging Registry) เพื่อบันทึกทุกธุรกรรมและการยืนยันตัวตนจากโดเมนอื่นๆ ไว้ใช้สำหรับการตรวจสอบย้อนหลัง

## 📂 โครงสร้างโฟลเดอร์ (Directory Structure)

- `/app/api/`: เก็บ Route Handlers สำหรับรับข้อมูลและให้ข้อมูล Log แบบ API
- `/lib/`: สคริปต์เชื่อมต่อฐานข้อมูล (เช่น Turso) และ Logic ของการประมวลผล
- `/compliance/`: เก็บเอกสารและมาตรฐานทางกฏระเบียบต่างๆ

## 🚀 วิธีการใช้งาน (Usage)

1. `pnpm install`
2. `pnpm run dev` เพื่อรันในโหมด Development
3. `pnpm run aipc` เพื่อตรวจสอบคุณภาพโค้ด (Zero Error Policy)

## 🚨 ข้อควรระวัง (Critical Warnings)

- **Domain Isolation:** ห้ามนำเข้าไฟล์ข้ามโฟลเดอร์ไปที่ `unlink-portal` หรือ `unlink-registry` โดยตรง หากจำเป็นให้สื่อสารผ่าน API หรือใช้ `@unlink/shared`
- ห้ามมี Secret หรือ API keys หลุดไปในการ Commit เด็ดขาด
