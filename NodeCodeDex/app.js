const http = require("http");

const server = http.createServer((req, res) => {
  let statusCode = 200;
  let contentType = "text/html; charset=utf-8";
  let content = "";

  if (req.url === "/") {
    content = "<h1>Home</h1>";
  } else if (req.url === "/a") {
    content = "<h1>Sala de aula</h1>";
  }

  res.writeHead(statusCode, { "content-type": contentType });
  res.end(content);
});

server.listen(3000, () => {
  console.log("Servidor funcionando");
});
