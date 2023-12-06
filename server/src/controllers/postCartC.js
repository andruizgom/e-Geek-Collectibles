const { Users, Products, Cart } = require("../db");

const postCartC = async (req) => {
  try {
    const { email, id, quantity } = req.body;
    if (!email || !id || !quantity) throw new Error("Incomplete data");
    const [user, createdUser] = await Users.findOrCreate({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    const product = await Products.findByPk(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    const [cartEntry, createdCart] = await Cart.findOrCreate({
      where: {
        userId: user.id,
        productId: product.id,
      },
      defaults: {
        quantity: quantity,
      },
    });
    if (!createdCart) {
      cartEntry.quantity = quantity;
      await cartEntry.save();
    }
    const productInCart = await Users.findOne({
      where: { email: email },
      include: {
        model: Products,
        through: { model: Cart, attributes: ["quantity"] },
      },
    });
    return productInCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  postCartC,
};
