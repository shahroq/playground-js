import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/shadcn/components/ui/empty";
import { MessageCircleDashedIcon } from "lucide-react";

export function ChatEmpty() {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageCircleDashedIcon />
        </EmptyMedia>
        <EmptyTitle>Morning!</EmptyTitle>
        <EmptyDescription>
          What are we working on today? Press send to start a new conversation
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
