import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { verifyToken } from "./middleware/verifyToken";
import { db } from "./db/client";
import { tasks } from "./db/schema";

const app = new Hono();

// app.use("*", verifyToken);
app.use("/tasks/*", verifyToken);

app.get("/health", async (c) => {
  const res = { service: "tasks-service", status: "ok" };

  return c.json(res);
});

app.get("/tasks", async (c) => {
  const userId = Number(c.get("userId" as never));
  console.log(`userId: ${userId}`);

  const rows = await db.select().from(tasks).where(eq(tasks.userId, userId));

  return c.json(rows);
});

app.post("/tasks", async (c) => {
  const userId = Number(c.get("userId" as never));

  const { title } = await c.req.json();

  const [task] = await db
    .insert(tasks)
    .values({ userId, title, done: false, createdAt: new Date() })
    .returning();

  return c.json(task);
});

/**
 * Internal, not user-facing: called by auth-service in the orchestrated
 * delete flow. Real systems put internal routes on a separate
 * port/network so the public gateway can't reach them at all — we're
 * keeping it simple and just not calling verifyToken on this one.
 */
app.delete("/internal/tasks/by-user/:userId", async (c) => {
  const userId = Number(c.req.param("userId"));

  if (!Number.isFinite(userId)) {
    return c.json({ error: "userId is required" }, 400);
  }

  await db.delete(tasks).where(eq(tasks.userId, userId));

  return c.json({ deletedFor: userId });
});

export default { port: Number(process.env.PORT ?? 3011), fetch: app.fetch };
