import express from "express";
import * as authController from "../controllers/auth-controller.js";
import * as authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router.route("/logout")
    .post(authMiddleware.isAuthenticated, authController.postLogout);

router.use(authMiddleware.isLoggedIn);

router.route("/register")
    .get(authController.getRegister)
    .post(authController.postRegister);

router.route("/login")
    .get(authController.getLogin)
    .post(authController.postLogin);

export default router;
