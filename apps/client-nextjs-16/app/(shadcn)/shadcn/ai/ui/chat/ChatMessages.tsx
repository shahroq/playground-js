import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerViewport,
} from "@/shadcn/components/ui/message-scroller";
import { ChatMessage } from "./ChatMessage";
import { ChatEmpty } from "./ChatEmpty";
import { UIMessage } from "ai";
import { ChatMarker } from "./ChatMarker";

type Props = {
  messages: UIMessage[];
};

export function ChatMessages({ messages }: Props) {
  if (messages.length === 0) return <ChatEmpty />;

  return (
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent className="p-(--card-spacing) pr-5">
          {messages.map((message, i) => (
            <ChatMessage
              key={i}
              message={message}
              // scrollAnchor={message.role === "user"}
            />
          ))}

          <ChatMarker />
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  );
}
