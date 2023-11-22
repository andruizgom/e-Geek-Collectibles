const { getProductsByNameC } = require('../controllers/getProductsByNameC')

const getProductsByNameH = async (req, res) => {

    const { name } = req.query;
    
    getProductsByNameC(name)
        .then((products) => res.status(200).json(products))
        .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    getProductsByNameH
}