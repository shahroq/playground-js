import { existsSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "src");

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: bun run next:cli <filename>");
  process.exit(1);
}

const candidateNames = arg.includes(".")
  ? [arg]
  : [`${arg}.ts`, `${arg}.js`, `${arg}.tsx`, `${arg}.jsx`];

// Recursively list every file under src/, relative to src/
const allFiles = readdirSync(srcDir, { recursive: true }) as string[];

const matches = allFiles.filter((f) =>
  candidateNames.includes(f.split("/").pop()!),
);

if (matches.length === 0) {
  console.error(
    `Could not find any of: ${candidateNames.join(", ")} under ${srcDir}`,
  );
  process.exit(1);
}

if (matches.length > 1) {
  console.error(`Multiple matches found, please be more specific:`);
  matches.forEach((m) => console.error(`  - src/${m}`));
  process.exit(1);
}

const resolvedFile = matches[0];

try {
  await import(join(srcDir, resolvedFile));
} catch (error) {
  console.error(`Failed to run: src/${resolvedFile}`);
  console.error(error);
  process.exit(1);
}
