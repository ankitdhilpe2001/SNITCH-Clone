import express from "express";
import authMiddleware from "../middleware/AuthMiddleware";
import { createProduct } from "../controller/productController";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/", authMiddleware, upload.array("images", 6), createProduct);

export default router;
