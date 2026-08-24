const express = require("express");
const app = express();

const rotasAnimes = require("./routes/AnimesRoutes");

app.use(express.json());

app.use("/animes", rotasAnimes);

app.listen(3000, () => {
  console.log("Servidor ligado");
});
