/** @format */

import Link from "next/link";
import { siteConfig } from "@/constants/site-config";
import {
  Globe,
  Terminal,
  ShieldCheck,
  ExternalLink,
  Activity,
  Database,
} from "lucide-react";
import { footerNav } from "@/constants/navigation";
import VerifiedBadge from "@/components/shared/VerifiedBadge";

/**
 * UNLINK-AUDIT | Institutional Footer Protocol (Light & Trusted Edition)
 * -------------------------------------------------------------------------
 * ปรับปรุงเพื่อสร้างความเชื่อมั่นระดับสูงสุด เน้นความสะอาดและโครงสร้างที่โปร่งใส
 */
export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background pt-32 pb-16 overflow-hidden relative">
      <div className="container relative z-10">
        <div className="grid gap-20 lg:grid-cols-12">
          {/* --- Brand & Authority Sector --- */}
          <div className="space-y-12 lg:col-span-5">
            <div className="space-y-8">
              <Link href="/" className="group flex items-center gap-5">
                <div className="bg-primary/5 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/10 transition-all duration-700 group-hover:bg-primary/10 group-hover:border-primary/20 shadow-[0_0_40px_rgba(72,135,255,0.05)]">
                  <Activity className="text-primary h-10 w-10" />
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black tracking-tighter text-foreground uppercase">
                    UNLINK
                    <span className="text-primary text-base ml-1">
                      -AUDIT
                    </span>
                  </span>
                  <span className="text-muted-foreground font-mono text-[10px] tracking-[0.4em] uppercase font-bold mt-2">
                    Security & Compliance Node
                  </span>
                </div>
              </Link>
              <p className="text-muted-foreground/80 max-w-md text-xl leading-relaxed font-light">
                ระบบบันทึกและตรวจสอบความโปร่งใสในการดำเนินงาน (Security Audit Log)
                ภายใต้เครือข่าย UNLINK-GLOBAL เพื่อรับประกันความถูกต้องและธรรมาภิบาลข้อมูล
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <Link
                href="https://www.unlink-th.com"
                target="_blank"
                className="bg-white/50 border-border/60 flex items-center gap-4 rounded-2xl border px-8 py-5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-primary/5 group"
              >
                <Globe className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-foreground font-mono text-[10px] tracking-[0.3em] uppercase font-black">
                  Portal
                </span>
              </Link>
              <Link
                href="https://unlink-registry.com"
                target="_blank"
                className="bg-white/50 border-border/60 flex items-center gap-4 rounded-2xl border px-8 py-5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-primary/5 group"
              >
                <Database className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-foreground font-mono text-[10px] tracking-[0.3em] uppercase font-black">
                  Registry
                </span>
              </Link>
              <Link
                href="https://audit.unlink-th.com"
                target="_blank"
                className="bg-white/50 border-border/60 flex items-center gap-4 rounded-2xl border px-8 py-5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-primary/5 group"
              >
                <Activity className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-foreground font-mono text-[10px] tracking-[0.3em] uppercase font-black">
                  Audit
                </span>
              </Link>
            </div>
          </div>

          {/* --- Strategic Links Grid --- */}
          <div className="grid grid-cols-2 gap-10 lg:col-span-4">
            <div className="space-y-8">
              <h4 className="text-[10px] font-black tracking-[0.4em] text-foreground uppercase italic border-l-2 border-primary pl-4">
                Protocols
              </h4>
              <ul className="space-y-4">
                {footerNav.solutions.slice(0, 4).map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-all text-sm font-light flex items-center gap-2 group"
                    >
                      <div className="h-1 w-0 bg-primary/40 transition-all group-hover:w-2" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black tracking-[0.4em] text-foreground uppercase italic border-l-2 border-primary pl-4">
                Authority
              </h4>
              <ul className="space-y-4">
                {footerNav.support.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-all text-sm font-light"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- Infrastructure --- */}
          <div className="space-y-8 lg:col-span-3">
            <h4 className="text-[10px] font-black tracking-[0.4em] text-foreground uppercase italic border-l-2 border-primary pl-4">
              Audit Infrastructure
            </h4>
            <div className="bg-primary/5 rounded-3xl border border-primary/10 p-8 space-y-6 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity group-hover:opacity-10">
                <Terminal size={80} className="text-primary" />
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Terminal className="text-primary h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-foreground text-lg font-black tracking-tighter uppercase italic">
                      AEMDEVWEB
                    </p>
                    <p className="text-primary/60 font-mono text-[7px] mt-1 tracking-widest uppercase font-bold">
                      System Architecture Lead
                    </p>
                  </div>
                  <VerifiedBadge caseId="UL-C-001" variant="minimal" />
                </div>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed font-light relative z-10">
                Architected by AEMDEVWEB for global data integrity and registry
                security standards.
              </p>
              <div className="pt-2 relative z-10 border-t border-border">
                <a
                  href="https://www.aemdevweb.com"
                  target="_blank"
                  className="text-primary hover:text-foreground flex items-center justify-between text-[10px] font-bold tracking-widest uppercase transition-all"
                >
                  Source Node <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-border pt-12 md:flex-row">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-[9px] tracking-[0.4em] uppercase font-bold">
              © {new Date().getFullYear()} UNLINK-AUDIT • Status:
              <span className="text-primary ml-2">OPERATIONAL</span>
            </p>
            <p className="text-muted-foreground/60 font-mono text-[7px] tracking-[0.5em] uppercase">
              NODE_ID: 0x_AUDIT_2026_STABLE
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground">
              <span>System Status:</span>
              <span className="flex items-center gap-1.5 text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* @identity 9mza */}
    </footer>
  );
}
