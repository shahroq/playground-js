import { tool } from "ai";
import { z } from "zod";

export const calculatorTool = tool({
  description: "Perform basic arithmetic calculations.",

  inputSchema: z.object({
    operation: z.enum(["add", "subtract", "multiply", "divide"]),
    left: z.number(),
    right: z.number(),
  }),

  execute: async ({ operation, left, right }) => {
    switch (operation) {
      case "add":
        return {
          result: left + right,
        };

      case "subtract":
        return {
          result: left - right,
        };

      case "multiply":
        return {
          result: left * right,
        };

      case "divide":
        return {
          result: left / right,
        };
    }
  },
});
