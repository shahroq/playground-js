"use client";
import ReactMarkdown from "react-markdown";
import { Bubble, BubbleContent } from "@/shadcn/components/ui/bubble";
import { UIMessage } from "./types";

type Props = { message: UIMessage };

export function ChatMessage({ message }: Props) {
  return (
    <Bubble
      align={message.role === "user" ? "end" : "start"}
      variant={message.role === "user" ? "default" : "ghost"}
      key={message.id}
    >
      <BubbleContent>
        <ReactMarkdown>{message.content as string}</ReactMarkdown>
      </BubbleContent>
    </Bubble>
  );
}
