"use client";

import { useEffect, useRef, useState } from "react";
import { ChatStatus } from "ai";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon, SquareIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/shadcn/components/ui/input-group";

type Props = {
  onSend: (text: string) => void;
  status: ChatStatus;
  defaultValue?: string;
};

export const ChatInput = ({ onSend, status, defaultValue = "Hi" }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState(defaultValue);

  useEffect(() => inputRef.current?.focus(), []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const text = input.trim();
        if (!text) return;

        onSend(text);
        setInput("");
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
          ref={inputRef}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            className="ml-auto size-8 rounded-full p-0"
            size="sm"
            variant="default"
            type="submit"
          >
            {status === "ready" ? <ArrowUpIcon /> : <SquareIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};
