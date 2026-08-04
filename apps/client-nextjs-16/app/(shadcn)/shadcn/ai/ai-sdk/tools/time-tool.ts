import { logToFile } from "@/lib/log-to-file";
import { Json } from "@jsp/shared/comps";
import { tool } from "ai";
import { z } from "zod";

export const timeTool = tool({
  description:
    "Get the current time. Use this when the user asks what time it is.",

  inputSchema: z.object({
    timezone: z
      .string()
      .optional()
      .describe("Timezone like Europe/Berlin or America/New_York"),
  }),

  execute: async ({ timezone }) => {
    const now = new Date();
    const rslt = {
      timezone: timezone ?? "UTC",
      time: now.toISOString(),
    };
    // logToFile("[Time Tool Log]", rslt);

    return rslt;
  },
});
