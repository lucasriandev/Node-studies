const express = require("express");
const app = express();

app.use(express.json());

let mensagem = [];

app.get("/", (req, res) => {
  res.json({ total: mensagem.length, dados: mensagem });
});

app.post("/", (req, res) => {
  const novaMsg = req.body;
  mensagem.push(novaMsg);
  res.status(201).json({ status: "Sucesso", dados: mensagem });
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
