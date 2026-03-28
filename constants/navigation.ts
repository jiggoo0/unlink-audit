/** @format */

import { NavItem } from "@unlink/shared/types";
import { siteConfig } from "./site-config";

export const mainNav: NavItem[] = [
  {
    title: "บริการของเรา",
    href: "/services",
    description: "แก้เครดิตบูโร กู้บ้านไม่ผ่าน และจัดการชื่อเสียงออนไลน์ให้คุณ",
  },
  {
    title: "ตัวอย่างความสำเร็จ",
    href: "/case-studies",
    description: "รวมเคสที่ช่วยลูกค้าแก้ปัญหาได้สำเร็จจริง มั่นใจในผลลัพธ์",
  },
  {
    title: "บทความน่ารู้",
    href: "/blog",
    description:
      "เคล็ดลับการขอวีซ่า วิธีเริ่มต้นใหม่ทางการเงิน และการป้องกันข้อมูลบนเน็ต",
  },
  {
    title: "คำถามที่พบบ่อย",
    href: "/faq",
    description: "ทุกคำตอบที่คุณสงสัยเรื่องการบริการและความปลอดภัย",
  },
  {
    title: "เกี่ยวกับเรา",
    href: "/about",
    description: "ทำความรู้จักทีมงาน UNLINK-GLOBAL ที่พร้อมช่วยเหลือคุณ",
  },
  {
    title: "ตรวจสอบสิทธิ์",
    href: "https://registry.unlink-th.com/verify",
    description: "ตรวจสอบการรับรองตัวตนและนิติบุคคลในระบบทะเบียนกลาง",
    external: true,
  },
];

export const serviceCategories = [
  {
    title: "Reputation Fix",
    description: "การกู้คืนและเยียวยาภาพลักษณ์ที่ได้รับความเสียหาย",
    items: [
      { title: "Extreme Intervention", href: "/services/extreme-intervention" },
      { title: "Blacklist Elimination", href: "/services/blacklist-removal" },
      { title: "Digital Crisis Cleanup", href: "/services/crisis-cleanup" },
    ],
  },
  {
    title: "Reputation Protection",
    description: "การอภิบาลและเสริมสร้างเกียรติภูมิระดับสถาบัน",
    items: [
      { title: "Brand Identity Engineering", href: "/services/brand-identity-engineering" },
      { title: "Digital Identity Detox", href: "/services/professional-digital-detox" },
      { title: "Institutional Reliability", href: "/services/institutional-reliability" },
    ],
  },
  {
    title: "IP Confirmation",
    description: "การรับรองและพิทักษ์สิทธิในทรัพย์สินทางปัญญา",
    items: [
      { title: "Private IP Registration", href: "/services/private-ip-registration" },
      { title: "Patent & Trademark Strategy", href: "/services/patent-trademark-strategy" },
    ],
  },
  {
    title: "PDPA Enforcement",
    description: "การบังคับใช้สิทธิตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล",
    items: [
      { title: "PDPA Legal Enforcement", href: "/services/pdpa-legal-action" },
      { title: "Corporate Data Governance", href: "/services/corporate-compliance" },
    ],
  },
];

export const footerNav = {
  solutions: [
    { title: "กู้คืนชื่อเสียงขั้นสูงสุด", href: "/services/extreme-intervention" },
    { title: "ล้างประวัติแบล็คลิสต์", href: "/services/blacklist-removal" },
    { title: "ปกป้องอัตลักษณ์แบรนด์", href: "/services/brand-identity-engineering" },
    { title: "จดทะเบียนทรัพย์สินทางปัญญา", href: "/services/private-ip-registration" },
    { title: "ฟ้องละเมิด PDPA", href: "/services/pdpa-legal-action" },
  ],
  support: [
    { title: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
    { title: "ศูนย์ช่วยเหลือ (FAQ)", href: "/faq" },
    { title: "มาตรฐานการบริการ", href: "/editorial-policy" },
    { title: "ติดต่อเรา", href: "/contact" },
  ],
  connect: [
    {
      title: "LINE Official (ปรึกษาฟรี)",
      href: siteConfig.contact.lineUrl,
      external: true,
    },
    {
      title: "Facebook Community",
      href: siteConfig.links.facebook,
      external: true,
    },
    {
      title: "Email ติดต่อ",
      href: `mailto:${siteConfig.contact.email}`,
      external: true,
    },
    {
      title: "Security Audit Log",
      href: "https://audit.unlink-th.com",
      external: true,
    },
  ],
};

export const navigationConfig = {
  header: {
    sticky: true,
    blur: true,
    ctaText: "ปรึกษาเคสฟรี (ทาง LINE)",
    ctaLink: siteConfig.contact.lineUrl,
  },
  footer: {
    disclaimer: "UNLINK-GLOBAL: เพราะทุกคนสมควรได้รับโอกาสเริ่มต้นใหม่เสมอ",
    copy: "UNLINK-GLOBAL | ผู้เชี่ยวชาญด้านการจัดการข้อมูลและชื่อเสียงออนไลน์",
  },
  securityNote:
    "Identity Registry: ข้อมูลตัวตนถูกรับรองโดย Vifily Global Registry Node",
};
