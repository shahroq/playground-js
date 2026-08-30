import { existsSync, readdirSync } from "fs";
import { dirname, join, relative } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "src");

const arg = process.argv[2];

if (!arg) {
  console.error("Usage: bun run cli <filename>");
  process.exit(1);
}

const extensions = [".ts", ".js", ".tsx", ".jsx"];

const findFile = (dir: string): string | undefined => {
  if (!existsSync(dir)) return undefined;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      const result = findFile(fullPath);

      if (result) return result;

      continue;
    }

    const hasValidExtension = extensions.some((extension) =>
      entry.name.endsWith(extension),
    );

    if (!hasValidExtension) continue;

    const filenameWithoutExtension = entry.name.slice(
      0,
      -extensions.find((extension) => entry.name.endsWith(extension))!.length,
    );

    if (entry.name === arg || filenameWithoutExtension === arg) return fullPath;
  }

  return undefined;
};

const resolvedFile = findFile(srcDir);

if (!resolvedFile) {
  console.error(`Could not find "${arg}" inside ${srcDir}`);
  process.exit(1);
}

try {
  await import(pathToFileURL(resolvedFile).href);
} catch (error) {
  const relativePath = relative(__dirname, resolvedFile);

  console.error(`Failed to run: ${relativePath}`);
  console.error(error);
  process.exit(1);
}
