import express from "express";
import * as userController from "../controllers/user-controller.js";
const router = express.Router();

router.get("/", userController.getProducts);

router.get("/products", userController.getProducts);

export default router;
