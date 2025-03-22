import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

export default mongoose.model('User', userSchema, 'User');
