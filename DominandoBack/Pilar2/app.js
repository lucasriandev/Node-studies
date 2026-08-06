// GET aprendizado de sintexe com prisma!

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const msgTodos = prisma.Exemplo.findMany();
  res.status(201).json({ detalhe: msgTodos.length, dados: msgTodos });
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
