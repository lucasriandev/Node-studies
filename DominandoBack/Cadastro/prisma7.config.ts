import path from "path";
import { defineConfig } from "prisma/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const dbPath = path.join(__dirname, "prisma", "dev.db");

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
  datasource: {
    url: `file:${dbPath}`,
  },
  migrate: {
    adapter: () => new PrismaBetterSqlite3(new Database(dbPath)),
  },
});
