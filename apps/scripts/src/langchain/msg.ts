import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// constructing a message:
const main = async () => {
  // plain txt
  const prompt1 = "What i sthe capital o f the UK?";

  // w/ class
  const prompt2 = new HumanMessage("What i sthe capital o f the UK?");
  console.log(prompt2.getType());

  // w/ class & object/multiple
  const prompt3 = [
    new SystemMessage("You are a terse geography assistant."),
    new HumanMessage("Capital of UK."),
  ];

  // multiple types
  const prompt4 = new HumanMessage([
    { type: "text", text: "What's in this image?" },
    { type: "image_url", image_url: { url: "https://example.com/photo.jpg" } },
  ]);
  console.log(prompt4.getType());

  // from template?
  const prompt5 = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful assistant that explains things in a {tone} tone.",
    ],
    ["user", "Explain {topic} in two sentences."],
  ]);
  console.log(prompt5);
};

main().catch(console.error);
