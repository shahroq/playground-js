import type { UIMessage } from "ai";
import { Bubble, BubbleContent } from "@/shadcn/components/ui/bubble";
import { Message, MessageContent } from "@/shadcn/components/ui/message";
import ReactMarkdown from "react-markdown";

type Props = {
  message: UIMessage;
};

export const ChatMessage = ({ message }: Props) => {
  /*
  message.parts.forEach((part, i) => {
    console.log(i, part.type, part);
  });
  */

  const content = message.parts.map((part, index) => {
    switch (part.type) {
      case "text":
        return <div key={`${message.id}-${index}`}>{part.text}</div>;
      case "tool-time":
        return (
          <div key={`${message.id}-${index}`} className="">
            <pre>
              🕒 Time Tool
              {JSON.stringify(part.output, null, 2)}
            </pre>
          </div>
        );
      case "step-start":
        return null;
      default:
        return null;
    }
  });

  return (
    <Message align={message.role === "user" ? "end" : "start"}>
      <MessageContent>
        <Bubble variant={message.role === "user" ? "muted" : "ghost"}>
          <BubbleContent className="flex flex-col gap-3">
            {content}
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
};
