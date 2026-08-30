import { z } from "zod";
import { tool } from "@langchain/core/tools";
import {
  HumanMessage,
  SystemMessage,
  type BaseMessage,
} from "@langchain/core/messages";
import { getModel } from "./models";

const model = getModel();

if (!model.bindTools)
  throw new Error("This model does not support tool calling.");

const getWeather = tool(
  async ({ city }) => {
    return `It is sunny and 22°C in ${city}.`;
  },
  {
    name: "get_weather",
    description: "Get the current weather for a given city",
    schema: z.object({
      city: z.string().describe("The city to check the weather for"),
    }),
  },
);

const addNumbers = tool(async ({ a, b }) => String(a + b), {
  name: "add_numbers",
  description: "Add two numbers together",
  schema: z.object({
    a: z.number(),
    b: z.number(),
  }),
});

const tools = [getWeather, addNumbers];
const toolsByName = Object.fromEntries(tools.map((t) => [t.name, t]));

const modelWithTools = model.bindTools(tools);

const main = async () => {
  let messages: BaseMessage[] = [
    new SystemMessage("You are a helpful assistant. Use tools when needed."),
    new HumanMessage("What's the weather in London, and what's 12 + 30?"),
  ];

  let response = await modelWithTools.invoke(messages);

  while (response.tool_calls && response.tool_calls.length > 0) {
    messages.push(response);

    const toolResults = await Promise.all(
      response.tool_calls.map((call) => toolsByName[call.name].invoke(call)),
    );
    messages.push(...toolResults);

    response = await modelWithTools.invoke(messages);
  }

  console.log(response.content);
};

main().catch(console.error);
