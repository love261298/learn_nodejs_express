import Product from "../model/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(9);
    return res.status(200).json({
      products,
    });
  } catch (e) {
    return res.json({
      message: "Error fetching products:",
      error: e.error,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, price } = req.body;
    const imageData = req.file ? req.file.buffer : null;
    const contentType = req.file ? req.file.mimetype : null;

    const newProduct = new Product({
      title,
      price,
      imageData,
      contentType,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, price } = req.body;
    const updateData = { title, price };

    if (req.file) {
      updateData.imageData = req.file.buffer;
      updateData.contentType = req.file.mimetype;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json("xóa sản phảm thành công");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
