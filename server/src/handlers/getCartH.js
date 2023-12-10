const { getCartC } = require("../controllers/getCartC");

const getCartH = async (req, res) => {
  const { email } = req.query;
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    const cart = await getCartC(email);
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al obtener el carrito. " + error.message });
  }
};

module.exports = {
  getCartH,
};
