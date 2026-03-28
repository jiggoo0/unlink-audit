/** @format */

"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  caseId: string;
  variant?: "minimal" | "full" | "icon";
  className?: string;
}

/**
 * 🛡️ UNLINK-GLOBAL | Institutional Verified Badge
 * -------------------------------------------------------------------------
 * Component สำหรับดึงข้อมูลสถานะการรับรองจาก Registry Node แบบ Real-time
 */
export default function VerifiedBadge({
  caseId,
  variant = "full",
  className,
}: VerifiedBadgeProps) {
  const [status, setStatus] = useState<"loading" | "verified" | "error">(
    "loading",
  );

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/services/verify?caseId=${caseId}`);
        if (res.ok) {
          setStatus("verified");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };
    void checkStatus();
  }, [caseId]);

  if (status === "loading") {
    return (
      <div className={cn("animate-pulse flex items-center gap-2", className)}>
        <div className="h-4 w-4 rounded-full bg-primary/20" />
        <div className="h-2 w-16 rounded bg-primary/10" />
      </div>
    );
  }

  if (status === "error") return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 transition-all duration-500",
        variant === "full" &&
          "bg-emerald-500/5 border border-emerald-500/20 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.05)]",
        variant === "minimal" && "bg-emerald-500/10 px-2 py-0.5 rounded",
        className,
      )}
    >
      {variant === "icon" ? (
        <ShieldCheck className="h-5 w-5 text-emerald-500" />
      ) : (
        <>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500/10" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 font-mono">
            {variant === "full" ? `Verified Authority: ${caseId}` : "Verified"}
          </span>
          {variant === "full" && (
            <div className="flex items-center gap-1 border-l border-emerald-500/20 pl-2 ml-1">
              <Activity className="h-2.5 w-2.5 text-emerald-500/60 animate-pulse" />
              <span className="text-[7px] font-bold text-emerald-500/60 uppercase">
                Active Registry Node
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
