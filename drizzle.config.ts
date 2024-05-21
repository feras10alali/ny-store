import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./src/lib/server/db/schema.ts",
  dialect: "mysql",
  
  dbCredentials: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
  },
} satisfies Config;
