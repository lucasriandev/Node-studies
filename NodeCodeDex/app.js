const http = require("http");

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

server.listen(3000, () => [console.log("Servidor ligado!")]);
