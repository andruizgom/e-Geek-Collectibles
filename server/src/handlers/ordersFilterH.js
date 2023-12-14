const { ordersFilters } = require("../controllers/Filters/ordersFilters");

const getFilteredOrdersHandler = async (req, res) => {
  try {
    // Obtener opciones de filtro desde la solicitud
    const { state, createdDate } = req.query;
    console.log("user", createdDate);

    // Llamar al controlador para obtener las órdenes filtradas
    const filteredOrders = await ordersFilters({ state, createdDate });

    // Enviar las órdenes filtradas como respuesta
    res.status(200).json(filteredOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFilteredOrdersHandler,
};
