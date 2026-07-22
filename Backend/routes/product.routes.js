import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { createProduct } from "../controller/productController.js";
import { productValidator } from "../validation/productValidation.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/create-product", authMiddleware, productValidator ,upload.array("images", 6), createProduct);

export default router;
