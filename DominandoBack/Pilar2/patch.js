const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

app.use(express.json());

app.patch("/:id", (req, res) => {
  const idMsg = Number(req.params.id);
  const { texto } = req.body;

  try {
    const novaMensagem = prisma.exemplo.update({
      where: {
        id: idMsg,
      },
      data: req.body,
    });
    res.status(404).json({ status: "Sucesso", dados: novaMensagem });
  } catch (error) {
    res.status(404).json({ error: "Não alterado!" });
  }
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
