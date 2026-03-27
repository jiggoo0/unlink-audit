/** @format */

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Shield,
  Zap,
  Activity,
  Database,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header className="bg-transparent sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl transition-all duration-500">
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all"
          onClick={closeMenu}
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-colors group-hover:bg-white/10">
            <Image
              src="/branding/logo.svg"
              alt="Unlink-Audit Logo"
              width={24}
              height={24}
              className="transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xl font-black tracking-tight leading-none text-white uppercase">
              UNLINK
              <span className="text-primary align-top text-xs ml-0.5">
                -AUDIT
              </span>
            </span>
            <span className="text-[7px] font-mono tracking-[0.4em] text-white/50 uppercase mt-1 font-bold">
              Security & Compliance
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <div className="flex items-center gap-1">
            <Link
              href="https://www.unlink-th.com"
              target="_blank"
              className="hover:text-primary text-white/60 flex items-center gap-1.5 px-3 py-2 text-[9px] font-bold tracking-widest uppercase transition-all"
            >
              <Globe className="h-3 w-3 opacity-40" />
              Portal
            </Link>
            <Link
              href="https://unlink-registry.com"
              target="_blank"
              className="hover:text-primary text-white/60 flex items-center gap-1.5 px-3 py-2 text-[9px] font-bold tracking-widest uppercase transition-all"
            >
              <Database className="h-3 w-3 opacity-40" />
              Registry
            </Link>
            <Link
              href="https://audit.unlink-th.com"
              target="_blank"
              className="hover:text-primary text-white/60 flex items-center gap-1.5 px-3 py-2 text-[9px] font-bold tracking-widest uppercase transition-all"
            >
              <Activity className="h-3 w-3 opacity-40" />
              Audit
            </Link>
          </div>
        </nav>

        <button
          className="bg-white/10 hover:bg-white/20 flex h-12 w-12 items-center justify-center rounded-2xl text-white transition-all active:scale-90 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#0A0A0A] md:hidden"
          >
            <div className="flex h-20 items-center justify-between px-8 border-b border-white/10">
              <span className="font-mono text-xs font-black uppercase tracking-widest text-primary italic">
                Navigation
              </span>
              <button
                onClick={closeMenu}
                className="bg-white/10 flex h-10 w-10 items-center justify-center rounded-xl"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12">
              <div className="grid grid-cols-3 gap-2">
                  <Link
                    href="https://www.unlink-th.com"
                    target="_blank"
                    onClick={closeMenu}
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-4 text-[9px] font-black uppercase tracking-widest text-white transition-all active:scale-95"
                  >
                    <Globe className="h-5 w-5 opacity-70" />
                    Portal
                  </Link>
                  <Link
                    href="https://unlink-registry.com"
                    target="_blank"
                    onClick={closeMenu}
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-4 text-[9px] font-black uppercase tracking-widest text-white transition-all active:scale-95"
                  >
                    <Database className="h-5 w-5 opacity-70" />
                    Registry
                  </Link>
                  <Link
                    href="https://audit.unlink-th.com"
                    target="_blank"
                    onClick={closeMenu}
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-4 text-[9px] font-black uppercase tracking-widest text-white transition-all active:scale-95"
                  >
                    <Activity className="h-5 w-5 opacity-70" />
                    Audit
                  </Link>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* @identity 9mza */}
    </header>

  );
}
