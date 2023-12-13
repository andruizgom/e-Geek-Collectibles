const axios = require("axios");
const { Products, Review, Users } = require("../db");

const getAllReviewC = async () => {

    const review = await Review.findAll({
        include: {
            model: Products,
        }
    })

    return review;
};

const getUserReviewsC = async (usersId) => {
    try {
        const userReviews = await Review.findAll({
            include: {
                model: Users,
                where: { id: usersId }
            }
        });

        return userReviews;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllReviewC,
    getUserReviewsC
}