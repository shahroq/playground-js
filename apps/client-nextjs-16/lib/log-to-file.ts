import { appendFileSync } from "fs";
import { join } from "path";

export const logToFile = (...args: unknown[]) => {
  const line = `[${new Date().toISOString()}] ${args
    .map((a) => (typeof a === "string" ? a : JSON.stringify(a)))
    .join(" ")}\n`;
  appendFileSync(join(process.cwd(), "dev-stream.log"), line);
};
