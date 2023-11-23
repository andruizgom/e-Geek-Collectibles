const { getAllProductsC } = require('../controllers/getAllProductsC')

const getAllProductsH = async (req, res) => {
    const { page = 1, perPage = 10 } = req.query;

    try {
        const products = await getAllProductsC(page, perPage);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProductsH,
};