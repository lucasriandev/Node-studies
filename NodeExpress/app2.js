//POST

//curl.exe -X POST http://localhost:3000 -H "Content-Type: text/plain" -d "frolic-fan"

const express = require("express");
const app = express();

app.use(express.json());

const mensagem = [];

app.post("/", (req, res) => {
  const novaMsg = req.body;
  mensagem.push(novaMsg);
  res.status(201).json({ status: "Sucesso", dados: mensagem });
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
