//POST

//curl.exe -X POST http://localhost:3000 -H "Content-Type: text/plain" -d "frolic-fan"

const express = require("express");
const app = express();

let mensagem = "";

app.use(express.text());

app.post("/", (req, res) => {
  mensagem = req.body;
  console.log(`Esta mensagem foi gravada ${mensagem}`);
  res.send(`MENSAGEM GRAVADA ${mensagem}`);
});

app.listen(3000, () => {
  console.log("Server ativado!");
});
