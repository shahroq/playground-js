"use client";

import { useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, ModelInfo } from "ai";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { MessageScrollerProvider } from "@/shadcn/components/ui/message-scroller";
import { getChat } from "../get-chat";

type Props = {
  modelInfo: ModelInfo;
};

export const Chat = ({ modelInfo }: Props) => {
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/shadcn/ai/ai-sdk/chat-usechat/api",
      }),
    [],
  );

  const { messages, sendMessage, status, error } = useChat({ transport });

  return (
    <MessageScrollerProvider>
      <div className="flex flex-col gap-4">
        <Card
          id="chat"
          className="flex gap-3 mx-auto w-full -max-w-4xl h-[calc(100dvh-(var(--header-height,4rem)+7rem))] --rounded-none --shadow-none --border-none p4"
        >
          {/* header */}
          <CardHeader className="border-b">
            <CardTitle>New Chat</CardTitle>
            <CardDescription>
              w/ {modelInfo.provider}: {modelInfo.modelId}
            </CardDescription>
          </CardHeader>

          <CardContent
            id="chat-messages"
            className="flex flex-col gap-3 flex-1 overflow-y-auto"
          >
            <ChatMessages
              messages={[...getChat(0), ...messages]}
              status={status}
            />
          </CardContent>

          <CardFooter id="chat-input">
            <ChatInput
              onSend={(text) => sendMessage({ text })}
              status={status}
              defaultValue="what time is it now?"
            />
          </CardFooter>
        </Card>
      </div>
    </MessageScrollerProvider>
  );
};
