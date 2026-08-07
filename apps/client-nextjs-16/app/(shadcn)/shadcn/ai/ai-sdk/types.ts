import { InferUITools, UIMessage } from "ai";
import { tools } from "./tools";

export type UIMessageApp = UIMessage<never, never, InferUITools<typeof tools>>;
