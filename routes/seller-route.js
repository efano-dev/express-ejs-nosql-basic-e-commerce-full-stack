import express from "express";
import * as sellerController from "../controllers/seller-controller.js";
import * as authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router.use(authMiddleware.isAuthenticated, authMiddleware.isAuthorized("seller"));

router.route("/products")
    .get(sellerController.getProducts)
    .post(sellerController.createProduct);

router.get("/", sellerController.getProducts);

export default router;
