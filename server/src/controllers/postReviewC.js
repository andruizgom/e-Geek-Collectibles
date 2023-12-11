const axios = require("axios");
const { Products, Review, Users} = require("../db");

const postReviewC = async (content, score, productId, usersId) => {

    try {  
                
  
             
        const newReview = await Review.create({ content, score});     
        const product = await Products.findByPk(productId);
        const users = await Users.findOne({ where: { email: usersId } });
        //const users = await Users.findByPk(usersId);
        
        
       
        
        if (!product) {
            throw new Error('Producto no encontrado');
        }

       
        if (!users) {
            throw new Error('usuario no encontrado');
        }
       
           
        await product.addReview(newReview);
        await users.addReview(newReview);
        
       
        
        return newReview;
    } catch (error) {
       
        throw error;
    }
};

module.exports = {
    postReviewC
}