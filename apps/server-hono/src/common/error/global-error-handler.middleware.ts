import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

export const globalErrorHandler: ErrorHandler = (err, c) => {
  // Errors you throw intentionally (e.g. auth, not-found) — use these anywhere
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }

  // Zod validation errors — thrown by .parse() (not .safeParse())
  if (err instanceof ZodError) {
    return c.json(
      { error: "Validation failed", details: err.flatten().fieldErrors },
      400,
    );
  }

  // Anything unexpected — log it, don't leak internals to the client
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
};
