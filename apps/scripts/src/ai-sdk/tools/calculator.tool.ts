import { tool } from "ai";
import { z } from "zod";

export const calculatorTool = tool({
  description:
    "Evaluate mathematical expressions. Use this tool whenever the user asks for calculations.",

  inputSchema: z.object({
    expression: z.string().describe("A mathematical expression like 2 + 3 * 5"),
  }),

  execute: async ({ expression }) => {
    // Never use eval() on untrusted input in production.
    const result = Function(`return (${expression})`)();

    return {
      expression,
      result,
    };
  },
});
