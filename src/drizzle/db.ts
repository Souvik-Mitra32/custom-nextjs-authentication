import { Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"

declare global {
  var _pool: Pool | undefined
}

const pool =
  global._pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL!,
  })

if (process.env.NODE_ENV !== "production") {
  global._pool = pool
}

export const db = drizzle(pool)
