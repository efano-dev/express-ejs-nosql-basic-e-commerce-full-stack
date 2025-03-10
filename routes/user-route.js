const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.get("/", userController.getProducts);

router.get("/products", userController.getProducts);

module.exports = router;
