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

app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem[id]) {
    return res.status(404).json({ erro: "Mensagem nao encontrada!" });
  }

  mensagem[id] = req.body;
  //"Abra a gaveta de número id e coloque lá dentro o novo objeto que veio no req.body (substituindo o que estava lá antes)."
  res.json({ status: "Sucesso", dados: mensagem[id] });
});

app.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem[id]) {
    return res.status(404).json({ error: "Mensagem não encontrada!" });
  }

  mensagem[id] = { ...mensagem[id], ...req.body };

  res.json({ status: "Sucesso", dados: mensagem[id] });
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem[id]) {
    return res.status(404).json({ error: "Nada encontrado" });
  }

  mensagem.splice(id, 1);

  res.status(200).json({ status: "Sucesso", dados: mensagem });
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
