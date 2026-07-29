//PATCH

const express = require("express");
const app = express();

app.use(express.json());

const mensagem = [];

app.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem.id) {
    return res.status(404).json({ status: "Sucesso", dados: mensagem });
  }

  mensagem = { ...mensagem[id], ...req.params };
  res.status(201).json({ status: "Sucesso", dados: mensagem });
});

app.listen(3000, () => {
  console.log("Server ativo!");
});
