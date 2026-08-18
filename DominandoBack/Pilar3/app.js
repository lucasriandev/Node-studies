const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const rotasPersonagens = require("./personagens");

app.use("/personagem", rotasPersonagens);

app.use((req, res) => {
  res.status(404).json({ error: "Rota nao encontrada!" });
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
