import { Bubble, BubbleContent } from "@/shadcn/components/ui/bubble";
import { Message, MessageContent } from "@/shadcn/components/ui/message";
import { UIMessage } from "ai";

type Props = {
  message: UIMessage;
};

export function ChatMessage({ message }: Props) {
  const content = message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

  return (
    <>
      <Message align={message.role === "user" ? "end" : "start"}>
        <MessageContent>
          <Bubble variant={message.role === "user" ? "muted" : "ghost"}>
            <BubbleContent>{content}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </>
  );
}
