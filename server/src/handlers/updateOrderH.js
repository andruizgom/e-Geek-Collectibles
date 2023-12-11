const { updateOrderC } = require('../controllers/updateOrderC');

const updateOrderH = async (req, res) => {
    updateOrderC(req)
        .then((order) => res.status(200).json(order))
        .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    updateOrderH
}