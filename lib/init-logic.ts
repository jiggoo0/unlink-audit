import { db } from "./shared-source/db";

/**
 * 🛡️ [AI Automation] Initial Database Setup
 * ⚡ สำหรับระบบ Audit Node
 */
export const initAuditDatabase = async () => {
  try {
    console.warn("🛠️ [AI] Initializing Audit Node Tables via HTTP...");

    // 🛡️ ตารางหลักสำหรับบันทึก Security Audit Logs
    await db.execute(`
      CREATE TABLE IF NOT EXISTS audit_logs (
          id TEXT PRIMARY KEY,
          domain TEXT NOT NULL,
          action TEXT NOT NULL,
          actor_id TEXT,
          status TEXT NOT NULL,
          metadata TEXT,
          ip_address TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 👤 ตารางประวัติการตรวจสอบ Identity (Compliance History)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS identities_audit (
          id TEXT PRIMARY KEY,
          identity_id TEXT NOT NULL,
          check_type TEXT NOT NULL, -- 'auth', 'registry-sync', 'eeat-verify'
          result TEXT NOT NULL,
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 🚨 ตารางบันทึกการตรวจจับภัยคุกคาม (Threat Detection)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS threat_alerts (
          id TEXT PRIMARY KEY,
          type TEXT NOT NULL,
          severity TEXT NOT NULL,
          description TEXT NOT NULL,
          metadata TEXT,
          is_resolved INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.info("✅ Audit Database initialized successfully.");
    return true;
  } catch (error) {
    console.error("❌ Audit Database init failed:", error);
    return false;
  }
};
