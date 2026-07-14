const http = require("http");

let mensagem = "";

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`MENSAGEM GRAVADA ${mensagem}`);
  } else if (req.method === "POST") {
    let mensagemRecebida = "";

    req.on("data", (chunk) => {
      mensagemRecebida += chunk;
    });

    req.on("end", () => {
      mensagem = mensagemRecebida;

      console.log(`Esta mensagem foi gravada: ${mensagem}`);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`MENSAGEM GRAVADA: ${mensagem}`);
    });
  } else if (req.method === "PUT") {
    let novaMensagem = "";

    req.on("data", (chunk) => {
      novaMensagem += chunk;
    });

    req.on("end", () => {
      mensagem = novaMensagem;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`${mensagem}`);
    });
  } else if (req.method === "PATCH") {
    let mensagemAlterada = "";

    req.on("data", (chunk) => {
      mensagemAlterada += chunk;
    });

    req.on("end", () => {
      mensagem += mensagemAlterada;
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Mensagem alterada ${mensagem}`);
    });
  } else if (req.method === "DELETE") {
    console.log(`Mensagem antiga ${mensagem}`);
    mensagem = "";
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Mensagem apagada!");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Volte ao terminal");
  }
});

server.listen(3000, () => {
  console.log("servidor ativo");
});
