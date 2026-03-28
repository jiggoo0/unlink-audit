/** @format */

import { SiteConfig } from "../types";

export const siteConfig: SiteConfig = {
  name: "UNLINK-THAILAND Security Audit",
  fullName: "UNLINK-THAILAND | Security Audit & Compliance Node",
  description:
    "Centralized Security Audit & Compliance Log for UNLINK-THAILAND Ecosystem. Ensuring transparency and integrity for all reputation management operations.",
  url: "https://audit.unlink-th.com",
  ogImage: "/og/og-audit.webp",

  adsense: {
    publisherId: "pub-7695158092776507",
    clientId: "7859065032",
  },

  locale: "th_TH",
  language: "th",

  // ------------------------------------------------------------------
  // 👑 FOUNDER & AUTHORITY (รักษาความลับหน้าบ้าน ยืนยันตัวตนหลังบ้าน)
  // ------------------------------------------------------------------
  founder: {
    name: "9mza",
    nameTh: "นายเอ็มซ่ามากส์ (อลงกรณ์ ยมเกิด)",
    nickname: "9mza",
    alias: "Alongkorn Yomkerd",
    role: "Lead Infrastructure Architect",
    roleTh: "หัวหน้าฝ่ายสถาปัตยกรรมข้อมูลและการจัดการวิกฤต",
    description:
      "เบื้องหลังระบบการจัดการชื่อเสียงออนไลน์และฟื้นฟูโปรไฟล์บุคคลภายใต้ The Shield Protocol เพื่อมอบโอกาสการเริ่มต้นใหม่ให้กับผู้ที่ต้องการความเป็นส่วนตัวสูงสุด",
    url: "https://www.me.aemdevweb.com",
    sameAs: [
      "https://www.me.aemdevweb.com",
      "https://www.aemdevweb.com",
      "https://www.facebook.com/share/16jjyWbPyG/",
      "https://www.linkedin.com/in/alongkorl-aemdevweb",
    ],
  },

  company: {
    slogan:
      "UNLINK-GLOBAL | ยุติอดีตที่ทำร้ายคุณ ทวงคืนสิทธิ์การเริ่มต้นชีวิตใหม่",
    approach:
      "ทำจริงเห็นผล (Operational Excellence) | ปกป้องความลับขั้นสุด (The Shield Protocol)",
    positioning:
      "ที่ปรึกษาเบอร์ 1 ด้านการกู้คืนตัวตนและการจัดการวิกฤตที่ระบบปกติไม่รองรับ",
    legalName: "AEMDEVWEB",
  },

  developer: {
    name: "AEMDEVWEB",
    fullname: "AEMDEVWEB | Advanced Engineering Unit",
    url: "https://www.aemdevweb.com",
    role: "Full-stack Infrastructure & Security Architect",
  },

  // ------------------------------------------------------------------
  // 🎯 SEO & KEYWORDS
  // ------------------------------------------------------------------
  seo: {
    titleTemplate: "UNLINK-AUDIT | %s",
    defaultTitle: "UNLINK-AUDIT | Security Audit & Compliance Log",
    defaultDescription:
      "ตรวจสอบความโปร่งใสและประวัติการดำเนินงานในระบบ UNLINK-GLOBAL ผ่าน Security Audit Log ที่มีความปลอดภัยสูงสุด",
    keywords: [
      "UNLINK-GLOBAL",
      "Security Audit",
      "Compliance Log",
      "Reputation Management Audit",
      "Data Integrity",
      "The Shield Protocol",
    ],
  },

  contact: {
    primaryChannel: "LINE Official (ช่องทางลับพิเศษ)",
    lineUrl: "https://lin.ee/a8egw6Y",
    lineId: "@204uuzew",
    phone: "099-999-0000",
    email: "contact@unlink-global.com",
    qrImage: "https://qr-official.line.me/gs/M_204uuzew_BW.png?oat_content=qr",
    note: "เราเข้าใจว่าทุกคนเคยพลาด... ข้อมูลของคุณคือความลับสูงสุดสำหรับเรา ทักมาคุยกันก่อนได้ เพื่อให้คุณมูฟออนไปสู่ชีวิตที่ดีกว่าได้อย่างสบายใจครับ",
  },

  links: {
    facebook: "https://www.facebook.com/share/16jjyWbPyG/",
    twitter: "https://twitter.com/unlinkth",
    line: "https://lin.ee/a8egw6Y",
  },

  footer: {
    disclaimer:
      "UNLINK-GLOBAL (Thailand) is an International Strategic Unit operated by AEMDEVWEB.",
    trustNote: "Architected by 9mza / 9mzm | Part of UNLINK-GLOBAL Network",
    copyright: `© ${new Date().getFullYear()} UNLINK-GLOBAL | คืนสิทธิ์การเริ่มต้นใหม่ให้โปรไฟล์ของคุณ (Signature: 9mza / 9mzm)`,
    links: [
      { title: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
      { title: "มาตรฐานบริการ", href: "/editorial-policy" },
    ],
  },
};
