import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * UNLINK-GLOBAL: CORE TAILWIND UTILS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

