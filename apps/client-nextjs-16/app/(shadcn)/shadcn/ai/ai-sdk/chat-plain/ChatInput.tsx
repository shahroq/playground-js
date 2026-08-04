"use client";
import { useEffect, useRef } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/shadcn/components/ui/input-group";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  onSend: (formData: FormData) => void;
  isPending: boolean;
};

export function ChatInput({ onSend, isPending }: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => inputRef.current?.focus(), []);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form className="grid w-full" ref={formRef} action={onSend}>
      <InputGroup>
        <TextareaAutosize
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          name="msg"
          placeholder=""
          data-slot="input-group-control"
          ref={inputRef}
          defaultValue={"Hi!"}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              formRef.current?.requestSubmit();
            }
          }}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            className="ml-auto"
            size="sm"
            variant="default"
            type="submit"
            disabled={isPending}
          >
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
