import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/User.js";
dotenv.config();

if (!process.env.SECRET_CODE) {
  throw new Error("SECRET_CODE không được định nghĩa trong .env");
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token không hợp lệ." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn." });
  }
};

export default verifyToken;
