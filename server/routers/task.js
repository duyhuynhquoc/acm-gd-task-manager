const express = require("express");
const router = express.Router();

const taskController = require("../controllers/TaskController");

router.get("/", taskController.get);
router.post("/", taskController.create);

module.exports = router;