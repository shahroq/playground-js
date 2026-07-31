"use client";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Conversation } from "./Conversation";

export function Chat() {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => inputRef.current?.focus(), []);

  const [input, setInput] = useState("Hi");
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/shadcn/ai/ai-sdk/chat-usechat/api",
    }),
  });
  console.log(messages);

  return (
    <div className="flex h-full min-h-0 w-full flex-col border">
      <Conversation messages={messages} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
        className="w-full"
      >
        <input
          ref={inputRef}
          className="w-full dark:bg-zinc-900 p-2 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
