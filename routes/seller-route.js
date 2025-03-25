import express from "express";
import * as sellerController from "../controllers/seller-controller.js";

const router = express.Router();

router.get("/", sellerController.getProducts);

router.route("/products")
    .get(sellerController.getProducts)
    .post(sellerController.createProduct);

export default router;
