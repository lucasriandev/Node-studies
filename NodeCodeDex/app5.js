//DELETE

const http = require("http");

let nome = "lucas";

const server = http.createServer((req, res) => {
  if (req.method === "DELETE") {
    console.log(`Nome antigo ${nome}`);
    nome = null;
    console.log("Nome deletado");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Contato deletado!");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando!");
});
