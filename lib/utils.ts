import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * UNLINK-GLOBAL: CORE TAILWIND UTILS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 🛡️ ROBUST ASSET PROTOCOL
 * Helper to get Local Asset URL (Public Folder) with safety normalization
 */
export function getImageUrl(path: string): string {
  if (!path) return "/images/services/default.webp";
  if (path.startsWith("http")) return path;

  // 1. กำจัด / ตัวหน้าออกทั้งหมดก่อนเพื่อเริ่มใหม่
  const cleanPath = path.replace(/^\/+/, "");

  // 2. ถ้าใน Path มีคำว่า "images/" อยู่แล้ว ให้ใช้ตามนั้น
  if (cleanPath.startsWith("images/")) {
    return `/${cleanPath}`;
  }

  // 3. ถ้าไม่มี "images/" ให้เติมเข้าไป
  return `/images/${cleanPath}`;
}

/**
 * 🛡️ SECURE LOGGING PROTOCOL
 * Prevents PII leaks by sanitizing error objects before logging.
 */
export function safeErrorLog(context: string, error: unknown) {
  if (error instanceof Error) {
    // Log only the message to prevent leaking bound parameters or payload data in the stack or object properties
    console.error(`🚨 [${context}]: ${error.message}`);
  } else {
    console.error(
      `🚨 [${context}]: Unknown error occurred (details omitted for privacy)`,
    );
  }
}
