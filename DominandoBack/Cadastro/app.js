const express = require("express");
const cors = require("cors");
const app = express();

const rotaCadastro = require("./Routes/CadastroRou");

app.use(cors());
app.use(express.json());

app.use("/cadastro", rotaCadastro);

app.listen(3000, () => {
  console.log("Servidor ligado!");
});
