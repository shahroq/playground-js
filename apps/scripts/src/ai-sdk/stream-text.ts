import { streamText } from "ai";
import { getAIModel } from "./models";

const prompt = process.env.AI_SDK_PROMPT ?? "Hi!";
const model = getAIModel();

const main = async () => {
  const result = streamText({ model, prompt });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }

  console.log();
};

main().catch(console.error);
