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

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { nome, poder } = req.body;

  try {
    const novaMsg = await prisma.personagem.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
        poder: poder,
      },
    });
    res.status(200).json({ status: "Atualizado com sucesso", dados: novaMsg });
  } catch (error) {
    res.status(201).json({ error: "Erro no put", error });
  }
});

router.patch("/:id", async (req, res) => {
  const { texto } = req.body;

  try {
    const novoTexto = await prisma.personagem.update({
      data: {
        texto: texto,
      },
    });
  } catch (error) {
    res.status(404).json({ error: "Erro no patch", error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.personagem.delete({
      where: { id: id },
    });
    res
      .status(404)
      .json({ status: "Sucesso", detalhe: `Mensagem ${idMsg} apagada` });
  } catch (error) {
    res.status(404).json({ error: "Erro ao deletar", error });
  }
});

module.exports = router;
