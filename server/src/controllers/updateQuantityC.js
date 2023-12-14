const { Users, Products, Cart } = require("../db");

const updateQuantityC = async (req) => {
  try {
    const { email, id, quantity } = req.body;

    if (!email || !id || !quantity) {
      throw new Error("Incomplete data");
    }

    const user = await Users.findOne({
      where: { email },
      include: {
        model: Products,
        through: { model: Cart },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const productInCart = user.Products.find(
      (product) => product.id === Number(id)
    );

    if (!productInCart) {
      throw new Error("Product not found in the user's cart");
    }

    // Actualizar la cantidad en el carrito
    await Cart.update(
      { quantity },
      {
        where: {
          userId: user.id,
          productId: productInCart.id,
        },
      }
    );

    // Recuperar el usuario actualizado con el carrito
    const updatedUser = await Users.findOne({
      where: { email },
      include: {
        model: Products,
        through: { model: Cart },
      },
    });

    return updatedUser
  } catch (error) {
    console.error(
      "Error en el controlador de actualización de cantidad:",
      error
    );
  }
};

module.exports = {
  updateQuantityC,
};
