import { generateText, Output } from "ai";
import { z } from "zod";
import { getAIModel } from "../models";

const prompt =
  process.env.AI_SDK_PROMPT ??
  "Explain quantum physics in exactly 3 sentences.";

const model = getAIModel();

const output = Output.object({
  schema: z.object({
    sentences: z.array(z.string()),
  }),
});

const main = async () => {
  const result = await generateText({ model, prompt, output });

  console.log(result.output);
};

main();
// main().catch(console.error);
