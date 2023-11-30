const axios = require("axios");
const { Products, Review } = require("../db");


const getAllReviewC = async () => {

    const review = await Review.findAll({
        include: {
            model: Products,
        }
    })

    return review;
};



module.exports = {
    getAllReviewC
}