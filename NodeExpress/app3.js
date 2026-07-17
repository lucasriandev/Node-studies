const express = require("express");
const app = express();

app.use(express.text());

let mensagem = "";

app.put("/", (req, res) => {
  mensagem = req.body;
  console.log(`Mensagem substituida ${mensagem}`);
  res.send(`Mensagem nova ${mensagem}`);
});

app.listen(3000, () => {
  console.log("Server ativado!");
});
