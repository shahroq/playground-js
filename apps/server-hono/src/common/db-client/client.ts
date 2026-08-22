import { JSONFilePreset } from "lowdb/node";
import { fileURLToPath } from "node:url";
import path from "node:path";
import type { Product } from "@jsp/shared/types";

type Data = {
  version: string;
  products: Product[];
};

const defaultData: Data = {
  version: "1.1",
  products: [],
};

// Resolve the @jsp/shared package.json itself (always exported), then walk to catalog.json
const sharedPkgPath = fileURLToPath(
  import.meta.resolve("@jsp/shared/package.json"),
);
const catalogPath = path.join(
  path.dirname(sharedPkgPath),
  "src/json/catalog.json",
); // adjust "src/json" to match actual layout

export const db = await JSONFilePreset<Data>(catalogPath, defaultData);
