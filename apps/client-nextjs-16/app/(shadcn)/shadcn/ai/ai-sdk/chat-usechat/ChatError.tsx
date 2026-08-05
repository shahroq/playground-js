import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/shadcn/components/ui/alert";
import { Button } from "@/shadcn/components/ui/button";

type Props = {
  error: Error;
  onRetry: () => void;
  onDismiss: () => void;
};

export const ChatError = ({ error, onRetry, onDismiss }: Props) => {
  return (
    <Alert variant="destructive" className="mx-(--card-spacing)">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
      <div className="flex gap-2 mt-2">
        <Button size="sm" variant="outline" onClick={onRetry}>
          Retry
        </Button>
        <Button size="sm" variant="ghost" onClick={onDismiss}>
          Dismiss
        </Button>
      </div>
    </Alert>
  );
};
