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
