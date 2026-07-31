"use client";

import { UIMessage } from "ai";
import { Bubble, BubbleContent } from "@/shadcn/components/ui/bubble";

type Props = { messages: UIMessage[] };

export function Conversation({ messages }: Props) {
  return (
    <section
      id="conversation"
      className="flex w-full flex-1 min-h-0 flex-col gap-3 justify-start overflow-y-auto border"
    >
      {messages.map((m) => (
        <Bubble
          align={m.role === "user" ? "end" : "start"}
          variant={m.role === "user" ? "default" : "secondary"}
          key={m.id}
        >
          <BubbleContent>
            {m.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <div key={`${m.id}-${i}`}>{part.text}</div>;
              }
            })}
          </BubbleContent>
        </Bubble>
      ))}
    </section>
  );
}
