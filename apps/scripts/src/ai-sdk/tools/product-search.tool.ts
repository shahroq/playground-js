import { tool } from "ai";
import { z } from "zod";
import { pause } from "@jsp/shared/utils";

const products = [
  { id: 1, name: "Dummy MacBook Air M3", category: "laptop", price: 999 },
  { id: 2, name: "Dummy ThinkPad X1 Carbon", category: "laptop", price: 899 },
  { id: 3, name: "Dummy iPhone 16", category: "phone", price: 799 },
  { id: 4, name: "Dummy Sony WH-1000XM5", category: "headphones", price: 349 },
];

type Product = (typeof products)[number];

// --- Schema
const productSearchInputSchema = z.object({
  query: z
    .string()
    .describe(
      "A single product keyword or category only — e.g. 'laptop', 'headphones', 'phone'. Do NOT include price, budget, or filler words like 'under' or 'cheap' here; use maxPrice for that.",
    ),
  maxPrice: z.coerce
    .number()
    .optional()
    .describe("Maximum product price as a number. Example: 900, not '900'."),
});

type ProductSearchInput = z.infer<typeof productSearchInputSchema>;

const productSearchInputExamples = [
  { input: { query: "laptop", maxPrice: 900 } },
  { input: { query: "headphones", maxPrice: 500 } },
] satisfies { input: ProductSearchInput }[];

export const productSearchTool = tool({
  description:
    "Search an internal product catalog. Use this tool whenever the user asks for products, shopping recommendations, prices, categories, laptops, phones, electronics, or finding items under a budget. ALWAYS call this tool if the user mentions: buy, shop, product, price, laptop, phone, budget, catalog.",
  inputSchema: productSearchInputSchema,
  inputExamples: productSearchInputExamples,
  strict: true,
  execute: async (input) => {
    await pause(1000);
    const results = searchProducts(input);

    return {
      query: input.query,
      count: results.length,
      products: results,
      ...(results.length === 0 && {
        note: "No matches — try a broader query or higher maxPrice.",
      }),
    };
  },
});

// --- Matching logic
/** True if either string contains the other (handles plurals: "laptop" <-> "laptops") */
function fuzzyIncludes(a: string, b: string): boolean {
  return a.includes(b) || b.includes(a);
}

/** True if any query token loosely matches the product's name or category */
function matchesQuery(product: Product, queryTokens: string[]): boolean {
  const nameWords = product.name.toLowerCase().split(" ");
  const category = product.category.toLowerCase();

  return queryTokens.some((token) => {
    const matchesCategory = fuzzyIncludes(category, token);
    const matchesNameWord = nameWords.some((word) =>
      fuzzyIncludes(word, token),
    );
    return matchesCategory || matchesNameWord;
  });
}

function matchesPrice(product: Product, maxPrice?: number): boolean {
  return maxPrice == null || product.price <= maxPrice;
}

function searchProducts({ query, maxPrice }: ProductSearchInput): Product[] {
  const queryTokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  return products.filter(
    (product) =>
      matchesQuery(product, queryTokens) && matchesPrice(product, maxPrice),
  );
}
