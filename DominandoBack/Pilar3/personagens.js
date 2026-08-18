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

router.get("/", async (req, res) => {
  const todosPersonagem = await prisma.personagem.findMany();
  res
    .status(201)
    .json({ detalhe: todosPersonagem.length, dados: todosPersonagem });
});

router.post("/", async (req, res) => {
  try {
    const mensagemValidade = mensagemSchema.parse(req.body);

    const novoPerson = await prisma.personagem.create({
      data: {
        nome: mensagemValidade.nome,
        poder: mensagemValidade.poder,
      },
    });

    res
      .status(201)
      .json({ status: "Sucesso no post", dados: mensagemValidade });
  } catch (error) {
    res.status(400).json({ error: error.message || "Erro no post" });
  }
});

module.exports = router;
