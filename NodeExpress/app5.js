//DELETE

const express = require("express");
const app = express();

app.use(express.json());

const mensagem = [];

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem.id) {
    return res.status(201).json({ status: "Erro", dados: mensagem });
  }

  mensagem.splice(id, 1);

  res.status(201).json({ status: "Deletado", dados: mensagem });
});

app.listen(3000, () => {
  console.log("Server ativo!");
});
