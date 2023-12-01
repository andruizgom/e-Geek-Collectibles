const axios = require("axios");
const { Products, Review } = require("../db");

const postReviewC = async (content, score, productId) => {
    try {
        // Crear la nueva reseña
        const newReview = await Review.create({ content, score });

        // Encontrar el producto
        const product = await Products.findByPk(productId);
        if (!product) {
            throw new Error('Producto no encontrado');
        }

        // Asociar la reseña con el producto
        await product.addReview(newReview);

        return newReview;
    } catch (error) {
        // Manejar el error adecuadamente
        throw error;
    }
};






module.exports = {
    postReviewC
}