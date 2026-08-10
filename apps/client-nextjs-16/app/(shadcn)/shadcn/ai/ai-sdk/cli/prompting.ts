import { streamText } from "ai";
import { getAIModel } from "../models";

const model = getAIModel();
const INPUT = `Do some research on monitors and how can I minimize the eye fatigue using them?`;
const prompt = `
You are a helpful assistant that generates titles for conversations.

<conversation-history>
${INPUT}
</conversation-history>

<rules>
- Find the most concise title that captures the essence of the conversation.
- The title must be at most 30 characters.
- Capitalize the first letter of each word.
- Do not add punctuation at the end.
- Return only the title.
</rules>

<the-ask>
Generate ONLY ONE "Title" for the conversation. 
</the-ask>

<output-format>
return only the generated "Title"  
</output-format>

`;

const main = async () => {
  const result = streamText({
    model,
    prompt,
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }

  console.log();
};

main().catch(console.error);
