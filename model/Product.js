import mongoose from 'mongoose';
const productSchema = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    title: {
      type: String,
    },
    price: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export default mongoose.model('Product', productSchema, 'Product');
