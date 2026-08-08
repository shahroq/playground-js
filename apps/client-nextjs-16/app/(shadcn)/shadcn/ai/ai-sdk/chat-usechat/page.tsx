import { Header } from "@/shadcn/components/Header";
import type { Page } from "@jsp/shared/types";
import { Chat } from "./Chat";
import { getModelInfo } from "../models";

const page: Page = {
  title: "AI",
  breadcrumb: [
    { label: "Shadcn" },
    { label: "AI" },
    { label: "AI SDK: Chat (useChat)" },
  ],
};

export default function Page() {
  const modelInfo = getModelInfo();

  return (
    <>
      <Header page={page} />

      <section>
        <h2>Chat</h2>
        <Chat modelInfo={modelInfo} />
      </section>
    </>
  );
}
