/** @format */

import { safeErrorLog } from "./utils";

/**
 * 🔒 UNLINK-GLOBAL: ULTIMATE DATABASE CORE (v6.0 - Turso Standard)
 * -------------------------------------------------------------------------
 * ระบบจัดการฐานข้อมูลกลางผ่าน Turso (SQLite Cloud) - แผนสำรองทางยุทธศาสตร์
 * ใช้ Hrana over HTTP เพื่อความเสถียรสูงสุดในสภาพแวดล้อมจำลอง (Termux/Android)
 * ปฏิบัติตามมาตรฐาน AI Database Standards: Shared Core (Turso/SQLite)
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

    if (!cleanUrl || !authToken) {
      throw new Error("Missing Turso Configuration (URL or Token)");
    }

    const sql = typeof input === "string" ? input : input.sql;
    const args = typeof input === "string" ? [] : (input.args ?? []);

    try {
      // 🛰️ ใช้ Hrana over HTTP (v2 Pipeline) - เสถียรที่สุดสำหรับ Termux
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
                  if (typeof arg === "number") return { type: "float", value: arg };
                  if (typeof arg === "boolean") return { type: "integer", value: arg ? 1 : 0 };
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
        if (sqlError) throw new Error(`SQL_ERROR: ${sqlError.message}`);
        return { rows: [] };
      }

      const columns = result.cols.map((col) => col.name);
      return {
        rows: result.rows.map((row) => {
          const rowObj: Record<string, string | number | boolean | null> = {};
          row.forEach((cell, index) => {
            let val: string | number | boolean | null = null;
            if (cell && typeof cell === "object") {
              if (cell.type === "null") val = null;
              else if (cell.type === "integer") val = Number(cell.value);
              else if (cell.type === "float") val = cell.value as number;
              else if (cell.type === "text") val = cell.value as string;
              else if (cell.type === "blob") val = cell.base64 || null;
            } else {
              val = cell as any;
            }
            rowObj[columns[index]] = val === undefined ? null : val;
          });
          return rowObj;
        }),
      };
    } catch (error) {
      safeErrorLog("TURSO_FETCH_ERROR", error);
      throw error;
    }
  },
};
