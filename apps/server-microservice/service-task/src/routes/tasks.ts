import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { db } from "../db/client";
import { tasks } from "../db/schema";
import { verifyToken } from "../middleware/verifyToken";

export const tasksRoute = new Hono();

tasksRoute.use("*", verifyToken);

tasksRoute.get("/", async (c) => {
  const userId = c.get("userId" as never) as string;
  const rows = await db.select().from(tasks).where(eq(tasks.userId, userId));
  return c.json(rows);
});

tasksRoute.post("/", async (c) => {
  const userId = c.get("userId" as never) as string;
  const { title } = await c.req.json();
  const id = randomUUID();
  await db
    .insert(tasks)
    .values({ id, userId, title, done: false, createdAt: new Date() });
  return c.json({ id, title, done: false });
});
