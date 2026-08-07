const express = require("express");
const app = express();

const rotasPersonagens = require("./personagens");

app.use(express.json());

app.use("/personagem", rotasPersonagens);

app.use((req, res) => {
  res.status(404).json({ error: "Rota nao encontrada!" });
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
