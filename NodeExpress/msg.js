require("dotenv/config");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const router = express.Router();

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

router.get("/", async (req, res) => {
  const todasMsg = await prisma.mensagem.findMany();
  res.status(201).json({ total: todasMsg.length, dados: todasMsg });
});

router.post("/", async (req, res) => {
  const { texto } = req.body;

  const novaMsg = await prisma.mensagem.create({
    data: {
      texto: texto,
    },
  });
  res.status(201).json({ status: "Sucesso", mensagemCriada: novaMsg });
});

router.delete("/", async (req, res) => {
  await prisma.mensagem.deleteMany();
  res.json({
    status: "Sucesso",
    detalhe: "Todas as mensagens apagadas do banco",
  });
});

module.exports = router;
