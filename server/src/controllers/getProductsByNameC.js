const { Products } = require('../db');
const { Op } = require('sequelize');


const getProductsByNameC = async (name) => {

    try {
        const productsByName = await Products.findAll({
            where: {
                title: { [Op.iLike]: `%${name}%` }
            }
        });

        return productsByName;


    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getProductsByNameC
}