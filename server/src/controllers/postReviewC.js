const { Review, Products } = require('../db');

const postReviewC = async (req) => {

    try {
        const { content, score, id } = req.body;

        if (!content || !score || !id) throw new Error('Incomplete data for review');

        const newReview = await Review.create({ content, score });

        await newReview.addProducts(id);
        
        return newReview;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    postReviewC
}