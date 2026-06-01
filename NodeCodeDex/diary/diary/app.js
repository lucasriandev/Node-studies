const fs = require("fs");

fs.unlink("seventh-grade.txt", (err) => {
  if (err) {
    console.log("Erro ao deletar", err);
    return;
  } else {
    console.log("seventh foi deletado com sucesso");
  }
});
