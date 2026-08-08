import { UIMessageApp } from "../types";

type PropsPartText = {
  part: Extract<UIMessageApp["parts"][number], { type: "text" }>;
};
export function PartText({ part }: PropsPartText) {
  return <div>{part.text}</div>;
}

type PropsPartTimeTool = {
  part: Extract<UIMessageApp["parts"][number], { type: "tool-time" }>;
};
export function PartToolTime({ part }: PropsPartTimeTool) {
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

export function PartToolCalculator({ part }: PropsCalculatorTool) {
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

export function PartToolProductSearch({ part }: PropsPartProductSearch) {
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

export function PartToolWeather({ part }: PropsPartWeather) {
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
  part: unknown;
  /*
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
  */
};

export function PartFS({ part }: FSPart) {
  return (
    <pre>
      🗄️ File System Tool
      <br />
      {JSON.stringify(part, null, 2)}
    </pre>
  );
}
