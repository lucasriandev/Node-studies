const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3(new Database(dbPath));
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
