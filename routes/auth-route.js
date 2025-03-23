import express from "express";
import * as authController from "../controllers/auth-controller.js";
import * as authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router.route("/register")
    .get(authMiddleware.isLoggedIn, authController.getRegister)
    .post(authMiddleware.isLoggedIn, authController.postRegister);

router.route("/login")
    .get(authMiddleware.isLoggedIn, authController.getLogin)
    .post(authMiddleware.isLoggedIn, authController.postLogin);

router.route("/logout")
    .post(authMiddleware.isAuthenticated, authController.postLogout);

export default router;
