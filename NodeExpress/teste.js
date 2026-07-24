const express = require("express");
const app = express();

app.use(express.json());

let mensagem = [];

app.get("/", (req, res) => {
  res.json({ total: mensagem.length, dados: mensagem });
});

app.post("/", (req, res) => {
  const novaMensagem = req.body;

  mensagem.push(novaMensagem);

  res.status(201).json({ status: "sucesso", mensagemCriada: novaMensagem });
});

app.put("/:id", (req, res) => {
  mensagem = req.body;
  res.status(201).json({ status: "sucesso", mensagemAlterada: novaMsg });
});

app.delete("/", (req, res) => {
  mensagem = [];
  res
    .json(201)
    .json({ status: "sucesso", detalhe: "Todas as mensagens foram apagadas!" });
});

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000!");
});
