require("dotenv/config");
const express = require("express");
const { PrismaClient } = require("./generated/prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const { z } = require("zod");
const router = express.Router();

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const mensagemSchema = z.object({
  nome: z.string().min(3, "Nome precisa ter no minimo tres letras"),
  poder: z.string().min(2, "Jutsu errado!"),
});

module.exports = router;
