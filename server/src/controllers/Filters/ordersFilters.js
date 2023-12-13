const { Orders } = require("../../db");

const ordersFilters = async (state, createdDate, pageSize, offset) => {
  try {
    // if (!state && !createdDate) {
    //   return [];
    // }

    const filter = {};
    let filteredOrders;

    if (state && state !== "All states") {
      filter.state = state;
    }

    if (createdDate) {
      const orders = await Orders.findAll({
        order: [["email", "ASC"]],
        limit: parseInt(pageSize),
        offset: parseInt(offset),
        where: filter,
      });

      filteredOrders = orders.filter(
        ({ creationDate }) => createdDate == creationDate
      );

      return filteredOrders;
    }

    if (state === "All states" && createdDate) {
      const orders = await Orders.findAll({
        order: [["email", "ASC"]],
        limit: parseInt(pageSize),
        offset: parseInt(offset),
      });

      filteredOrders = orders.filter(
        ({ creationDate }) => createdDate == creationDate
      );
      return filteredOrders;
    }

    if (state === "All states") {
      const orders = await Orders.findAll({
        order: [["email", "ASC"]],
        limit: parseInt(pageSize),
        offset: parseInt(offset),
      });
      return orders;
    }

    if (state) {
      const orders = await Orders.findAll({
        order: [["email", "ASC"]],
        limit: parseInt(pageSize),
        offset: parseInt(offset),
        where: filter,
      });
      return orders;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  ordersFilters,
};
