import { tool } from "ai";
import { z } from "zod";
import { isDev, logFile } from "@/lib/env";
import { logToFile } from "@jsp/shared/utils";
import { pause } from "@jsp/shared/utils";

export const timeTool = tool({
  description: "Get the current date and time.",

  inputSchema: z.object({
    timezone: z
      .string()
      .optional()
      .describe("An IANA timezone like Europe/Berlin"),
  }),

  execute: async ({ timezone }) => {
    await pause(3000);
    const now = new Date();
    const rslt = {
      timezone: timezone ?? "UTC",
      iso: now.toISOString(),
      local: now.toLocaleString("en-US", {
        timeZone: timezone,
      }),
    };

    if (isDev && logFile) logToFile("[Time Tool Log]", rslt);

    return rslt;
  },
});
