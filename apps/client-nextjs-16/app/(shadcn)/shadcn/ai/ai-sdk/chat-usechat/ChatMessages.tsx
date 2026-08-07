import type { ChatStatus } from "ai";
import { ChatMessage } from "./ChatMessage";
import {
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerButton,
} from "@/shadcn/components/ui/message-scroller";
import { ChatMarker } from "../../ui/chat/ChatMarker";
import { ChatEmpty } from "../../ui/chat/ChatEmpty";
import { UIMessageApp } from "../types";

type Props = {
  messages: UIMessageApp[];
  status: ChatStatus;
};

export const ChatMessages = ({ messages, status }: Props) => {
  if (messages.length === 0) return <ChatEmpty />;

  return (
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent className="p-(--card-spacing) pr-5">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {status === "submitted" && <ChatMarker />}
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  );
};
