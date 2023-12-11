const { getShippingC } = require('../controllers/getShippingC');

const getShippingH = async(req, res) => {
    getShippingC(req)
    .then((userInfo) => res.status(200).json(userInfo))
    .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    getShippingH
}