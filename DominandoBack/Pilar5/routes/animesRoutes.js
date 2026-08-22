const express = require("express");
const router = express.Router();
const mensagemController = require("../controllers/animesController");

router.post("/", mensagemController.post);
router.get("/", mensagemController.get);

module.exports = router;
