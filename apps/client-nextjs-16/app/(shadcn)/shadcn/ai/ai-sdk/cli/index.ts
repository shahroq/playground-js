const filename = process.argv[2];

if (!filename) {
  console.error("Usage: bun run next:cli <filename>");
  process.exit(1);
}

try {
  await import(`./${filename}`);
} catch (error) {
  console.error(`Failed to run: ${filename}`);
  console.error(error);
  process.exit(1);
}
