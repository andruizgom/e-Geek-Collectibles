const { Users, Products, Cart } = require("../db");

const getCartC = async (email) => {
  try {
    if (!email) throw new Error("Incomplete data");
    const cart = await Users.findOne({
      where: { email },
      include: {
        model: Products,
        through: { model: Cart },
      },
    });
    if (!cart) throw new Error("User not found");
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getCartC,
};
