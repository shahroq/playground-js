import { z } from "zod";

export const weatherInputSchema = z.object({
  location: z
    .string()
    .describe("City name to get the weather for, e.g. 'London' or 'Tokyo'."),
});

export type WeatherInput = z.infer<typeof weatherInputSchema>;

export const weatherInputExamples = [
  { input: { location: "London" } },
  { input: { location: "Tokyo" } },
] satisfies { input: WeatherInput }[];
