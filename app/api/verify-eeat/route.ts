/** @format */

import { NextResponse } from "next/server";
import { verifyEEATCompliance } from "@/lib/compliance";

export async function GET(request: Request) {
  // 🛡️ Security Check
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const id = searchParams.get("id");

  if (key !== process.env.AUDIT_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json(
      { error: "Identity ID is required" },
      { status: 400 },
    );
  }

  try {
    const report = await verifyEEATCompliance(id);

    return NextResponse.json({
      status: "Success",
      message: "E-E-A-T Verification Completed",
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
