//GET

const http = require("http");
let like = 30;
let compartilhamento = 2;

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);

  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    like++;
    compartilhamento++;
    let soma = like + compartilhamento;
    console.log(`likes ${like} e ${compartilhamento}`);
    res.write(`${soma}`);
    res.end("Testando get");
  } else if (req.url === "/pikachu") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      `<img src="https://tse1.mm.bing.net/th/id/OIP.PvHb7bZbrm1rCz_0DSVdVAHaEK?r=0&pid=Api&P=0&h=180">`,
    );
  }
});

server.listen(3000, () => {
  console.log("Servidor ativo!");
});
