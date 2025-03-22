import User from "../model/User.js";

export const getAll = async (req, res) => {
  try {
    const user = (await User.find()).map(({ name, phone, role }) => ({
      name,
      phone,
      role,
    }));
    return res.status(200).json({
      user,
    });
  } catch (e) {
    return res.json({
      message: "Error fetching products:",
      error: e.error,
    });
  }
};

export const changeRole = async (req, res) => {
  try {
    if (req.body.role != "admin" && req.body.role != "user")
      return res.json({
        message: "Role khong hop le",
      });
    const user = await User.findOneAndUpdate(
      { phone: req.body.phone },
      { role: req.body.role },
      {
        new: true,
      }
    );
    return res.status(200).json({
      phone: user.phone,
      name: user.name,
      role: user.role,
    });
  } catch (e) {
    return res.json({
      message: "Error fetching products:",
      error: e.error,
    });
  }
};

export const deletteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json("xóa sản user thành công");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
