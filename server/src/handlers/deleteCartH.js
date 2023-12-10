const { deleteCartC } = require("../controllers/deleteCartC");

const deleteCartH = async (req, res) => {
  try {
    const updateCart = await deleteCartC(req);
    res.status(200).send(updateCart);
  } catch (error) {
    res
      .status(400)
      .json({
        error: "Error al borrar el producto del carrito: " + error.message,
      });
  }
};

module.exports = {
  deleteCartH,
};
