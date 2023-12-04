const axios = require("axios");
const { Products, Review, Users } = require("../db");

const postReviewC = async (content, score, productId, userId) => {
    try {        
        const newReview = await Review.create({ content, score});     
        const product = await Products.findByPk(productId);
        const user = await User.findByPk(userId);
        
        if (!product) {
            throw new Error('Producto no encontrado');
        }

        if (!user) {
            throw new Error('Usuario no encontrado');
          }
           
        await product.addReview(newReview);
        await user.addReview(newReview);
        
        return newReview;
    } catch (error) {
       
        throw error;
    }
};

module.exports = {
    postReviewC
}