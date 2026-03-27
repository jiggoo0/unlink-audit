/** 
 * @format 
 * @identity 9mza 
 */

import { NextResponse } from "next/server";
import { threatDetection } from "@/lib/threat-detection";

/**
 * 🛰️ THREAT SCAN API
 * -------------------------------------------------------------------------
 * รันระบบวิเคราะห์ Log เพื่อหาพฤติกรรมที่ผิดปกติ (Automated Threat Detection)
 */

export async function GET(request: Request) {
  // 🛡️ Security Check
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.AUDIT_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const simulate = searchParams.get("simulate");
    
    // 🧪 หากมีการขอ Simulation ให้สร้าง Log ปลอมก่อน
    if (simulate === "true") {
      const testIp = searchParams.get("ip") || "10.0.0.99";
      await threatDetection.simulateThreat(testIp);
    }

    // 🔍 รันการ Scan
    const report = await threatDetection.scan();

    return NextResponse.json({
      status: "Success",
      message: "Threat Detection Scan Completed",
      timestamp: new Date().toISOString(),
      report,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "Error",
        message: String(error),
      },
      { status: 500 },
    );
  }
}
