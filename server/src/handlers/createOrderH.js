const { createOrderC } = require('../controllers/createOrderC.js');

const createOrderH = async(req, res) => {
    createOrderC(req)
    .then((order) => res.status(200).json(order))
    .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    createOrderH
}