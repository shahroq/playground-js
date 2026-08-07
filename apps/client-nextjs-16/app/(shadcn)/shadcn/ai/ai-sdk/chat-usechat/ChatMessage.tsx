import { Bubble, BubbleContent } from "@/shadcn/components/ui/bubble";
import { Message, MessageContent } from "@/shadcn/components/ui/message";
import { UIMessageApp } from "../types";
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

type PropsPartText = {
  part: Extract<UIMessageApp["parts"][number], { type: "text" }>;
};
function PartText({ part }: PropsPartText) {
  return <div>{part.text}</div>;
}

type PropsPartTimeTool = {
  part: Extract<UIMessageApp["parts"][number], { type: "tool-time" }>;
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
          <br />
          {JSON.stringify(part.output, null, 2)}
        </pre>
      );

    default:
      return null;
  }
}

type PropsCalculatorTool = {
  part: Extract<UIMessageApp["parts"][number], { type: "tool-calculator" }>;
};

function PartToolCalculator({ part }: PropsCalculatorTool) {
  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return <div>🧮 Calculating...</div>;

    case "output-available":
      return (
        <pre>
          🧮 Calculator Tool
          <br />
          {JSON.stringify(part.output, null, 2)}
        </pre>
      );
  }
}

type PropsPartProductSearch = {
  part: Extract<UIMessageApp["parts"][number], { type: "tool-productSearch" }>;
};

function PartToolProductSearch({ part }: PropsPartProductSearch) {
  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return <div>🔎 Searching products...</div>;

    case "output-available":
      return (
        <pre>
          🛒 Product Search
          {"\n"}
          {JSON.stringify(part.output, null, 2)}
        </pre>
      );

    default:
      return null;
  }
}

type PropsPartWeather = {
  part: Extract<UIMessageApp["parts"][number], { type: "tool-weather" }>;
};

function PartToolWeather({ part }: PropsPartWeather) {
  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return <div>🌤️ Checking weather...</div>;

    case "output-available":
      return (
        <pre>
          🌤️ Weather
          <br />
          {JSON.stringify(part.output, null, 2)}
        </pre>
      );

    default:
      return null;
  }
}

type FSPart = {
  // part: unknown;
  part: Extract<
    UIMessageApp["parts"][number],
    {
      type:
        | "tool-fsCreateDirectory"
        | "tool-fsExists"
        | "tool-fsDeletePath"
        | "tool-fsReadFile"
        | "tool-fsListDirectory"
        | "tool-fsSearchFiles"
        | "tool-fsWriteFile";
    }
  >;
};

function PartFS({ part }: FSPart) {
  return (
    <pre>
      🗄️ File System Tool
      <br />
      {JSON.stringify(part, null, 2)}
    </pre>
  );
}
