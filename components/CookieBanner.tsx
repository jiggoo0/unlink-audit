"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    window.localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    window.localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-[10000] mx-auto max-w-4xl"
        >
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-background/80 p-6 shadow-2xl backdrop-blur-xl md:flex-row">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Cookie className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight">
                  เราใช้คุกกี้เพื่อประสบการณ์ที่ดีที่สุด
                </h3>
                <p className="text-sm text-muted-foreground">
                  เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพและประสบการณ์การใช้งานที่ดีที่สุดให้กับคุณ
                  คุณสามารถอ่านรายละเอียดเพิ่มเติมได้ที่{" "}
                  <Link
                    href="/privacy"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                  >
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex w-full shrink-0 items-center gap-2 md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="w-full md:w-auto"
              >
                ปฏิเสธ
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="w-full md:w-auto"
              >
                ยอมรับทั้งหมด
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
