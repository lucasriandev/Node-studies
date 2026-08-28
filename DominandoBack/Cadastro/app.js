const express = require("express");
const cors = require("cors");
const rotaCadastro = require("./Router/cadastroRou.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/cadastro", rotaCadastro);

app.listen(3000, () => {
    console.log("Servidor ligado!");
});
