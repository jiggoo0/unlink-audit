/** 
 * @format 
 * @identity 9mza 
 */

import { safeErrorLog } from "./utils";

/**
 * 🔒 UNLINK-GLOBAL: ULTIMATE DATABASE CORE (v4.0 - Fetch Edition)
 * -------------------------------------------------------------------------
 * ระบบดึงข้อมูลผ่าน Fetch API โดยตรงเพื่อข้ามปัญหา Native Bindings บน Termux/Android
 * รองรับการทำงานทั้งบน Node.js, Vercel Edge, และสภาพแวดล้อมจำลอง
 */

interface QueryInput {
  sql: string;
  args?: (string | number | boolean | null)[];
}

interface HranaCell {
  type: "null" | "integer" | "float" | "text" | "blob";
  value?: string | number | null;
  base64?: string;
}

export interface ResultSet {
  rows: Record<string, string | number | boolean | null>[];
}

export const db = {
  execute: async (input: string | QueryInput): Promise<ResultSet> => {
    const rawUrl = process.env.TURSO_DATABASE_URL?.trim() ?? "";
    const authToken = process.env.TURSO_AUTH_TOKEN?.trim() ?? "";

    // 🛡️ Robust URL Sanitization
    let cleanUrl = rawUrl.replace("libsql://", "https://");
    if (cleanUrl.endsWith("/")) {
      cleanUrl = cleanUrl.slice(0, -1);
    }

    if (
      !cleanUrl ||
      !authToken ||
      authToken === cleanUrl.replace("https://", "")
    ) {
      throw new Error(
        "Missing or Invalid Database Configuration (URL/Token mismatch)",
      );
    }

    const sql = typeof input === "string" ? input : input.sql;
    const args = typeof input === "string" ? [] : (input.args ?? []);

    try {
      // 🛰️ ใช้ Hrana over HTTP (v2 Pipeline)
      const response = await fetch(`${cleanUrl}/v2/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              type: "execute",
              stmt: {
                sql,
                args: args.map((arg) => {
                  if (arg === null) return { type: "null" };
                  if (typeof arg === "number")
                    return { type: "float", value: arg };
                  if (typeof arg === "boolean")
                    return { type: "integer", value: arg ? 1 : 0 };
                  return { type: "text", value: String(arg) };
                }),
              },
            },
            { type: "close" },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DB_HTTP_ERROR: ${response.status} - ${errorText}`);
      }

      const data = (await response.json()) as {
        results?: {
          response?: {
            result?: {
              cols: { name: string }[];
              rows: HranaCell[][];
            };
            error?: { message: string };
          };
        }[];
      };
      const result = data.results?.[0]?.response?.result;

      if (!result) {
        const sqlError = data.results?.[0]?.response?.error;
        if (sqlError) {
          throw new Error(`SQL_ERROR: ${sqlError.message}`);
        }
        return { rows: [] };
      }

      // 🛡️ แปลงรูปแบบให้กลับมาเหมือน ResultSet ของ SDK เพื่อความเสถียรของระบบเดิม
      const columns = result.cols.map((col) => col.name);
      const rows = result.rows.map((row) => {
        const rowObj: Record<string, string | number | boolean | null> = {};
        row.forEach((cell, index) => {
          let val: string | number | boolean | null;

          if (cell && typeof cell === "object") {
            if (cell.type === "null") {
              val = null;
            } else if (cell.type === "integer") {
              // Hrana integers are returned as strings to support 64-bit
              val = Number(cell.value);
            } else if (cell.type === "float") {
              val = cell.value as number;
            } else if (cell.type === "text") {
              val = cell.value as string;
            } else if (cell.type === "blob") {
              val = cell.base64 || null;
            } else if ("value" in cell) {
              val = (cell.value as string | number | boolean) ?? null;
            } else {
              val = null; // Default fallback for unknown Hrana types
            }
          } else {
            val = cell;
          }

          rowObj[columns[index]] = val === undefined ? null : val;
        });
        return rowObj;
      });

      return { rows };
    } catch (error) {
      safeErrorLog("FETCH_DB_ERROR", error);
      throw error;
    }
  },
};

/**
 * 🛠️ [AI Automation] Initial Database Setup
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
