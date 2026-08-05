import type { UIMessage, UIMessagePart } from "ai";
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
    const key = `${message.id}-${index}`;

    switch (part.type) {
      case "text":
        return <PartText key={key} part={part} />;
      case "tool-time":
        return <PartToolTime key={key} part={part} />;
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

type PropsPartText = {
  part: Extract<UIMessage["parts"][number], { type: "text" }>;
};

function PartText({ part }: PropsPartText) {
  return <div>{part.text}</div>;
}

type PropsPartTimeTool = {
  part: Extract<UIMessage["parts"][number], { type: "tool-time" }>;
};

function PartToolTime({ part }: PropsPartTimeTool) {
  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return <div>⏳ Getting current time...</div>;

    case "output-available":
      return (
        <pre>
          🕒 Time Tool
          {JSON.stringify(part.output, null, 2)}
        </pre>
      );

    default:
      return null;
  }
}
