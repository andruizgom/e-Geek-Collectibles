const { getAllProductsC } = require('../controllers/getAllProductsC')
const { filterProducts } = require('../controllers/Filters/allFilters');

const getAllProductsH = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    title,
    price,
    category,
    manufacturer,
    sortOrder,
    nameOrder,
  } = req.query;
  if (title || price || category || manufacturer || sortOrder || nameOrder) {
    try {
      const products = await filterProducts(req);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    try {
      const products = await getAllProductsC(page, perPage);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = {
    getAllProductsH,
};
 