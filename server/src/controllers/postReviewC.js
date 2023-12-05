const axios = require("axios");
const { Products, Review } = require("../db");

const postReviewC = async (content, score, productId) => {
    try {        
        const newReview = await Review.create({ content, score});     
        const product = await Products.findByPk(productId);
       
        
        if (!product) {
            throw new Error('Producto no encontrado');
        }

       
           
        await product.addReview(newReview);
       
        
        return newReview;
    } catch (error) {
       
        throw error;
    }
};

module.exports = {
    postReviewC
}