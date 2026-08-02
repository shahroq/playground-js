"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon, SquareIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/shadcn/components/ui/input-group";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/shadcn/components/ui/message-scroller";

export function Chat() {
  const messages = Array.from(
    { length: 15 },
    () => "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  );

  return (
    <Card className="mx-auto h-full w-full max-w-4xl gap-0 rounded-none">
      <CardHeader className="gap-1 border-b">
        <CardTitle>New Chat</CardTitle>
        <CardDescription>How can I help you today?</CardDescription>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden border-b">
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="w-full"
        >
          <InputGroup>
            <TextareaAutosize
              data-slot="input-group-control"
              className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
              placeholder="Autoresize textarea..."
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton
                className="ml-auto size-8 rounded-full p-0"
                size="sm"
                variant="default"
              >
                {1 ? <ArrowUpIcon /> : <SquareIcon />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </CardFooter>
    </Card>
  );
}
