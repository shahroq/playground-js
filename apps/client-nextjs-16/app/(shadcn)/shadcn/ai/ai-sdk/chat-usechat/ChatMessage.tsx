import type { UIMessage } from "ai";
import { Bubble, BubbleContent } from "@/shadcn/components/ui/bubble";
import { Message, MessageContent } from "@/shadcn/components/ui/message";
import ReactMarkdown from "react-markdown";

type Props = {
  message: UIMessage;
};

export const ChatMessage = ({ message }: Props) => {
  const content = message.parts.map((part, index) => {
    switch (part.type) {
      case "text":
        return <div key={`${message.id}-${index}`}>{part.text}</div>;
      default:
        return null;
    }
  });

  return (
    <Message align={message.role === "user" ? "end" : "start"}>
      <MessageContent>
        <Bubble variant={message.role === "user" ? "muted" : "ghost"}>
          <BubbleContent>{content}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
};
