import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  HumanMessage,
  AIMessage,
  type BaseMessage,
} from "@langchain/core/messages";
import { getModel } from "./models";

const model = getModel();

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a friendly assistant. Keep answers short."],
  new MessagesPlaceholder("history"),
]);

const chain = prompt.pipe(model);

const main = async () => {
  let history: BaseMessage[] = [];

  const ask = async (question: string) => {
    history.push(new HumanMessage(question));

    const response = await chain.invoke({ history });
    history.push(new AIMessage(response.content as string));

    console.log(`> ${question}`);
    console.log(response.content);
    console.log();
  };

  await ask("My name is John Doe.");
  await ask("What's my name?");
};

main().catch(console.error);
