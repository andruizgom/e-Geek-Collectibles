const { Users, Products, Cart } = require("../db");

const deleteCartC = async (req) => {
  try {
    const { email, id, all } = req.body;
    if (!email) throw new Error("Incomplete data");
    const user = await Users.findOne({
      where: { email },
      include: {
        model: Products,
        through: { model: Cart },
      },
    });
    if (!user) throw new Error("User not found");
    if (all) {
      await Cart.destroy({
        where: {
          userId: user.id,
        },
      });
    } else {
      const productInCart = user.Products.find(
        (product) => product.id === Number(id)
      );
      await Cart.destroy({
        where: {
          userId: user.id,
          productId: productInCart.id,
        },
      });
    }
    const updatedUser = await Users.findOne({
      where: { email },
      include: {
        model: Products,
        through: { model: Cart },
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  deleteCartC,
};
