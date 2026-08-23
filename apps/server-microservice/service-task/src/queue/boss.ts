import { PgBoss } from "pg-boss";

const QUEUE_DATABASE_URL = process.env.QUEUE_DATABASE_URL;
if (!QUEUE_DATABASE_URL) throw new Error("QUEUE_DATABASE_URL is not defined");

export const boss = new PgBoss({ connectionString: QUEUE_DATABASE_URL });

boss.on("error", (err) => console.error("[pg-boss]", err));
