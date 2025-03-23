import express from "express";
import * as sellerController from "../controllers/seller-controller.js";

const router = express.Router();

router.get("/", sellerController.getDashboard);

router.get("/dashboard", sellerController.getDashboard);

router.get("/products", sellerController.getProducts);

export default router;
