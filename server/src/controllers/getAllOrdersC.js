const { Orders } = require("../db");
const { ordersFilters } = require("./Filters/ordersFilters");

const getAllOrdersC = async (req) => {
  const { page, pageSize = 10, state, createdDate, email } = req.query;
  try {
    if (email) {
      const orders = await Orders.findAll({
        order: [["email", "ASC"]],
      });
      return orders;
    } else {
      const offset = (page - 1) * pageSize;
      const orders = await ordersFilters(state, createdDate, pageSize, offset);
      return orders;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllOrdersC,
};
