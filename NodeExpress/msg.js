require("dotenv/config");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const { z } = require("zod");
const router = express.Router();

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const mensagemSchema = z.object({
  texto: z.string().min(3, "O texto precisa ter no minimo 3 letras"),
  idade: z.number().int().positive("A idade precisa ser um numero positivo"),
});

router.get("/", async (req, res) => {
  const todasMsg = await prisma.mensagem.findMany();
  res.status(201).json({ total: todasMsg.length, dados: todasMsg });
});

router.post("/", async (req, res) => {
  try {
    const mensagemValidade = mensagemSchema.parse(req.body);

    const novaMsg = await prisma.mensagem.create({
      data: {
        texto: mensagemValidade.texto,
        idade: mensagemValidade.idade,
      },
    });
    res.status(201).json(novaMsg);
  } catch (erro) {
    res
      .status(404)
      .json({
        erro: "Dados inválidos barrados pelo segurança!",
        detalhes: erro.error,
      });
  }
});

router.put("/:id", async (req, res) => {
  const idMsg = Number(req.params.id);
  const { texto, idade } = req.body;

  try {
    const mensagemAtualizada = await prisma.mensagem.update({
      where: {
        id: idMsg,
      },
      data: {
        texto: texto,
        idade: idade,
      },
    });
    res.status(201).json({ status: "Sucesso", dados: mensagemAtualizada });
  } catch (error) {
    res.status(404).json({ error: "Mensagem nao encontrada para atualizar" });
  }
});

router.patch("/:id", async (req, res) => {
  const { texto } = req.body;

  try {
    const msg = await prisma.mensagem.update({
      data: {
        texto: texto,
      },
    });
  } catch (error) {
    res.status(404).json({ error: "Erro no patch" });
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
