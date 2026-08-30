import { stepCountIs, streamText } from "ai";
import { getAIModel } from "./models";
import { getTools } from "./tools";

const prompt = "What time is it now?";
const model = getAIModel();
const tools = getTools(["time"]);

const main = async () => {
  const result = streamText({
    model,
    prompt,
    tools,
    stopWhen: stepCountIs(5),
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }

  console.log();
};

main().catch(console.error);
