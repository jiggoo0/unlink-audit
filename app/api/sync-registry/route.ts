/** @format */

import { NextResponse } from "next/server";
import { syncRegistryToAudit } from "@/lib/compliance";

export async function GET(request: Request) {
  // 🛡️ Security Check
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.AUDIT_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const actorId = searchParams.get("actor") || "SYSTEM-TRIGGER";
    const report = await syncRegistryToAudit(actorId);

    return NextResponse.json({
      status: "Success",
      message: "Registry Sync Completed",
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
