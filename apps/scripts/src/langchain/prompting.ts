import { ChatPromptTemplate } from "@langchain/core/prompts";
import { getModel } from "./models";

const model = getModel();

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant explaining things in a {tone} tone."],
  ["user", "Explain {topic} in two sentences."],
]);

const chain = prompt.pipe(model);

const main = async () => {
  const result = await chain.invoke({
    topic: "the capital of the UK",
    tone: "playful",
  });

  console.log(result.content);
};

main().catch(console.error);
