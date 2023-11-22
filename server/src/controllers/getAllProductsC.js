const URL = "http://localhost:5000/collectibles";
const axios = require('axios');
const {Products} = require('../db');

const getAllProductsC = async () => {

    try {

        let productsDB = await Products.findAll();

        if (!productsDB.length) {
            const { data } = await axios.get(`${URL}`);
            if(!data)throw new Error('No products were found');

            const apiProducts = data.map((product) =>{

                const {title, manufacturer, author, stock, price, image, available, description, category} = product;

                return {
                    title,
                    manufacturer,
                    author,
                    stock,
                    price,
                    image,
                    available,
                    description,
                    category
                }
            })

            productsDB = await Products.bulkCreate(apiProducts)

            return productsDB;
        }
        return productsDB;

    } catch (error) {
        throw new Error(error.message);
    }

};

module.exports = {
    getAllProductsC
}