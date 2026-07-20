//DELETE

const express = require("express");
const app = express();

let mensagem = "";

app.use(express.text());

app.delete("/", (req, res) => {
  mensagem = "";
  console.log(`Mensagem deletada! ${mensagem}`);
  res.send(`Mensagem deletada!`);
});

app.listen(3000, () => {
  console.log("Servidor ligado!");
});
