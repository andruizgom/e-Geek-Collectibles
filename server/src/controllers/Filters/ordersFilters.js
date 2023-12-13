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
      console.log("3");
    }

    if (createdDate && state !== "All states") {
      const orders = await Orders.findAll({
        order: [["email", "ASC"]],
        limit: parseInt(pageSize),
        offset: parseInt(offset),
        where: filter,
      });

      filteredOrders = orders.filter(
        ({ creationDate }) => createdDate === creationDate
      );
      console.log("2");

      return filteredOrders;
    }

    if (state === "All states" && createdDate) {
      const orders = await Orders.findAll({
        order: [["email", "ASC"]],
        limit: parseInt(pageSize),
        offset: parseInt(offset),
      });
      console.log(createdDate);
      filteredOrders = orders.filter(
        ({ creationDate }) => createdDate == creationDate
      );
      console.log("1");
      return filteredOrders;
    }

    if (state === "All states") {
      const orders = await Orders.findAll({
        order: [["email", "ASC"]],
        limit: parseInt(pageSize),
        offset: parseInt(offset),
      });
      console.log("4");
      return orders;
    }

    if (state) {
      const orders = await Orders.findAll({
        order: [["email", "ASC"]],
        limit: parseInt(pageSize),
        offset: parseInt(offset),
        where: filter,
      });
      console.log("5");
      return orders;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  ordersFilters,
};
