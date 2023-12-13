const { Orders } = require("../db");
const { ordersFilters } = require("./Filters/ordersFilters");

const getAllOrdersC = async (req) => {
  try {
    console.log("front");
    const { page, pageSize = 10, state, createdDate } = req.query;
    const offset = (page - 1) * pageSize;
    const orders = await ordersFilters(state, createdDate, pageSize, offset);
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllOrdersC,
};
