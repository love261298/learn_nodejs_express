import User from "../model/User.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const getAll = async (req, res) => {
  try {
    const limit = 9;
    const lastId = req.query.lastId;

    let query = {};
    if (lastId) {
      query = { _id: { $gt: lastId } };
    }

    const users = await User.find(query)
      .limit(limit)
      .select("id name phone role");

    return res.status(200).json({ users });
  } catch (e) {
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách người dùng",
      error: e.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { phone: req.body.phone },
      { $set: { name: req.body.name, role: req.body.role } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    return res.status(200).json({
      phone: user.phone,
      name: user.name,
      role: user.role,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Lỗi khi cập nhật thông tin người dùng",
      error: e.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Người dùng chưa được xác thực" });
    }
    const isMatch = await bcryptjs.compare(
      req.body.oldPassword,
      req.user.password
    );
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu cũ không chính xác",
      });
    }
    if (req.body.newPassword !== req.body.newPasswordConfirm)
      return res.status(400).json({
        message: "Mật khẩu mới không khớp",
      });
    const hashedPassword = await bcryptjs.hash(req.body.newPassword, 10);
    req.user.password = hashedPassword;
    await req.user.save();
    return res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    return res.json({ message: "Xóa người dùng thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
