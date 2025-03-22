import Product from '../model/Product';

export const getAll = async (req, res) => {
  try {
    const products = await Product.find().limit(9);
    return res.status(200).json({
      products,
    });
  } catch (e) {
    return res.json({
      message: 'Error fetching products:',
      error: e.error,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ product });
  } catch (e) {
    return res.status(500).json({
      message: 'Error fetching product',
      error: e.message,
    });
  }
};
