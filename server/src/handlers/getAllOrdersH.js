const { getAllOrdersC } = require('../controllers/getAllOrdersC');

const getAllOrdersH = async (req, res) => {
    getAllOrdersC(req)
        .then((orders) => res.status(200).json(orders))
        .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    getAllOrdersH
}