const express = require("express");
const cors = require("cors");
const app = express();

const rotasAnimes = require("./routes/AnimesRoutes");

app.use(cors());
app.use(express.json());

app.use("/animes", rotasAnimes);

app.listen(3000, () => {
  console.log("Servidor ligado");
});
