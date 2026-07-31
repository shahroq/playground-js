import { Header } from "@/shadcn/components/Header";
import type { Page } from "@jsp/shared/types";
import { Chat } from "./Chat";

const page: Page = {
  title: "AI",
  breadcrumb: [
    { label: "Shadcn" },
    { label: "AI" },
    { label: "AI SDK" },
    { label: "Chat (useChat)" },
  ],
};

export default function Page() {
  return (
    <>
      <Header page={page} />

      <section>
        <h2>Chat</h2>
        <Chat />
      </section>
    </>
  );
}
