"use client";
import { UIMessage } from "./types";
import { ChatMessage } from "./ChatMessage";
import { ChatMarker } from "../../ui/chat/ChatMarker";
import { ChatEmpty } from "../../ui/chat/ChatEmpty";

type Props = { messages: UIMessage[]; isPending: boolean };

export function ChatMessages({ messages, isPending }: Props) {
  if (messages.length === 0) return <ChatEmpty />;

  return (
    <section id="chat-messages" className="flex w-full flex-col gap-3">
      {messages.map((message, i) => (
        <ChatMessage message={message} key={i} />
      ))}

      {isPending && <ChatMarker />}
    </section>
  );
}
