const { createProduct } = require('../controllers/createProduct.js');

const postCreateProductH = async(req, res) => {
    createProduct(req)
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    postCreateProductH
}