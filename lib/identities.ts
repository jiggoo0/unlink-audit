import { Identity } from "../types";

/**
 * 🆔 UNLINK-GLOBAL: CORE IDENTITY REGISTRY (Source of Truth)
 * -------------------------------------------------------------------------
 * มาตรฐานข้อมูลบุคคล (5 ราย) และบริษัท (1 ราย) ตามระบบสากล
 * ใช้สำหรับการตรวจสอบสิทธิ์ (Auth), บันทึกประวัติ (Audit) และการยืนยันสาธารณะ (Registry)
 */

export const coreIdentities: Identity[] = [
  // --- 👥 5 INDIVIDUALS (PERSONS) ---
  {
    id: "UL-P-001",
    type: "person",
    name: "9mza / Alongkorn Yomkerd",
    gender: "Male",
    expertise: "Strategic Intelligence & InfoSec",
    bio: "Founding Architect of The Shield Protocol. Specializing in high-stakes reputation management and digital identity recovery.",
    trust_level: 10,
    last_checked: new Date().toISOString(),
    created_at: "2024-01-01T00:00:00Z",
    updated_at: new Date().toISOString(),
    sameAs: [
      "https://me.aemdevweb.com",
      "https://www.aemdevweb.com",
      "https://github.com/9mza",
    ],
    metadata: JSON.stringify({
      alias: "9mza",
      role: "Founder / Ultimate Authority Owner",
      real_name: "Alongkorn Yomkerd (อลงกรณ์ ยมเกิด)",
      tags: ["Infrastructure", "Security", "Crisis Management"],
    }),
  },
  {
    id: "UL-P-002",
    type: "person",
    name: "นาย ก. (นายสมมุติ)",
    gender: "Male",
    expertise: "Financial Profile Engineering",
    bio: "Senior Consultant for financial statement optimization and mortgage approval strategies in the digital era.",
    trust_level: 8,
    last_checked: new Date().toISOString(),
    created_at: "2024-01-15T00:00:00Z",
    updated_at: new Date().toISOString(),
    metadata: JSON.stringify({
      alias: "Mr. S",
      role: "Financial Advisor",
      tags: ["Banking", "Mortgage", "Statement"],
    }),
  },
  {
    id: "UL-P-003",
    type: "person",
    name: "คุณ จิราภรณ์ (นามสมมุติ)",
    gender: "Female",
    expertise: "Digital Reputation Management",
    bio: "Expert in Google search content removal and PDPA enforcement for individual privacy rights.",
    trust_level: 9,
    last_checked: new Date().toISOString(),
    created_at: "2024-02-01T00:00:00Z",
    updated_at: new Date().toISOString(),
    metadata: JSON.stringify({
      role: "Reputation Expert",
      tags: ["SEO", "Content Removal", "Privacy"],
    }),
  },
  {
    id: "UL-P-004",
    type: "person",
    name: "คุณ กิตติพงษ์ (นามสมมุติ)",
    gender: "Male",
    expertise: "Legal Compliance & Data Privacy",
    bio: "Specializing in online defamation cases and legal framework for identity restoration.",
    trust_level: 9,
    last_checked: new Date().toISOString(),
    created_at: "2024-02-10T00:00:00Z",
    updated_at: new Date().toISOString(),
    metadata: JSON.stringify({
      role: "Legal Officer",
      tags: ["Law", "Compliance", "PDPA"],
    }),
  },
  {
    id: "UL-P-005",
    type: "person",
    name: "คุณ สุรีรัตน์ (นามสมมุติ)",
    gender: "Female",
    expertise: "Strategic Communications",
    bio: "Director of re-branding and crisis communication for high-profile clients transitioning to new professional identities.",
    trust_level: 8,
    last_checked: new Date().toISOString(),
    created_at: "2024-03-01T00:00:00Z",
    updated_at: new Date().toISOString(),
    metadata: JSON.stringify({
      role: "Comms Director",
      tags: ["Branding", "PR", "Crisis Comms"],
    }),
  },

  // --- 🏢 1 COMPANY (ORGANIZATION) ---
  {
    id: "UL-C-001",
    type: "organization",
    name: "UNLINK-GLOBAL (Thailand)",
    industry: "Digital Identity & Reputation Management",
    key_person_id: "UL-P-001",
    assets_summary: "The Shield Protocol & Global Verification Network",
    trust_level: 10,
    last_checked: new Date().toISOString(),
    created_at: "2024-01-01T00:00:00Z",
    updated_at: new Date().toISOString(),
    sameAs: ["https://www.aemdevweb.com"],
    metadata: JSON.stringify({
      slogan: "ยุติอดีตที่ทำร้ายคุณ ทวงคืนสิทธิ์การเริ่มต้นชีวิตใหม่",
      operator: "AEMDEVWEB / อลงกรณ์ ยมเกิด",
    }),
  },
];

export const getIdentityById = (id: string) =>
  coreIdentities.find((identity) => identity.id === id);
