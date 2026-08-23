import { PgBoss } from "pg-boss";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined");

export const boss = new PgBoss({ connectionString: DATABASE_URL });

boss.on("error", (err) => console.error("[pg-boss]", err));
