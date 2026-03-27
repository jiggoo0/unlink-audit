/**
 * @format 
 * @identity 9mza 
 */

import { db } from "./shared-source/db";

/**
 * 🛡️ UNLINK-AUDIT: AUTOMATED THREAT DETECTION ENGINE (V.1.0)
 * -------------------------------------------------------------------------
 * ระบบจำลองการตรวจจับภัยคุกคามโดยอัตโนมัติจาก Audit Logs
 */

export interface ThreatAlert {
  id: string;
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  description: string;
  metadata: string;
  is_resolved: number;
  created_at: string;
}

export const threatDetection = {
  /**
   * 🔍 Scan recent logs for suspicious patterns
   */
  scan: async () => {
    console.info("🛡️ [THREAT-DETECTION] Starting Log Analysis...");
    
    const timestamp = new Date().toISOString();
    const alerts: any[] = [];

    // 1. ตรวจจับการพยายามเข้าถึงโดยไม่ได้รับอนุญาต (Unauthorized Burst)
    // ค้นหา IP ที่มี 'Unauthorized access' มากกว่า 5 ครั้งใน 10 นาทีล่าสุด
    const unauthorizedBurst = await db.execute(`
      SELECT ip_address, COUNT(*) as count 
      FROM audit_logs 
      WHERE action = 'UNAUTHORIZED_ACCESS' 
      AND created_at > datetime('now', '-10 minutes')
      GROUP BY ip_address
      HAVING count >= 5
    `);

    for (const row of unauthorizedBurst.rows) {
      alerts.push({
        type: "BRUTE_FORCE_ATTEMPT",
        severity: "HIGH",
        description: `Detected brute force pattern from IP: ${row.ip_address}. Total attempts: ${row.count}`,
        metadata: JSON.stringify({ ip: row.ip_address, count: row.count }),
      });
    }

    // 2. ตรวจจับการเปลี่ยนแปลง Identity ที่น่าสงสัย (Identity Tampering)
    // จำลอง: หากมีการ SYNC_IDENTITY หลายครั้งในเวลาสั้นๆ สำหรับ ID เดียวกัน
    const identityTampering = await db.execute(`
      SELECT actor_id, COUNT(*) as count 
      FROM audit_logs 
      WHERE action = 'SYNC_IDENTITY'
      AND created_at > datetime('now', '-5 minutes')
      GROUP BY actor_id
      HAVING count > 10
    `);

    for (const row of identityTampering.rows) {
      alerts.push({
        type: "IDENTITY_TAMPERING",
        severity: "MEDIUM",
        description: `Suspicious high-frequency identity sync detected by actor: ${row.actor_id}`,
        metadata: JSON.stringify({ actor_id: row.actor_id, count: row.count }),
      });
    }

    // 3. บันทึก Alert ลงในฐานข้อมูล
    for (const alert of alerts) {
      const alertId = crypto.randomUUID();
      await db.execute({
        sql: `INSERT INTO threat_alerts (id, type, severity, description, metadata, is_resolved, created_at) 
              VALUES (?, ?, ?, ?, ?, 0, ?)`,
        args: [
          alertId,
          alert.type,
          alert.severity,
          alert.description,
          alert.metadata,
          timestamp,
        ],
      });
      
      // บันทึกกิจกรรมลงใน audit_logs ด้วย
      await db.execute({
        sql: `INSERT INTO audit_logs (id, domain, action, actor_id, status, metadata, created_at) 
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          crypto.randomUUID(),
          "audit.unlink-th.com",
          "THREAT_DETECTED",
          "SYSTEM-THREAT-ENGINE",
          "ALERT",
          JSON.stringify({ alert_id: alertId, type: alert.type }),
          timestamp,
        ],
      });
    }

    return {
      scan_at: timestamp,
      total_alerts: alerts.length,
      alerts,
    };
  },

  /**
   * 📊 Get current active threat alerts
   */
  getRecentAlerts: async (limit: number = 10) => {
    const result = await db.execute({
      sql: `SELECT * FROM threat_alerts ORDER BY created_at DESC LIMIT ?`,
      args: [limit],
    });
    return result.rows as unknown as ThreatAlert[];
  },

  /**
   * 🛠️ Simulation: Generate a dummy threat log for testing
   */
  simulateThreat: async (ip: string = "1.2.3.4") => {
    const timestamp = new Date().toISOString();
    // สร้าง Log ปลอมที่กระตุ้น Brute Force Detection
    for (let i = 0; i < 6; i++) {
      await db.execute({
        sql: `INSERT INTO audit_logs (id, domain, action, actor_id, status, metadata, ip_address, created_at) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          crypto.randomUUID(),
          "test-simulation.com",
          "UNAUTHORIZED_ACCESS",
          "UNKNOWN",
          "FAILED",
          JSON.stringify({ test: true }),
          ip,
          timestamp,
        ],
      });
    }
    return { status: "Threat Simulation Logs Generated", ip };
  }
};
