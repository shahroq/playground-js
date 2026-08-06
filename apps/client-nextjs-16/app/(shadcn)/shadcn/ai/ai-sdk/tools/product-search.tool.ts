import { tool } from "ai";
import { z } from "zod";
import { pause } from "@jsp/shared/utils";

const products = [
  {
    id: 1,
    name: "MacBook Air M3",
    category: "laptop",
    price: 999,
  },
  {
    id: 2,
    name: "ThinkPad X1 Carbon",
    category: "laptop",
    price: 899,
  },
  {
    id: 3,
    name: "iPhone 16",
    category: "phone",
    price: 799,
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    category: "headphones",
    price: 349,
  },
];

export const productSearchTool = tool({
  description:
    "Search an internal product catalog. Use this tool whenever the user asks for products, shopping recommendations, prices, categories, laptops, phones, electronics, or finding items under a budget.",

  inputSchema: z.object({
    query: z.string().describe("Product keyword to search for"),
    maxPrice: z
      .number()
      .optional()
      .describe("Maximum product price as a number. Example: 900, not '900'."),
  }),

  inputExamples: [
    {
      input: {
        query: "laptop",
        maxPrice: 900,
      },
    },
    {
      input: {
        query: "headphones",
        maxPrice: 500,
      },
    },
  ],

  strict: true,

  execute: async ({ query, maxPrice }) => {
    await pause(1000);

    const result = products.filter((product) => {
      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());

      const matchesPrice = maxPrice == null || product.price <= maxPrice;

      return matchesQuery && matchesPrice;
    });

    return {
      query,
      count: result.length,
      products: result,
    };
  },
});
