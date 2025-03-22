import User from '../model/User.js';

export const getAll = async (req, res) => {
  try {
    const user = (await User.find()).map(({ name, phone, role }) => ({ name, phone, role }));

    return res.status(200).json({
      user,
    });
  } catch (e) {
    return res.json({
      message: 'Error fetching products:',
      error: e.error,
    });
  }
};
