import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Player from '../model/Player.js';
import bcryptjs from 'bcryptjs';
dotenv.config();

export const update = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    const prePoint = await Player.findById(decoded._id);
    const hashedPoint = await bcryptjs.hash(prePoint.point, 10);
    const point = await Player.findByIdAndUpdate(
      decoded._id,
      { point: hashedPoint },
      {
        new: true,
      },
    );
    point.password = undefined;
    return res.status(200).send({
      message: 'Cap nhat diem thanh cong',
    });
  } catch (error) {
    return res.send({
      name: error.name,
      message: error.message,
    });
  }
};
