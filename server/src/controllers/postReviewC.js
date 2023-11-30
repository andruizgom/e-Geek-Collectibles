const axios = require("axios");
const { Products, Review } = require("../db");

const postReviewC = async (content, score, productId) => {

    const newReview = await Review.create({ content, score, productId });

    const product = await Products.findByPk(productId);

    await newReview.setProduct(product);

    return newReview;
};





module.exports = {
    postReviewC
}