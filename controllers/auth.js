import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import User from "../model/User.js";
import { signInValidator, signUpValidator } from "../Validation/user.js";

dotenv.config();

if (!process.env.SECRET_CODE) {
  throw new Error("Thiếu SECRET_CODE trong biến môi trường.");
}

export const register = async (req, res) => {
  try {
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const userExists = await User.findOne({ phone: req.body.phone });
    if (userExists) {
      return res.status(400).json({
        message: "Số điện thoại này đã được đăng ký!",
      });
    }

    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });

    // Tạo accessToken ngay sau khi đăng ký
    const accessToken = jwt.sign({ _id: user._id }, process.env.SECRET_CODE, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "Đăng ký tài khoản thành công!",
      accessToken,
    });
  } catch (error) {
    console.error("Lỗi trong quá trình đăng ký:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ, vui lòng thử lại sau.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = signInValidator.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const user = await User.findOne({ phone: req.body.phone }).select(
      "+password"
    );
    if (!user) {
      return res.status(400).json({
        message: "Số điện thoại hoặc mật khẩu không chính xác.",
      });
    }

    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Số điện thoại hoặc mật khẩu không chính xác.",
      });
    }

    const accessToken = jwt.sign({ _id: user._id }, process.env.SECRET_CODE, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Đăng nhập thành công!",
      accessToken,
    });
  } catch (error) {
    console.error("Lỗi trong quá trình đăng nhập:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ, vui lòng thử lại sau.",
    });
  }
};
