import { generateText } from "ai";
import { getAIModel } from "../get-model";

const prompt = process.env.AI_SDK_PROMPT ?? "Hi!";
const model = getAIModel();

const main = async () => {
  const result = await generateText({ model, prompt });

  console.log(result.text);
};

main().catch(console.error);
