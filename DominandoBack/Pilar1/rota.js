const express = require("express");
const router = express.Router();

let mensagem = [];

router.get("/", (req, res) => {
  res.status(201).json({ total: mensagem.length, dados: mensagem });
});

router.post("/", (req, res) => {
  const novaMsg = req.body;
  mensagem.push(novaMsg);
  res.status(201).json({ status: "Sucesso", dados: mensagem });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem[id]) {
    return res.status(404).json({ error: "Erro de put" });
  }

  mensagem[id] = req.body;
  res.status(201).json({ status: "Sucesso no put", dados: mensagem });
});

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem[id]) {
    return res.status(404).json({ error: "Errooo" });
  }

  mensagem[id] = { ...mensagem[id], ...req.body };
});

router.delete("/", (req, res) => {
  const id = parseInt(req.params.id);

  if (!mensagem[id]) {
    return res.status(404).json({ error: "Errooo" });
  }

  mensagem.splice(id, 1);

  res.status(200).json({ status: "Sucesso", dados: mensagem });
});

module.exports = router;
