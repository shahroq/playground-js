import { PropsWithChildren } from "react";
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@/shadcn/components/ui/marker";
import { Spinner } from "@jsp/shared/comps";

export function ChatMarker({ children = "Thinking..." }: PropsWithChildren) {
  return (
    <Marker role="status">
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent className="shimmer">{children}</MarkerContent>
    </Marker>
  );
}
