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

/**
 * 🛡️ SIMPLE RATE LIMITER (In-Memory)
 * Note: This is a basic implementation for Termux/Edge environments.
 * For production, consider using Redis or a dedicated rate-limiting service.
 */
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function rateLimit(
  key: string,
  limit: number = 60,
  windowMs: number = 60000,
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key) || { count: 0, lastReset: now };

  if (now - entry.lastReset > windowMs) {
    entry.count = 0;
    entry.lastReset = now;
  }

  entry.count++;
  rateLimitMap.set(key, entry);

  // Return true if NOT limited (under the limit)
  return entry.count <= limit;
}
