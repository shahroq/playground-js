import { NextRequest } from "next/server";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
  isStepCount,
  InferUITools,
  UIDataTypes,
} from "ai";
import { getAIModel } from "../../get-model";
import { isDev, logFile, logFileMethod } from "@/lib/env";
import { logToFile } from "@/lib/log-to-file";
import { tools } from "../../tools";

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

// route.ts
export async function POST(req: NextRequest) {
  // throw new Error("something went wrong!!!");

  const {
    messages,
    systemPrompt,
  }: { messages: UIMessage[]; systemPrompt?: string } = await req.json();
  const system =
    systemPrompt ??
    "You are a concise, friendly assistant. You have tools available. When the user asks about products, prices, or shopping, you must use the productSearch tool rather than answering from memory. When asking about weather use weather tool.";

  const result = streamText({
    model: getAIModel(),
    system,
    messages: await convertToModelMessages(messages),
    onChunk({ chunk }) {
      if (isDev && logFile && logFileMethod === "callback")
        logToFile("[chunk]", chunk);
    },
    onFinish({ text, usage }) {
      if (isDev && logFile && logFileMethod === "callback")
        logToFile("[finish]", { text, usage });
    },
    onError({ error }) {
      // surfaces provider/model errors into the UI message stream
      // instead of failing silently or as a raw 500
      if (isDev) console.error("[streamText error]", error);
    },
    tools,
    stopWhen: isStepCount(5),
  });

  // Log every part as it streams, without affecting the actual response
  if (isDev && logFile && logFileMethod === "stream") {
    (async () => {
      for await (const part of result.stream) logToFile("[stream part]", part);

      // log usage:
      const usageAsJson = JSON.stringify(await result.usage);
      logToFile("[USAGE]", usageAsJson);
    })();
  }

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name");

  const msg = `Hello ${name || "world"}`;

  return Response.json({ msg });
}
