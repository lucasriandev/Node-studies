//PATCH

const http = require("http");

let username = "lucas";

const server = http.createServer((req, res) => {
  if (req.method === "PATCH") {
    let newUser = "";

    req.on("data", (chunk) => {
      newUser += chunk;
    });

    req.on("end", () => {
      console.log(`Antigo nome ${username}`);
      username += newUser;
      console.log(`Novo nome ${username}`);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Alterado!");
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Volte ao terminal");
  }
});

server.listen(3000, () => {
  console.log("Servidor ativo!");
});
