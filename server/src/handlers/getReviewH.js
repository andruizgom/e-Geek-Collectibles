const { getAllReviewC } = require("../controllers/getAllReviewC");
const { Products } = require("../db");


const getReviewH = async (req, res) => {

    try {
        const allReview = await getAllReviewC({ include: Products }); 
        return res.status(200).json(allReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getReviewH
}