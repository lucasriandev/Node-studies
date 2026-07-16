//curl.exe -X POST http://localhost:3000 -H "Content-Type: text/plain" -d "frolic-fan"

const express = require("express");
const app = express();

app.use(express.text());

let mensagem = "";

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(`Mensagem gravada no post foi:  ${mensagem}`);
});

app.post("/", (req, res) => {
  mensagem = req.body;
  console.log(`Mensagem enviada ${mensagem}`);
  res.send(`${mensagem}`);
});

app.listen(3000, () => {
  console.log("Server ativo!");
});
