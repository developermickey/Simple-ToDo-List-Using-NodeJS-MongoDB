const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.home);
router.post("/create", todoController.create);
router.get("/edit/:id", todoController.edit);
router.post("/edit/:id", todoController.update);
router.get("/delete/:id", todoController.delete);

module.exports = router;
