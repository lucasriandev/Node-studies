const express = require("express");
const app = express();

app.use(express.json());

let mensagem = [];

app.get("/", (req, res) => {
  res.json({ total: mensagem.length, dados: mensagem });
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
