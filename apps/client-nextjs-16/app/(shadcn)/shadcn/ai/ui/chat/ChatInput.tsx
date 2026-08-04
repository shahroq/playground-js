"use client";

import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon, SquareIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/shadcn/components/ui/input-group";
import { useState } from "react";

type Props = {
  sendMessage: ({}) => void;
};

export function ChatInput({ sendMessage }: Props) {
  const [input, setInput] = useState("Hi");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ input });
        }}
        className="w-full"
      >
        <InputGroup>
          <TextareaAutosize
            data-slot="input-group-control"
            className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
            placeholder=""
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              className="ml-auto size-8 rounded-full p-0"
              size="sm"
              variant="default"
              type="submit"
            >
              {1 ? <ArrowUpIcon /> : <SquareIcon />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </>
  );
}
