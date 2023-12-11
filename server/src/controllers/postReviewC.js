const axios = require("axios");
const { Products, Review, Users, Orders} = require("../db");

const postReviewC = async (content, score, productId, usersId) => {

    try {  
                
  
             
            
        const product = await Products.findByPk(productId);
        const users = await Users.findOne({ where: { email: usersId } });
        //const users = await Users.findByPk(usersId);
        
        
       
        
        if (!product) {
            throw new Error('Producto no encontrado');
        }

       
        if (!users) {
            throw new Error('usuario no encontrado');
        }
        const order = await Orders.findOne({
            where: {
                product_id: productId,
                email: usersId,
                
                
            }
        });
        console.log(order)

        if (!order || order.state !== "Accepted") {
            throw new Error('No se encontró una orden para el producto y el usuario');
        }

        

        // Puedes acceder al estado de la orden con order.state
        console.log('Estado de la orden:', order.state);

        

        // if (order.email === usersId) {
        //     throw new Error('Ya existe una revisión para esta orden');
        // }
           
        
        
        const newReview = await Review.create({ content, score}); 
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