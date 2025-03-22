import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../model/User.js';
import { signInValidator, signUpValidator } from '../Validation/user.js';
dotenv.config();

export const signUp = async (req, res) => {
  try {
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.json({
        message: errors,
      });
    }
    const userExists = await User.findOne({ phone: req.body.phone });
    if (userExists) {
      return res.status(400).json({
        message: 'Tai khoan da ton tai!',
      });
    }
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    user.password = undefined;
    return res.status(200).json({
      message: 'Dang ky account thanh cong!',
      user,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error } = signInValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.findOne({ phone: req.body.phone });
    if (!user) {
      return res.status(400).json({
        message: 'email nay chưa được đăng ký',
      });
    }
    const isMatch = await bcryptjs.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'mat khau khong dung',
      });
    }
    const accessToken = jwt.sign({ _id: user._id }, process.env.SECRET_CODE, {
      expiresIn: '1h',
    });
    user.password = undefined;
    return res.status(200).json({
      message: 'Dang nhap thanh cong',
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
