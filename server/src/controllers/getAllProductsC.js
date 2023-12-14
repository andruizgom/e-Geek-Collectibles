const URL = "http://localhost:5000/collectibles";
const axios = require('axios');
const {Products} = require('../db');

const getAllProductsC = async (page = 1, perPage = 10) => {
    try {
        if (page === 'all') {
            // Si se proporciona 'all', obtener todos los productos
            const allProducts = await Products.findAll();
            console.log('Productos obtenidos de la base de datos:', allProducts.length);
            return allProducts;
        }

        // Calcular el índice de inicio y fin para la paginación
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        // Obtener la cantidad total de productos en la base de datos
        const totalProductsCount = await Products.count();

        if (totalProductsCount === 0) {
            // Si la base de datos está vacía, obtener productos de la API externa
            const { data } = await axios.get(URL);

            if (!data) throw new Error('No products were found');
            console.log('Productos obtenidos de la API externa:', data.length);

            const apiProducts = data.map((product) => {
                const { title, manufacturer, author, stock, price, image, available, description, category } = product;

                return {
                    title,
                    manufacturer,
                    author,
                    stock,
                    price,
                    image,
                    available,
                    description,
                    category,
                };
            });

            // Insertar productos en la base de datos
            const insertedProducts = await Products.bulkCreate(apiProducts);
            console.log('Productos insertados en la base de datos:', insertedProducts.length);
            return insertedProducts.slice(startIndex, endIndex);
        }

        // Obtener productos paginados desde la base de datos
        const productsDB = await Products.findAll({
            offset: startIndex,
            limit: perPage,
        });
        console.log('Productos obtenidos de la base de datos (paginados):', productsDB.length);
        return productsDB;
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {
    getAllProductsC
}