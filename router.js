import express from "express";
import { register, login } from "./controllers/auth.js";
import {
  getAll,
  updateUser,
  deleteUser,
  changePassword,
} from "./controllers/user.js";
import verifyToken from "./Validation/verifyToken.js";
import checkAdmin from "./Validation/checkAdmin.js";
import multer from "multer";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/product.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
//login-logout
router.post("/register", register);
router.post("/login", login);
//user-router
router.get("/user", verifyToken, getAll);
router.put("/user/:phone", verifyToken, checkAdmin, updateUser);
router.delete("/user/:id", verifyToken, checkAdmin, deleteUser);
router.patch("/user", verifyToken, changePassword);
//product-router
router.get("/product", verifyToken, getProducts);
router.get("/product/:id", verifyToken, getProductById);
router.post(
  "/product",
  verifyToken,
  checkAdmin,
  upload.single("image"),
  createProduct
);
router.put(
  "/product/:id",
  verifyToken,
  checkAdmin,
  upload.single("image"),
  updateProduct
);
router.delete("/product/:id", verifyToken, checkAdmin, deleteProduct);
export default router;
