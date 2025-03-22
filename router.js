import express from "express";
import { signUp, signIn } from "./controllers/auth.js";
import { getAll, changeRole, deletteUser } from "./controllers/user.js";
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

router.post("/register", signUp);
router.post("/login", signIn);
router.get("/", verifyToken, checkAdmin, getAll);
router.patch("/", verifyToken, checkAdmin, changeRole);
router.delete("/:id", verifyToken, checkAdmin, deletteUser);
//product-router
router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post("/product", upload.single("image"), createProduct);
router.put("/product/:id", upload.single("image"), updateProduct);
router.delete("/product/:id", deleteProduct);
export default router;
