import express from "express";
import multer from "multer";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";
import { verifyToken, checkAdmin } from "../Validation/index.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     description: Trả về danh sách tối đa 9 sản phẩm
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Lấy danh sách sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109cb"
 *                       name:
 *                         type: string
 *                         example: "Laptop Dell XPS 13"
 *                       price:
 *                         type: number
 *                         example: 29990000
 *                       description:
 *                         type: string
 *                         example: "Laptop mỏng nhẹ, hiệu năng cao"
 *                       image:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *       500:
 *         description: Lỗi khi lấy danh sách sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi khi lấy danh sách sản phẩm"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get("/product", verifyToken, getProducts);
/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Lấy thông tin sản phẩm theo ID
 *     description: Trả về thông tin chi tiết của một sản phẩm dựa trên ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần lấy
 *     responses:
 *       200:
 *         description: Trả về thông tin sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109cb"
 *                 name:
 *                   type: string
 *                   example: "Laptop Dell XPS 13"
 *                 price:
 *                   type: number
 *                   example: 29990000
 *                 description:
 *                   type: string
 *                   example: "Laptop mỏng nhẹ, hiệu năng cao"
 *                 image:
 *                   type: string
 *                   example: "https://example.com/image.jpg"
 *       404:
 *         description: Không tìm thấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy sản phẩm"
 *       500:
 *         description: Lỗi khi lấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi khi lấy sản phẩm"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get("/product/:id", verifyToken, getProductById);
/**
 * @swagger
 * /product:
 *   post:
 *     summary: Tạo mới một sản phẩm
 *     description: Tạo một sản phẩm mới với tiêu đề, giá và hình ảnh tùy chọn
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Điện thoại iPhone 15"
 *               price:
 *                 type: number
 *                 example: 25000000
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Ảnh của sản phẩm (tùy chọn)
 *     responses:
 *       201:
 *         description: Sản phẩm được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109cb"
 *                 title:
 *                   type: string
 *                   example: "Điện thoại iPhone 15"
 *                 price:
 *                   type: number
 *                   example: 25000000
 *                 imageData:
 *                   type: string
 *                   format: binary
 *                   description: Dữ liệu hình ảnh sản phẩm (nếu có)
 *                 contentType:
 *                   type: string
 *                   example: "image/png"
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vui lòng nhập tiêu đề và giá hợp lệ"
 *       500:
 *         description: Lỗi máy chủ khi tạo sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi khi tạo sản phẩm"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post(
  "/product",
  verifyToken,
  checkAdmin,
  upload.single("image"),
  createProduct
);
/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Cập nhật thông tin sản phẩm
 *     description: Cho phép cập nhật tiêu đề, giá và hình ảnh của sản phẩm
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Laptop ASUS ROG Strix"
 *               price:
 *                 type: number
 *                 example: 35000000
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Ảnh của sản phẩm (tùy chọn)
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109cb"
 *                 title:
 *                   type: string
 *                   example: "Laptop ASUS ROG Strix"
 *                 price:
 *                   type: number
 *                   example: 35000000
 *                 imageData:
 *                   type: string
 *                   format: binary
 *                   description: Dữ liệu hình ảnh sản phẩm (nếu có)
 *                 contentType:
 *                   type: string
 *                   example: "image/png"
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thông tin sản phẩm không hợp lệ"
 *       404:
 *         description: Không tìm thấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy sản phẩm"
 *       500:
 *         description: Lỗi khi cập nhật sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi khi cập nhật sản phẩm"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.put(
  "/product/:id",
  verifyToken,
  checkAdmin,
  upload.single("image"),
  updateProduct
);
/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     description: Xóa một sản phẩm dựa trên ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần xóa
 *     responses:
 *       200:
 *         description: Xóa sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Xóa sản phẩm thành công"
 *       404:
 *         description: Không tìm thấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy sản phẩm"
 *       500:
 *         description: Lỗi khi xóa sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi khi xóa sản phẩm"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.delete("/product/:id", verifyToken, checkAdmin, deleteProduct);

export default router;
