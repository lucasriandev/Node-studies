require("dotenv/config");
const express = require("express");
const { PrismaClient } = require("./generated/prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const router = express.Router();

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

router.get("/", async (req, res) => {
  const todosPersonagens = await prisma.personagem.findMany();
  res
    .status(201)
    .json({ detalhe: todosPersonagens.length, dados: todosPersonagens });
});

router.post("/", async (req, res) => {
  const { texto } = req.body;
  const novaPersonagem = await prisma.personagem.create({
    data: {
      texto: texto,
    },
  });
  res.status(201).json({ datalhe: "Sucesso no post", dados: novaPersonagem });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.personagem.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    res.status(201).json({ error: "Erro ao deletar" });
  }
});

module.exports = router;
