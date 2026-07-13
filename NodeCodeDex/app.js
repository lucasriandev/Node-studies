const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);

  if (req.url === "/pikachu") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      `<img src="https://tse1.mm.bing.net/th/id/OIP.PvHb7bZbrm1rCz_0DSVdVAHaEK?r=0&pid=Api&P=0&h=180">`,
    );
  }
});

server.listen(3000, () => {
  console.log("Servidor ativo!");
});
