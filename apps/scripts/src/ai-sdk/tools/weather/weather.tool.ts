/**
 * tool.ts has zero fetch/business logic — it's just glue: schema in,
 * service out, error caught.
 */

import { tool } from "ai";
import { weatherInputSchema, weatherInputExamples } from "./weather.schema";
import { getWeather } from "./weather.service";

export const weatherTool = tool({
  description:
    "Get the current weather for a city. Use this tool whenever the user asks about weather, temperature, whether it's raining/sunny/cold, or what to wear outside for a specific place.",

  inputSchema: weatherInputSchema,
  inputExamples: weatherInputExamples,
  strict: true,

  execute: async (input) => {
    try {
      return await getWeather(input);
    } catch (error) {
      return {
        location: input.location,
        found: false as const,
        note: error instanceof Error ? error.message : "Weather lookup failed.",
      };
    }
  },
});
