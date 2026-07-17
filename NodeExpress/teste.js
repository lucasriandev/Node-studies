const express = require("express");
const app = express();

app.use(express.text());

let mensagem = "";

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end(`Mensagem gravada: ${mensagem}`);
});

app.post("/", (req, res) => {
  mensagem = req.body;
  console.log(`Mensagem gravada: ${mensagem}`);
  res.end(`${mensagem}`);
});

app.put("/", (req, res) => {
  console.log(`Mensagem antiga: ${mensagem}`);
  mensagem = req.body;
  console.log(`Mensagem nova: ${mensagem}`);
  res.end(`${mensagem}`);
});

app.listen(3000, () => {
  console.log("Server ativado!");
});
