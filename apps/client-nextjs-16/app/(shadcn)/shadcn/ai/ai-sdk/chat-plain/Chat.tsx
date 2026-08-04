"use client";

import { useActionState, useEffect, useOptimistic, useRef } from "react";
import { updateMessagesReducer } from "./api/actions";
import { UIMessage } from "./types";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export function Chat() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => inputRef.current?.focus(), []);

  const [state, dispatchAction, isPending] = useActionState(
    updateMessagesReducer,
    [] as UIMessage[],
  );

  const [optimisticMessages, setOptimisticMessages] = useOptimistic(
    state,
    (state, newMessage: UIMessage) => [...state, newMessage],
  );

  function formAction(formData: FormData) {
    const content = formData.get("msg")?.toString().trim();
    if (!content || isPending) return;

    const newMessage: UIMessage = {
      content,
      role: "user",
      id: crypto.randomUUID(),
    };

    setOptimisticMessages(newMessage);

    dispatchAction(newMessage);
  }

  return (
    <div className="flex h-full min-h-0 flex-col justify-end gap-5">
      <ChatMessages messages={optimisticMessages} isPending={isPending} />

      <section id="input">
        <ChatInput onSend={formAction} isPending={isPending} />
      </section>
    </div>
  );
}
