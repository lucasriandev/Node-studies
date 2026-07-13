const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    console.log(req.url);
    console.log(req.method);

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("hello word");
  } else if (req.url === "/teste") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<h1>Teste de clique</h1>
      <button>Clique</button>
      `);
  }
});

server.listen(3000, () => {
  console.log("Servidor ativo");
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
