const express = require("express");
const app = express();

const rotasAnimes = require("./routes/animesRoutes");

app.use(express.json());

app.use("/animes", rotasAnimes);

app.listen(3000, () => {
  console.log("Servidor animes ligado!");
});
