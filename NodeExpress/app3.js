//PUT

const express = require("express");
const app = express();

app.use(express.json());

const mensagem = [];

app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem[id]) {
    return res.status(404).json({ status: "Mensagem nao gravada!" });
  }

  mensagem[id] = req.body;

  res.status(201).json({ status: "Sucesso", dados: mensagem });
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
