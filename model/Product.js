import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    imageData: Buffer,
    contentType: String,
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Product", productSchema, "Product");
