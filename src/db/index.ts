import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/*
  Lazy singleton DB client. We defer connecting until first use so that a
  missing DATABASE_URL doesn't crash the build (static pages that never touch
  the DB still compile). Route handlers / server actions that use `db` will
  throw a clear error at request time if the env var is absent.
*/
const connectionString = process.env.DATABASE_URL;

declare global {
  // eslint-disable-next-line no-var
  var __gsm_db__: ReturnType<typeof createClient> | undefined;
}

function createClient() {
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (see .env.example)."
    );
  }
  // prepare: false is recommended for Supabase's transaction pooler (pgBouncer).
  const client = postgres(connectionString, { prepare: false });
  return drizzle(client, { schema });
}

export const db: ReturnType<typeof createClient> =
  global.__gsm_db__ ?? (connectionString ? createClient() : (undefined as never));

if (process.env.NODE_ENV !== "production" && connectionString) {
  global.__gsm_db__ = db;
}

export { schema };
