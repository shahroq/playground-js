import { generateText } from "ai";
import { getAIModel } from "./models";

const prompt = "Hi!";
const model = getAIModel();

const main = async () => {
  const result = await generateText({ model, prompt });

  console.log(result.text);
};

main().catch(console.error);
