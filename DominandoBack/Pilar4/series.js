const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const novaMsg = await prisma.personagem.findMany();
  res.status(201).json({ detalhe: novaMsg.length, dados: novaMsg });
});

router.post("/", async (req, res) => {
  const { texto } = req.body;

  const novaMsg = await prisma.personagem.create({
    data: {
      texto: texto,
    },
  });
  res.status(201).json({ status: "Sucesso", dados: novaMsg });
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { texto } = req.body;

  try {
    const msg = await prisma.personagem.update({
      where: {
        id: id,
      },
      data: {
        texto: texto,
      },
    });
    res.status(201).json({ status: "Sucesso", dados: msg });
  } catch (error) {
    res.status(404).json({ error: "Erro ao alterar" });
  }
});

router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { texto } = req.body;

  try {
    const msg = await prisma.personagem.update({
      where: {
        id: id,
      },
      data: {
        texto: texto,
      },
    });
    res.status(201).json({ status: "Sucesso", dados: msg });
  } catch (error) {
    res.status(404).json({ error: "Erro no patch" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.personagem.delete({
      id: id,
    });
    res.status(201).json({ status: "Sucesso ao deletar", dados: id });
  } catch (error) {
    res.status(404).json({ error: "Erro ao deletar" });
  }
});

module.exports = router;
