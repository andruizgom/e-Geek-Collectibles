const { postReviewC } = require('../controllers/postReviewC')

const postReviewH = async (req, res) => {
    
    postReviewC(req)
    .then((review) => res.status(200).json(review))
    .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    postReviewH
}