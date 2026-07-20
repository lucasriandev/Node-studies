const express = require("express");
const app = express();

app.use(express.text());

let mensagem = ["Lucas"];

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end(`${mensagem}`);
});

app.post("/", (req, res) => {
  mensagem.push(req.body);
  console.log(`Mensagem nova gravada: ${mensagem}`);
  res.send(`Mensagem enviada do post: ${mensagem}`);
});

app.put("/", (req, res) => {
  mensagem = req.body;
  console.log(`Mensagem do put: ${mensagem}`);
  res.setHeader("Content-Type", "text/plain");
  res.end(`Mensagem gravada do put: ${mensagem}`);
});

app.patch("/", (req, res) => {
  mensagem += req.body;
  console.log(`Mensagem gravada do patch: ${mensagem}`);
  res.end(`Mensagem gravada do patch: ${mensagem}`);
});

app.delete("/", (req, res) => {
  mensagem = ["Lucas"];
  res.end(`Post e alterações apagadas`);
});

app.use((req, res) => {
  res.status(404).send("Volte ao terminal");
});

app.listen(3000, () => {
  console.log("Servidor ligado!");
});
