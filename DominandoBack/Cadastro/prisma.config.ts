import path from "path";
import { defineConfig } from "prisma/config";
import { PrismaBetterSQLite } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const dbPath = path.join(__dirname, "prisma", "dev.db");

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
  datasource: {
    url: `file:${dbPath}`,
  },
  migrate: {
    adapter: () => {
      const client = new Database(dbPath);
      return new PrismaBetterSQLite(client);
    },
  },
});
