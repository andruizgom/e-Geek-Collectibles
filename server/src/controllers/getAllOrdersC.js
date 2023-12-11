const { Orders } = require('../db');

const getAllOrdersC = async (req) => {
  try {
    const orders = await Orders.findAll({
      order: [['email', 'ASC']], 
    });

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllOrdersC,
};
