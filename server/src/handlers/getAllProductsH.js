const { getAllProductsC } = require('../controllers/getAllProductsC')

const getAllProductsH = async (req, res) => {

    getAllProductsC()
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(500).json(error.message));
};

module.exports = {
    getAllProductsH
}