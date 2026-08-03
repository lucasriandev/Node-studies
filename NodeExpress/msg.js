const express = require("express");
const router = express.Router();

let mensagem = [];

router.get("/", (req, res) => {
  res.json({ total: mensagem.length, dados: mensagem });
});

router.post("/", (req, res) => {
  const novaMsg = req.body;
  mensagem.push(novaMsg);
  res.status(201).json({ status: "Sucesso", dados: mensagem });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem[id]) {
    return res.status(404).json({ erro: "Mensagem nao encontrada!" });
  }

  mensagem[id] = req.body;
  //"Abra a gaveta de número id e coloque lá dentro o novo objeto que veio no req.body (substituindo o que estava lá antes)."
  res.json({ status: "Sucesso", dados: mensagem[id] });
});

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem[id]) {
    return res.status(404).json({ error: "Mensagem não encontrada!" });
  }

  mensagem[id] = { ...mensagem[id], ...req.body };

  res.json({ status: "Sucesso", dados: mensagem[id] });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem[id]) {
    return res.status(404).json({ error: "Nada encontrado" });
  }

  mensagem.splice(id, 1);

  res.status(200).json({ status: "Sucesso", dados: mensagem });
});

module.exports = router;
