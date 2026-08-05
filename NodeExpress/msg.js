const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  const todasMsg = await prisma.mensagem.findMany();
  res.status(201).json({total: todasMsg.length, dados: todasMsg})
});

router.post("/", (req, res) => {
  
  const {texto} = req.body

  const novaMsg = await prisma.mensagem.create({
    data: {
      texto: texto
    }
  })
  res.status(201).json({status: "Sucesso", mensagemCriada: novaMsg})
});


router.delete("/", async (req, res) => {
  await prisma.mensagem.deleteMany()
  res.json({status: "Sucesso", detalhe: "Todas as mensagens apagadas do banco"})
});

module.exports = router;
