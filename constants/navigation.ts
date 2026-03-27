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
    title: "Instant Alignment",
    description: "ระบบออกเอกสารอัตโนมัติ (จองตั๋ว/โรงแรม)",
    items: [
      { title: "Flight Itinerary", href: "/services/flight-itinerary-visa" },
      { title: "Hotel Booking", href: "/services/hotel-booking" },
    ],
  },
  {
    title: "Reputation Shield",
    description: "จัดการชื่อเสียงและลบข้อมูลออนไลน์",
    items: [
      { title: "Extreme Intervention", href: "/services/extreme-intervention" },
      { title: "Blacklist Remover", href: "/services/blacklist-remover" },
      { title: "Digital Crisis Cleanup", href: "/services/crisis-cleanup" },
    ],
  },
  {
    title: "Financial & Credit",
    description: "ฟื้นฟูเครดิตและวางแผนการเงิน",
    items: [
      { title: "Credit Engineering", href: "/services/credit-engineering" },
      {
        title: "Statement Optimization",
        href: "/services/statement-optimization",
      },
    ],
  },
];

export const footerNav = {
  solutions: [
    { title: "แก้เครดิตบูโร/กู้บ้าน", href: "/services/credit-engineering" },
    { title: "ลบชื่อประจานออนไลน์", href: "/services/blacklist-remover" },
    { title: "บริการจองตั๋ว/โรงแรม", href: "/services/flight-itinerary-visa" },
    {
      title: "กู้ชื่อเสียงร้านค้า SME",
      href: "/services/sme-reputation-rescue",
    },
    { title: "จัดการข้อมูลส่วนตัว", href: "/services/ex-partner-eraser" },
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
