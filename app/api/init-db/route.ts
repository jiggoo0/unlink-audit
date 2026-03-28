import { NextResponse } from "next/server";
import { initAuditDatabase } from "@/lib/init-logic";

export async function GET(request: Request) {
  // 🛡️ ระบบป้องกันความปลอดภัยพื้นฐาน (Check Secret Key)
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.AUDIT_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const success = await initAuditDatabase();
    if (success) {
      return NextResponse.json({
        status: "Success",
        message: "Audit Database Node is now Operational.",
        timestamp: new Date().toISOString(),
      });
    } else {
      throw new Error("Initialization failed");
    }
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
