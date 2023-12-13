const { postReviewC } = require('../controllers/postReviewC')

const postReviewH = async (req, res) => {
    try {
        const { content, score, productId, usersId} = req.body

        const response = await postReviewC(content, score, productId, usersId);
        
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    postReviewH
}