import { Hono } from "hono";
import { tasksRoute } from "./routes/tasks";

const app = new Hono();

app.route("/tasks", tasksRoute);
app.get("/health", (c) => c.json({ service: "tasks-service", status: "ok" }));

export default {
  port: Number(process.env.PORT ?? 3011),
  fetch: app.fetch,
};
