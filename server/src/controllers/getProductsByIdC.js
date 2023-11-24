const { Products, Review } = require('../db');

const getProductsByIdC = async (id) => {
    try {
        if (!isNaN(id)) {
            id = Number(id);
        }
        const productById = await Products.findByPk(id, {
            include: Review
        });

        if (!productById){
            throw new Error('No products were found');
        }

        return productById;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getProductsByIdC
}