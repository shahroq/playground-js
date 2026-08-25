import express, { type Express, type Request, type Response } from "express";
import { query } from "./common/db/client";
import { boss } from "./common/queue/boss";
import { QUEUES } from "./common/queue/queues";

const app: Express = express();
app.use(express.json());
const PORT = Number(process.env.PORT ?? 3000);

// home
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// get users
app.get("/users", async (req: Request, res: Response) => {
  const result = await query("SELECT * FROM users");
  res.json(result.rows);
});

// store user
app.post("/users", async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ error: "name, email and role are required" });
  }

  const result = await query(
    `INSERT INTO users (name, email, role, created_at, updated_at)
     VALUES ($1, $2, $3, now(), now())
     RETURNING *`,
    [name, email, role],
  );

  await boss.send(QUEUES.SEND_WELCOME_EMAIL, { email });

  res.status(201).json(result.rows[0]);
});

// publish a newsletter
app.post("/newsletter", async (req: Request, res: Response) => {
  const { subject, body } = req.body;
  if (!subject || !body) {
    return res.status(400).json({ error: "subject and body are required" });
  }

  const {
    rows: [newsletter],
  } = await query(
    "INSERT INTO newsletters (subject, body) VALUES ($1, $2) RETURNING id",
    [subject, body],
  );

  const { rows: users } = await query("SELECT id, email FROM users");

  if (users.length === 0) {
    return res.status(201).json({ id: newsletter.id, total: 0 });
  }

  const { rows: sends } = await query(
    `INSERT INTO newsletter_sends (newsletter_id, user_id)
     SELECT $1, id FROM users
     RETURNING id, user_id`,
    [newsletter.id],
  );

  const emailByUserId = new Map<number, string>(
    users.map((u) => [u.id, u.email]),
  );

  await boss.insert(
    QUEUES.SEND_NEWSLETTER,
    sends.map((send) => ({
      data: {
        sendId: send.id,
        newsletterId: newsletter.id,
        email: emailByUserId.get(send.user_id),
      },
    })),
  );

  res.status(201).json({ id: newsletter.id, total: sends.length });
});

// get status of a newsletter
app.get("/newsletter/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const {
    rows: [newsletter],
  } = await query("SELECT id FROM newsletters WHERE id = $1", [id]);
  if (!newsletter) return res.status(404).json({ error: "not found" });

  const { rows: counts } = await query(
    `SELECT status, count(*)::int AS count
     FROM newsletter_sends WHERE newsletter_id = $1
     GROUP BY status`,
    [id],
  );

  const summary = { sent: 0, failed: 0, pending: 0 };
  let total = 0;
  for (const row of counts) {
    summary[row.status as keyof typeof summary] = row.count;
    total += row.count;
  }

  res.json({
    id: newsletter.id,
    status: summary.pending > 0 ? "processing" : "completed",
    total,
    ...summary,
  });
});

async function main() {
  // boss.start() is still required here: send()/insert() need an
  // active PgBoss instance to write job rows, even though this
  // process never calls boss.work() and never processes jobs itself.
  await boss.start();

  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  const shutdown = async () => {
    await boss.stop();
    server.close(() => process.exit(0));
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
