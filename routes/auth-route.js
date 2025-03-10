const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.route("/register")
    .get(authController.getRegister)
    .post(authController.postRegister);

router.route("/login")
    .get(authController.getLogin)
    .post(authController.postLogin);

router.route("/logout")
    .post(authController.postLogout);

module.exports = router;
