const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Hello word");
  res.end();
});

server.listen(3000);
