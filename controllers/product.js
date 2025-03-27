import Product from "../model/Product.js";

export const getProducts = async (req, res) => {
  try {
    const limit = 9;
    const lastId = req.query.lastId;

    let query = {};
    if (lastId) {
      query = { _id: { $gt: lastId } };
    }

    const products = await Product.find(query).limit(limit);

    return res.status(200).json({ products });
  } catch (e) {
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách sản phẩm",
      error: e.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    return res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy sản phẩm", error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, price } = req.body;
    if (!title || !price || isNaN(price) || price <= 0) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập tiêu đề và giá hợp lệ" });
    }

    const newProduct = new Product({
      title,
      price,
      imageData: req.file?.buffer || null,
      contentType: req.file?.mimetype || null,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Lỗi khi tạo sản phẩm", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, price } = req.body;
    if (
      (price && (isNaN(price) || price <= 0)) ||
      (!title && !price && !req.file)
    ) {
      return res
        .status(400)
        .json({ message: "Thông tin sản phẩm không hợp lệ" });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (price) updateData.price = price;
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
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json(updatedProduct);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Lỗi khi cập nhật sản phẩm", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    await product.deleteOne();
    return res.json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa sản phẩm", error: err.message });
  }
};
