//GET

const express = require("express");
const app = express();

app.use(express.text());

let mensagem = "";

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(`MENSAGEM GRAVADA FOI ESSA NO POST ${mensagem}`);
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
