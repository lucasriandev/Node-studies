const express = require("express");
const router = express.Router();
const cadastroControllers = require("../Controllers/CadastroCont");

router.post("/", cadastroControllers.post);
router.get("/", cadastroControllers.get);

module.exports = router;
