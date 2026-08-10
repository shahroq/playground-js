import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: bun run next:cli <filename>");
  process.exit(1);
}

const candidates = arg.includes(".")
  ? [arg]
  : [`${arg}.ts`, `${arg}.js`, `${arg}.tsx`, `${arg}.jsx`];

const resolvedFile = candidates.find((f) => existsSync(join(__dirname, f)));

if (!resolvedFile) {
  console.error(`Could not find any of: ${candidates.join(", ")}`);
  process.exit(1);
}

try {
  await import(`./${resolvedFile}`);
} catch (error) {
  console.error(`Failed to run: ${resolvedFile}`);
  console.error(error);
  process.exit(1);
}
