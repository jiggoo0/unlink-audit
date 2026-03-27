export function safeErrorLog(context: string, error: unknown) {
  console.error(`[${context}]`, error);
}
