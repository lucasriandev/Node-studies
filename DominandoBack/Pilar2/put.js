const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

app.use(express.json());

app.put("/:id", (req, res) => {
  const idMsg = Number(req.params.id);
  const { texto } = req.body;

  try {
    const mensagemAtualizada = prisma.exemplo.update({
      where: {
        id: idMsg,
      },
      data: {
        texto: texto,
      },
    });
    res
      .status(404)
      .json({
        status: "Sucesso ao alterar mensagem",
        dados: mensagemAtualizada,
      });
  } catch (error) {
    res.status(404).json({ error: "Nao encontrado!" });
  }
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
