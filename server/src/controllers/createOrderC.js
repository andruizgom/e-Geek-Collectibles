const { Orders } = require("../db.js");

const createOrderC = async (req) => {
  try {
    const { email, carrito } = req.body;

    if (!email || !carrito) throw new Error("Incomplete data");

    const items = carrito.map(({ id, title, price, quantity }) => ({
      product_id: id,
      product_name: title,
      price,
      quantity,
      email,
    }));

    const order = await Orders.bulkCreate(items);

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createOrderC,
};
