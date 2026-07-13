//POST

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let mensagem = "";

    req.on("data", (chunk) => {
      mensagem += chunk;
    });

    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`mensagem aceita ${mensagem}`);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Renicie tudo!");
  }
});

server.listen(3000, () => {
  console.log("Servidor ativo!");
});
