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
  const { texto, idade } = req.body;

  const novaMsg = await prisma.mensagem.create({
    data: {
      texto: texto,
      idade: idade,
    },
  });
  res.status(201).json({ status: "Sucesso", mensagemCriada: novaMsg });
});

router.put("/:id", async (req, res) => {
  const idMsg = Number(req.params.id);
  const { texto } = req.body;

  try {
    const mensagemAtualizada = await prisma.mensagem.update({
      where: {
        id: idMsg,
      },
      data: {
        texto: texto,
      },
    });
    res.status(201).json({ status: "Sucesso", dados: mensagemAtualizada });
  } catch (error) {
    res.status(404).json({ error: "Mensagem nao encontrada para atualizar" });
  }
});

router.delete("/:id", async (req, res) => {
  const idMsg = Number(req.params.id);

  try {
    await prisma.mensagem.delete({
      where: {
        id: idMsg,
      },
    });
    res
      .status(404)
      .json({ status: "Sucesso", detalhe: `Mensagem ${idMsg} apagada` });
  } catch (error) {
    res.status(404).json({ error: "Mensagem não encontrada para deletar" });
  }
});

module.exports = router;
