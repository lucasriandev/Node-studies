const express = require("express");
const app = express();

app.use(express.text());

let mensagem = [];

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end(`Mensagem gravada: ${mensagem}`);
});

app.post("/", (req, res) => {
  mensagem.push(req.body);
  console.log(`Mensagem enviada ${mensagem}`);
  res.end(`${mensagem}`);
});

app.put("/", (req, res) => {
  mensagem = req.body;
  console.log(`Mensagem nova: ${mensagem}`);
  res.end(`Mensagem do put: ${mensagem}`);
});

app.patch("/", (req, res) => {
  mensagem += req.body;
  console.log(`Mensagem do patch: ${mensagem}`);
  res.end(`Mensagem do patch: ${mensagem}`);
});

app.listen(3000, () => {
  console.log("Servidor ligado!");
});
