const express = require("express");
const router = express.Router();
const mensagemControllers = require("../controllers/AnimesControllers");

router.post("/", mensagemControllers.post);
router.get("/", mensagemControllers.get);

module.exports = router;
