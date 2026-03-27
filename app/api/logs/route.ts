/** @format */

import { NextResponse } from "next/server";
import { db } from "@/lib/shared-source/db";

export async function GET(request: Request) {
  // 🛡️ Security Check
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.AUDIT_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const limit = parseInt(searchParams.get("limit") || "50");
    
    // 🔍 ดึงข้อมูล Log ล่าสุดจาก audit_logs
    const auditLogs = await db.execute({
      sql: `SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ?`,
      args: [limit]
    });

    // 🔍 ดึงข้อมูลผลการตรวจสอบล่าสุดจาก identities_audit
    const identityAudit = await db.execute({
      sql: `SELECT * FROM identities_audit ORDER BY created_at DESC LIMIT ?`,
      args: [limit]
    });

    return NextResponse.json({ 
      status: "Success", 
      message: "Security Logs Retrieved",
      timestamp: new Date().toISOString(),
      data: {
        audit_logs: auditLogs.rows,
        identity_audit: identityAudit.rows
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      status: "Error", 
      message: String(error) 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // 🛡️ Elite Security Check (Header + SearchParams)
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get("authorization");
  const key = searchParams.get("key") || authHeader?.replace("Bearer ", "");

  if (!key || key !== process.env.AUDIT_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { domain, action, actor_id, metadata } = body;

    // 🔍 Strict Data Validation
    if (!domain || !action) {
      return NextResponse.json(
        { error: "Compliance Violation: Missing required fields (domain, action)" },
        { status: 400 },
      );
    }

    const logId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // 🔒 Immutable Log Insertion (SQL Injection Safe)
    await db.execute({
      sql: `INSERT INTO audit_logs (id, domain, action, actor_id, status, metadata, ip_address, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        logId,
        domain,
        action,
        actor_id || "SYSTEM",
        "AUDITED",
        JSON.stringify(metadata || {}),
        ip,
        timestamp,
      ],
    });

    return NextResponse.json(
      {
        status: "Success",
        message: "Institutional Audit Record Created",
        log_id: logId,
        timestamp,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "Protocol Error",
        message: String(error),
      },
      { status: 500 },
    );
  }
}
