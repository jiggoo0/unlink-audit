/** @format */

import Link from "next/link";
import {
  Globe,
  Terminal,
  ShieldCheck,
  ExternalLink,
  Activity,
  Database,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-transparent pt-32 pb-16 overflow-hidden relative">
      <div className="container relative z-10">
        <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-12 md:flex-row">
          <div className="flex flex-col gap-2">
            <p className="text-white/50 text-[9px] tracking-[0.4em] uppercase font-bold">
              © {new Date().getFullYear()} UNLINK-AUDIT • Status:
              <span className="text-primary ml-2">OPERATIONAL</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
             <Link
                href="https://www.unlink-th.com"
                target="_blank"
                className="bg-white/5 border-white/20 flex items-center gap-4 rounded-2xl border px-8 py-5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-primary/5 group"
              >
                <Globe className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-white font-mono text-[10px] tracking-[0.3em] uppercase font-black">
                  Portal
                </span>
              </Link>
              <Link
                href="https://unlink-registry.com"
                target="_blank"
                className="bg-white/5 border-white/20 flex items-center gap-4 rounded-2xl border px-8 py-5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-primary/5 group"
              >
                <Database className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-white font-mono text-[10px] tracking-[0.3em] uppercase font-black">
                  Registry
                </span>
              </Link>
              <Link
                href="https://audit.unlink-th.com"
                target="_blank"
                className="bg-white/5 border-white/20 flex items-center gap-4 rounded-2xl border px-8 py-5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-primary/5 group"
              >
                <Activity className="text-primary h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-white font-mono text-[10px] tracking-[0.3em] uppercase font-black">
                  Audit
                </span>
              </Link>
          </div>
        </div>
      </div>
      {/* @identity 9mza */}
    </footer>

  );
}
