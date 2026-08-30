import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { getModel } from "./models";

const model = getModel();
const prompt1 = "Capital of UK.";
const prompt2 = [
  new SystemMessage("You are a terse geography assistant."),
  new HumanMessage("Capital of UK."),
];

const main = async () => {
  const stream = await model.stream(prompt2);

  for await (const chunk of stream) {
    process.stdout.write(chunk.content as string);
  }
  console.log(); // final newline
};
main().catch(console.error);
