import { Bubble, BubbleContent } from "@/shadcn/components/ui/bubble";
import { Message, MessageContent } from "@/shadcn/components/ui/message";
import { UIMessageApp } from "../types";
import {
  PartText,
  PartToolTime,
  PartToolCalculator,
  PartToolProductSearch,
  PartToolWeather,
  PartFS,
} from "./ChatParts";
// import ReactMarkdown from "react-markdown";

type Props = {
  message: UIMessageApp;
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
      case "tool-calculator":
        return <PartToolCalculator key={key} part={part} />;
      case "tool-productSearch":
        return <PartToolProductSearch key={key} part={part} />;
      case "tool-weather":
        return <PartToolWeather key={key} part={part} />;
      case "tool-fsCreateDirectory":
      case "tool-fsExists":
      case "tool-fsDeletePath":
      case "tool-fsReadFile":
      case "tool-fsListDirectory":
      case "tool-fsSearchFiles":
      case "tool-fsWriteFile":
        return <PartFS key={key} part={part} />;
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
