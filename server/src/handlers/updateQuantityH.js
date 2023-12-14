const { updateQuantityC } = require("../controllers/updateQuantityC");

const updateQuantityH = async (req, res) => {
  console.log(req.body);
  try {
    const updateCart = await updateQuantityC(req);
    res.status(200).send(updateCart);
  } catch (error) {
    res.status(400).json({
      error: "Error al actualizar el producto del carrito: " + error.message,
    });
  }
};

module.exports = {
  updateQuantityH,
};
