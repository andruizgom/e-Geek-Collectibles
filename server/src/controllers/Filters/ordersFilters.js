const { Orders } = require("../../db");

const ordersFilters = async (filterOptions) => {
  try {
    const { state, createdDate } = filterOptions;

    // Construir el objeto de filtro para la consulta
    const filter = {};
    let filteredOrders;

    if (state && state !== "All states") {
      filter.state = state;
    }

    if (createdDate) {
      const filteredOrdersDate = await Orders.findAll({
        where: filter,
      });

      filteredOrders = filteredOrdersDate.filter(
        ({ creationDate }) => createdDate == creationDate
      );
      return filteredOrders;
    }

    filteredOrders = await Orders.findAll({
      where: filter,
    });

    return filteredOrders;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  ordersFilters,
};
