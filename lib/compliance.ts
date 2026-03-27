/** @format */

import { coreIdentities } from "./identities";
import { db } from "./shared-source/db";

/**
 * 🛡️ UNLINK-AUDIT: REGISTRY SYNC CORE
 * -------------------------------------------------------------------------
 * ระบบการตรวจสอบความถูกต้องของ Identity และการ Sync ข้อมูลเข้าสู่ระบบ Audit
 */

export const syncRegistryToAudit = async (actorId: string = "SYSTEM-AUDIT") => {
  console.info("🛡️ [AUDIT] Starting Registry Master Sync...");

  const results = [];
  const timestamp = new Date().toISOString();

  for (const identity of coreIdentities) {
    let status = "PASSED";
    let notes = "Identity matches institutional standards.";

    // 🔍 Compliance Rules
    if (identity.trust_level < 8) {
      status = "WARNING";
      notes = "Trust level below threshold (8). Requires manual verification.";
    }

    if (!identity.name || !identity.id) {
      status = "FAILED";
      notes = "Critical error: Missing core identification fields.";
    }

    try {
      // 1. บันทึกผลการตรวจสอบลงใน identities_audit
      const auditId = crypto.randomUUID();
      await db.execute({
        sql: `INSERT INTO identities_audit (id, identity_id, check_type, result, notes, created_at) 
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [auditId, identity.id, "registry-sync", status, notes, timestamp],
      });

      // 2. บันทึกกิจกรรมลงใน audit_logs สำหรับแต่ละ identity
      const logId = crypto.randomUUID();
      await db.execute({
        sql: `INSERT INTO audit_logs (id, domain, action, actor_id, status, metadata, created_at) 
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          logId,
          "audit.unlink-th.com",
          "SYNC_IDENTITY",
          actorId,
          status,
          JSON.stringify({ identity_id: identity.id, name: identity.name }),
          timestamp,
        ],
      });

      results.push({ id: identity.id, name: identity.name, status, notes });
    } catch (error) {
      console.error(
        `❌ [AUDIT] Failed to sync identity ${identity.id}:`,
        error,
      );
      results.push({
        id: identity.id,
        name: identity.name,
        status: "ERROR",
        notes: String(error),
      });
    }
  }

  return {
    sync_at: timestamp,
    total_processed: coreIdentities.length,
    results,
  };
};

/**
 * 🎓 E-E-A-T VERIFICATION ENGINE
 * -------------------------------------------------------------------------
 * ตรวจสอบความน่าเชื่อถือตามมาตรฐาน Experience, Expertise, Authoritativeness, Trustworthiness
 */
export const verifyEEATCompliance = async (identityId: string) => {
  const identity = coreIdentities.find((i) => i.id === identityId);
  if (!identity) throw new Error("Identity not found");

  const timestamp = new Date().toISOString();
  let score = 0;
  const reports: string[] = [];

  // 1. Experience & Expertise Check
  if (identity.expertise && identity.bio) {
    score += 40;
    reports.push("✅ Expertise & Experience documentation is complete.");
  } else {
    reports.push("⚠️ Missing expertise or bio details.");
  }

  // 2. Authoritativeness Check
  if (identity.trust_level >= 9) {
    score += 30;
    reports.push("✅ High Authoritativeness (Trust Level 9+).");
  } else {
    reports.push("ℹ️ Moderate Authoritativeness.");
  }

  // 3. Trustworthiness Check (Metadata Analysis)
  try {
    const meta = JSON.parse(identity.metadata || "{}");
    if (meta.alias || meta.tags || meta.operator) {
      score += 30;
      reports.push("✅ Technical Metadata verified (Trustworthiness).");
    }
  } catch {
    reports.push("❌ Invalid metadata structure.");
  }

  // 4. Global Authority Linking Check (sameAs Network)
  if (identity.sameAs && identity.sameAs.length > 0) {
    const hasAuthoritativeLink = identity.sameAs.some(
      (link) =>
        link.includes("aemdevweb.com") || link.includes("github.com/9mza"),
    );
    if (hasAuthoritativeLink) {
      score += 30;
      reports.push("✅ Global Authority Linking (sameAs) verified.");
    } else {
      reports.push(
        "ℹ️ External links present but not from primary authority nodes.",
      );
    }
  } else {
    reports.push("⚠️ Missing Global Authority Linking (sameAs).");
  }

  // Normalize score to 100 max
  const finalScore = Math.min(score, 100);
  const result =
    finalScore >= 90 ? "PASSED" : finalScore >= 60 ? "WARNING" : "FAILED";

  // บันทึกผลการตรวจสอบ E-E-A-T ลงในฐานข้อมูล
  const auditId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO identities_audit (id, identity_id, check_type, result, notes, created_at) 
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      auditId,
      identity.id,
      "eeat-verify",
      result,
      `Score: ${finalScore}/100. ${reports.join(" ")}`,
      timestamp,
    ],
  });

  return {
    identity_id: identity.id,
    eeat_score: finalScore,
    result,
    reports,
    verified_at: timestamp,
  };
};
