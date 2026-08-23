import { Hono } from "hono";
import jwt from "jsonwebtoken";
import { db } from "./db/client";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { boss } from "./queue/boss";
import { QUEUES } from "./queue/queues";

const app = new Hono();
await boss.start();
await boss.createQueue(QUEUES.USER_DELETED);

app.get("/health", (c) => c.json({ service: "auth-service", status: "ok" }));

// Minimal signup — no real password hashing here, don't ship this as-is.
// The point right now is the service boundary, not auth security.
app.post("/auth/signup", async (c) => {
  const { email } = await c.req.json();
  const passwordHash = "dev-only-not-real";

  const [user] = await db
    .insert(users)
    .values({ email, passwordHash, createdAt: new Date() })
    .returning();

  return c.json(user);
});

app.post("/auth/login", async (c) => {
  const { userId } = await c.req.json();
  const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  console.log(`Login for userId: ${userId}`);

  return c.json({ token });
});

// DELETE user
app.delete("/auth/:id", async (c) => {
  const userId = Number(c.req.param("id"));

  const existing = await db.select().from(users).where(eq(users.id, userId));
  if (existing.length === 0) {
    return c.json({ error: "user not foundd" }, 404);
  }

  // Choreography: auth-service deletes the user and fires an event.
  // It does NOT call tasks-service, does NOT know if it's up, and does
  // NOT wait for cleanup to finish. It just publishes what happened and
  // moves on. Compare this to Step 8's orchestrated version — no more
  // 502 if tasks-service is down.
  // await db.delete(users).where(eq(users.id, userId));
  // await boss.send(QUEUES.USER_DELETED, { userId });
  // change expiration for test: default: 900
  await boss.send(QUEUES.USER_DELETED, { userId }, { expireInSeconds: 10 });

  return c.json({ userId: userId, status: "deleted (event published)" });
});

export default { port: Number(process.env.PORT ?? 3010), fetch: app.fetch };
