//PUT

const http = require("http");

let username = "lucas";

const server = http.createServer((req, res) => {
  if (req.method === "PUT") {
    let newUsername = "";

    req.on("data", (chunk) => {
      newUsername += chunk;
    });

    req.on("end", () => {
      console.log(`Nome de inicio ${username}`);
      username = newUsername;
      console.log(`Mudou para ${username}`);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end();
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Volte ao terminal");
  }
});

server.listen(3000, () => {
  console.log("Servidor ligado!");
});
