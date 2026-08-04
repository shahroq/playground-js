"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { MessageScrollerProvider } from "@/shadcn/components/ui/message-scroller";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { getChat } from "../../ai-sdk/get-chat";

export function Chat() {
  // messages.splice(0, messages.length); // for testing empty array
  const messages = getChat(0);

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
            <CardDescription>w/ ...</CardDescription>
          </CardHeader>

          {/* content */}
          <CardContent
            id="chat-messages"
            className="flex flex-col gap-3 flex-1 overflow-y-auto"
          >
            <ChatMessages messages={messages} />
          </CardContent>

          {/* footer */}
          <CardFooter id="chat-input" className="flex-col gap-3">
            <ChatInput sendMessage={console.log} />
          </CardFooter>
        </Card>
      </div>
    </MessageScrollerProvider>
  );
}
