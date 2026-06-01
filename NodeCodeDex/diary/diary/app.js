const fs = require("fs");

const mensagem = "TESTANDO ARQUIVO";

fs.writeFile("teste.txt", mensagem, (err) => {
  if (err) {
    console.log("erro ao salvar arquivo", err);
  } else {
    console.log("arquivo salvo");
  }
});
