const { Products } = require('../db.js');

const createProduct = async(req) => {
    try {
        const { title, manufacturer, author, stock, price, image, available, description, category } = req.body;

        if(!title || !manufacturer || !author || !stock || !price || !image || !available || !description || !category){
            throw new Error ('All fields are required');
        };

        const productCreated = await Products.create({
            title,
            manufacturer,
            author,
            stock,
            price,
            image,
            available,
            description,
            category
        })
        
        return productCreated;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createProduct
}