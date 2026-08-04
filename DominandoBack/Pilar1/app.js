const express = require("express");
const app = express();

const rotas = require("./rota");

app.use(express.json());

app.use("/rota", rotas);

app.use((req, res) => {
  res.status(404).json({ error: "Rota nao encontrada!" });
});

app.listen(3000, () => {
  console.log("Servidor ativado!");
});
