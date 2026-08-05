import { appendFileSync } from "fs";
import { join } from "path";

const fileName = "ai-stream.log";

export const logToFile = (...args: unknown[]) => {
  const line = `[${new Date().toISOString()}] ${args
    .map((a) => (typeof a === "string" ? a : JSON.stringify(a)))
    .join(" ")}\n\n`;
  appendFileSync(join(process.cwd(), "logs", fileName), line);
};
