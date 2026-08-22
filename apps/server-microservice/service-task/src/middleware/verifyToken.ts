import type { MiddlewareHandler } from "hono";
import jwt from "jsonwebtoken";

// This verifies the JWT signature LOCALLY using a shared secret —
// it does NOT call auth-service over the network at request time.
// That's the common real-world pattern (avoids a network hop on every
// request), but it still means this service is coupled to
// auth-service's token format and secret. If the secret ever rotates,
// both services need to agree on it.
export const verifyToken: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return c.json({ error: "missing token" }, 401);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string;
    };
    c.set("userId", payload.sub);
    await next();
  } catch {
    return c.json({ error: "invalid or expired token" }, 401);
  }
};
