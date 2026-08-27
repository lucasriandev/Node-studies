const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite } = require("@prisma/adapter-better-sqlite3");
const Database = require("better-sqlite3");

const dbPath = process.env.DATABASE_URL.replace("file:", "");
const adapter = new PrismaBetterSqlite(new Database(dbPath));
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
