//PATCH

const express = require("express");
const app = express();

app.use(express.text());

let mensagem = [];

app.patch("/", (req, res) => {
  mensagem += req.body;
  console.log(`Mensagem alterada ${mensagem}`);
  res.send(`Mensagem nova alterada: ${mensagem}`);
});

app.listen(3000, () => {
  console.log("Server ligado!");
});
