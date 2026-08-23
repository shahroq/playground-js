import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined");

const pool = new Pool({ connectionString: DATABASE_URL });

export const query = (text: string, params?: unknown[]) =>
  pool.query(text, params);

export default pool;
