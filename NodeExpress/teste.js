const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const rotasMsg = require("./msg");

app.use(express.json());

app.use("/msg", rotasMsg);

app.use((req, res) => {
  res.status(404).json({ error: "Rota nao encontrada!" });
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
