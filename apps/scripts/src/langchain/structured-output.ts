import { ChatPromptTemplate } from "@langchain/core/prompts";
import { getModel } from "./models";

const model = getModel();

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant explaining things in a {tone} tone."],
  ["user", "Explain {topic} in two sentences."],
]);

const chain = prompt.pipe(model);

const askGeographyGuru = async (input: unknown) => {
  const result = await chain.invoke(input);

  console.log(result.content);
};

askGeographyGuru({
  topic: "the capital of the UK",
  tone: "playful",
}).catch(console.error);
