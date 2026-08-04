import { NextRequest } from "next/server";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from "ai";
import { getAIModel } from "../../get-model";
import { isDev } from "@/lib/env";
import { logToFile } from "@/lib/log-to-file";

const LOG_METHOD: false | "callback" | "stream" = false;

// route.ts
export async function POST(req: NextRequest) {
  const {
    messages,
    systemPrompt,
  }: { messages: UIMessage[]; systemPrompt?: string } = await req.json();
  const system = systemPrompt ?? "You are a concise, friendly assistant.";

  const result = streamText({
    model: getAIModel(),
    system,
    messages: await convertToModelMessages(messages),
    onChunk({ chunk }) {
      if (LOG_METHOD === "callback" && isDev) logToFile("[chunk]", chunk);
    },
    onFinish({ text, usage }) {
      if (LOG_METHOD === "callback" && isDev)
        logToFile("[finish]", { text, usage });
    },
  });

  // Log every part as it streams, without affecting the actual response
  if (LOG_METHOD === "stream" && isDev) {
    (async () => {
      for await (const part of result.fullStream)
        logToFile("[stream part]", part);
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
