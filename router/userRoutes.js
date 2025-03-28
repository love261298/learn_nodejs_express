import express from "express";
import {
  getAll,
  updateUser,
  deleteUser,
  changePassword,
} from "../controllers/user.js";
import { verifyToken, checkAdmin } from "../Validation/index.js";

const router = express.Router();
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     description: Trả về danh sách tất cả người dùng với các thông tin cơ bản
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Trả về danh sách người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109ca"
 *                       name:
 *                         type: string
 *                         example: "Nguyen Van A"
 *                       phone:
 *                         type: string
 *                         example: "0123456789"
 *                       role:
 *                         type: string
 *                         example: "admin"
 *       500:
 *         description: Lỗi khi lấy danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi khi lấy danh sách người dùng:"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get("/user", verifyToken, getAll);
/**
 * @swagger
 * /user:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     description: Cập nhật tên và vai trò của người dùng dựa trên số điện thoại
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "0987654321"
 *               name:
 *                 type: string
 *                 example: "Nguyen Van B"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       200:
 *         description: Cập nhật thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 phone:
 *                   type: string
 *                   example: "0987654321"
 *                 name:
 *                   type: string
 *                   example: "Nguyen Van B"
 *                 role:
 *                   type: string
 *                   example: "user"
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy người dùng"
 *       500:
 *         description: Lỗi máy chủ khi cập nhật thông tin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi khi cập nhật thông tin người dùng"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.put("/user/:id", verifyToken, checkAdmin, updateUser);
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     description: Xóa người dùng khỏi hệ thống bằng ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng cần xóa
 *     responses:
 *       200:
 *         description: Xóa người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Xóa người dùng thành công"
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy người dùng"
 *       500:
 *         description: Lỗi máy chủ khi xóa người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.delete("/user/:id", verifyToken, checkAdmin, deleteUser);
/**
 * @swagger
 * /user/change-password:
 *   post:
 *     summary: Đổi mật khẩu người dùng
 *     description: Cho phép người dùng đổi mật khẩu khi đã xác thực
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "oldpassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *               newPasswordConfirm:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đổi mật khẩu thành công"
 *       400:
 *         description: Lỗi dữ liệu đầu vào không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mật khẩu mới không khớp"
 *       401:
 *         description: Người dùng chưa được xác thực
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Người dùng chưa được xác thực"
 *       500:
 *         description: Lỗi máy chủ khi đổi mật khẩu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "InternalServerError"
 *                 message:
 *                   type: string
 *                   example: "Lỗi không xác định"
 */
router.patch("/user", verifyToken, changePassword);

export default router;
