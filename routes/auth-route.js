import express from "express";
import * as authController from "../controllers/auth-controller.js";

const router = express.Router();

router.route("/register")
    .get(authController.getRegister)
    .post(authController.postRegister);

router.route("/login")
    .get(authController.getLogin)
    .post(authController.postLogin);

router.route("/logout")
    .post(authController.postLogout);

export default router;
