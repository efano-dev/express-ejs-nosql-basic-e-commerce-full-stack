import express from "express";
import * as userController from "../controllers/user-controller.js";
import * as authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router
	.route("/subscribe-seller")
	.get(authMiddleware.isAuthenticated, authMiddleware.isAuthorized("user"), userController.getSubscribeSeller)
	.post(authMiddleware.isAuthenticated, authMiddleware.isAuthorized("user"), userController.subscribeSeller);

router.get("/products", userController.getProducts);

router.get("/", userController.getProducts);

export default router;
