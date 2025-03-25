import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";

const router = express.Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(productRoutes);

export default router;
