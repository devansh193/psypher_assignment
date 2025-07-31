import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the environment variables.");
}

const client = postgres(process.env.DATABASE_URL, { prepare: false });
export const db = drizzle({ client, schema });
