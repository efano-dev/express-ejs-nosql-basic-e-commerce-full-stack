import express from "express";
import * as sellerController from "../controllers/seller-controller.js";
import * as authMiddleware from "../middleware/auth-middleware.js";
import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

const router = express.Router();

router.use(authMiddleware.isAuthenticated, authMiddleware.isAuthorized("seller"));

router.route("/products").get(sellerController.getProducts).post(upload.single("image"), sellerController.createProduct);

router.get("/", sellerController.getProducts);

export default router;
