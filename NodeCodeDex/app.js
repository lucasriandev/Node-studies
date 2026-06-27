const http = require("http");

const server = http.createServer((req, res) => {
  let codeStatus = 200;
  let contentType = "text/html; charset=utf-8";
  let content = "";

  if (req.url === "/") {
    content = "<h1>Pagina inicial</h1>";
  } else if (req.url === "/contato") {
    content = "<h1>Contato!</h1>";
  }

  res.writeHead(codeStatus, { "Content-Type": contentType });
  res.end(content);
});

server.listen(3000, () => {
  console.log("Server ativo!");
});

/*const http = require("http");

const server = http.createServer((req, res) => {
  let statusCode = 200;
  let contentType = "text/html; charset=utf-8";
  let content = "";

  if (req.url === "/") {
    content = "<h1>Pagina inicial";
  }

  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(content);
});

server.listen(3000, () => [console.log("Servidor ligado!")]);*/
