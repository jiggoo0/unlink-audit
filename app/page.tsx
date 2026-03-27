/** 
 * @format 
 * @identity 9mza 
 */
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Script from "next/script";
import { db } from "@/lib/shared-source/db";

/**
 * 🛰️ UNLINK-AUDIT: LIVE DASHBOARD
 * -------------------------------------------------------------------------
 * หน้าจอแสดงผลสถานะความปลอดภัยและการรวมข้อมูล (Log Aggregation)
 * ดึงข้อมูลสดจาก Turso Database
 */

export default async function AuditHome() {
  let stats: any[] = [];
  let recentLogs: any[] = [];
  let threatAlerts: any[] = [];
  let errorState = false;

  try {
    // 📊 Aggregation Logic: สรุปจำนวน Log แยกตามโดเมน
    const statsResult = await db.execute(`
      SELECT domain, COUNT(*) as count 
      FROM audit_logs 
      GROUP BY domain 
      ORDER BY count DESC
    `);
    stats = statsResult.rows;

    // 📜 ดึง 5 Log ล่าสุด
    const logsResult = await db.execute(`
      SELECT * FROM audit_logs 
      ORDER BY created_at DESC 
      LIMIT 5
    `);
    recentLogs = logsResult.rows;

    // 🚨 ดึง 5 Threat Alerts ล่าสุด
    const threatsResult = await db.execute(`
      SELECT * FROM threat_alerts 
      WHERE is_resolved = 0
      ORDER BY created_at DESC 
      LIMIT 5
    `);
    threatAlerts = threatsResult.rows;
  } catch (e) {
    console.error("Dashboard DB Fetch Error:", e);
    errorState = true;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UNLINK-TH Security Audit & Compliance",
    url: "https://audit.unlink-th.com",
    description:
      "Centralized Security Audit & Compliance Log for UNLINK-GLOBAL Ecosystem.",
    publisher: {
      "@type": "Organization",
      name: "AEMDEVWEB",
      sameAs: ["https://www.aemdevweb.com", "https://me.aemdevweb.com"],
    },
    author: {
      "@type": "Person",
      name: "Alongkorn Yomkerd",
      alternateName: "9mza",
      sameAs: ["https://me.aemdevweb.com", "https://github.com/9mza"],
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans p-4 md:p-12 flex flex-col">
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER: ELITE INSTITUTIONAL BRANDING */}
      <section className="border-b border-border pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase text-foreground">
            [ UNLINK-TH :: SECURITY AUDIT NODE ]
          </h1>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-2 tracking-widest uppercase">
            ESTABLISHED 2026 | CENTRALIZED COMPLIANCE COMMAND CORE (V.1.0)
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-[10px] text-right text-muted-foreground uppercase leading-relaxed border-l-2 border-border pl-4">
          <div>Authority Owner: อลงกรณ์ ยมเกิด (9mza)</div>
          <div>Node ID: AUDIT-TH-CORE-01</div>
          <div className="flex items-center justify-end mt-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
            Node Status: Operational
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow">
        {/* LEFT: LIVE AGGREGATION STATS & THREATS */}
        <section className="lg:col-span-1 space-y-12">
          {/* THREAT ALERTS SECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase border-b border-destructive pb-2 text-destructive flex justify-between">
              Active Threat Alerts
              <span className="animate-pulse text-[8px] bg-destructive text-destructive-foreground px-1">LIVE</span>
            </h3>
            {threatAlerts.length === 0 ? (
              <div className="text-muted-foreground text-[10px] italic">NO_ACTIVE_THREATS_DETECTED</div>
            ) : (
              <div className="space-y-3">
                {threatAlerts.map((alert, idx) => (
                  <div key={idx} className="p-3 border border-destructive/20 bg-destructive/5 rounded-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-destructive uppercase tracking-tighter">
                        {alert.type}
                      </span>
                      <span className="text-[9px] text-destructive/50 font-mono">
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      {alert.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DOMAIN STATS SECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase border-b border-border pb-2 text-muted-foreground">
              Domain Aggregation
            </h3>
            {errorState ? (
              <div className="text-destructive text-[10px]">ERROR_FETCHING_STATS</div>
            ) : stats.length === 0 ? (
              <div className="text-muted-foreground text-[10px]">NO_DATA_AVAILABLE</div>
            ) : (
              <div className="space-y-4">
                {stats.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-end border-b border-border pb-2"
                  >
                    <span className="text-xs text-foreground tracking-tighter">
                      {s.domain}
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {s.count}{" "}
                      <span className="text-[10px] text-muted-foreground font-normal">
                        LOGS
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CENTER & RIGHT: LIVE LOG STREAM */}
        <section className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-bold uppercase border-b border-border pb-2 text-muted-foreground">
            Real-time Audit Stream (Autonomous)
          </h3>
          {errorState ? (
            <div className="p-8 border border-destructive bg-destructive/10 text-destructive text-xs">
              CRITICAL_DB_CONNECTION_FAILURE: CHECK TURSO_AUTH_TOKEN
            </div>
          ) : recentLogs.length === 0 ? (
            <div className="p-8 border border-border bg-muted/50 text-muted-foreground text-xs text-center">
              Awaiting First Audit Log...
            </div>
          ) : (
            <div className="space-y-4">
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 border border-border bg-card hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex justify-between text-[10px] mb-2">
                    <span className="text-primary font-bold tracking-widest uppercase">
                      {log.action}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-foreground">{log.domain}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-sm ${
                        log.status === "PASSED" || log.status === "AUDITED"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-border hidden group-hover:block">
                    <pre className="text-[9px] text-muted-foreground whitespace-pre-wrap font-mono">
                      {log.metadata}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* FOOTER: GLOBAL AUTHORITY LINKING */}
      <footer className="mt-12 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-[10px] text-muted-foreground">
          <div className="mb-2 font-bold uppercase text-foreground">
            Compliance Standard
          </div>
          <div>
            This node operates under the Immutable Log Protocol. All security
            events are hashed and recorded to ensure zero-tampering. Managed
            autonomously by UNLINK-GLOBAL Ecosystem.
          </div>
        </div>

        <div className="text-[10px] text-muted-foreground flex flex-col justify-end">
          <div className="mb-2 font-bold uppercase text-foreground">
            Authority Verification
          </div>
          <div>
            Verified By:{" "}
            <a
              href="https://www.aemdevweb.com"
              className="text-primary hover:underline"
            >
              AEMDEVWEB
            </a>
          </div>
          <div>
            Identity Owner:{" "}
            <a
              href="https://me.aemdevweb.com"
              className="text-primary hover:underline"
            >
              {" "}
              Alongkorn Yomkerd
            </a>
          </div>
        </div>

        <div className="flex flex-col items-end justify-end space-y-2">
          <div className="text-[10px] text-muted-foreground">
            © 2026 UNLINK-GLOBAL | ALL RIGHTS RESERVED
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.aemdevweb.com"
              className="text-[10px] text-primary/70 hover:text-primary transition-colors uppercase font-bold tracking-tighter"
            >
              AEMDEVWEB
            </a>
            <a
              href="https://me.aemdevweb.com"
              className="text-[10px] text-primary/70 hover:text-primary transition-colors uppercase font-bold tracking-tighter"
            >
              9MZA PROFILE
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
