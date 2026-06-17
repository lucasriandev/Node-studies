const http = require("http");

const server = http.createServer((request, response) => {
  response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  response.write("Welcome to Neon Noodles!");
  response.write("LATE NITE MENU");
  response.write("RAMEN 1. Quantum Truffle Ramen ");
  response.write(
    "EXTRA TOPPINGS 1. Hacktivist Pork 2. Cybernetic Egg 3. Glowing Scallions ",
  );
  response.end();
});

server.listen(3000, () => {
  console.log("Servidor funcionando!");
});
