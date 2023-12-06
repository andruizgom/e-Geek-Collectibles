const { getCartC } = require("../controllers/getCartC");

const getCartH = async (req, res) => {
  getCartC(req)
    .then((cart) => res.status(200).json(cart))
    .catch((error) => res.status(500).json(error.message));
};

module.exports = {
  getCartH,
};
