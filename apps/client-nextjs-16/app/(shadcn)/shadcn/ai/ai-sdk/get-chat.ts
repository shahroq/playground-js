import { createChat } from "@shadcn/helpers/ai-sdk";
import { UIMessage } from "ai";

// dummy chat (manual)
export function getChat(count: number): UIMessage[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `dummy-${i}`,
    role: i % 2 === 0 ? "user" : "assistant",
    parts: [
      {
        type: "text",
        text: `This is dummy message #${i + 1}`,
      },
    ],
  }));
}

// dummy chat (shadcn helper)
export const chatAISDK = createChat()
  .user("Hi!")
  .assistant("Hi! How can I help you today?")
  .user("Can you show me the shortcuts?")
  .assistant("Press ⌘K to search and ⌘Enter to submit.");
