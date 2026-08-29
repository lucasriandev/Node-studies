const express = require("express");
const router = express.Router();
const mensagemControllers = require("../Controllers/cadastroCon");

router.post("/", mensagemControllers.post);
router.get("/", mensagemControllers.get);

module.exports = router;
