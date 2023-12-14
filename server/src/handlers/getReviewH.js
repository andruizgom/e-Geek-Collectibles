const { getAllReviewC, getUserReviewsC } = require("../controllers/getAllReviewC");
const { Products } = require("../db");


const getReviewH = async (req, res) => {

    try {
        const allReview = await getAllReviewC({ include: Products }); 
        return res.status(200).json(allReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserReviewsH = async (req, res) => {
    try {
        const usersId = req.params.usersId;
        const userReviews = await getUserReviewsC(usersId);
        res.status(200).json(userReviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getReviewH,
    getUserReviewsH
}