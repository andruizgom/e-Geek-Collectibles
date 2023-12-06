const { postCartC } = require("../controllers/postCartC");

const postCartH = async (req, res) => {
  postCartC(req)
    .then((productInCart) => res.status(200).json(productInCart))
    .catch((error) => res.status(500).json(error.message));
};

module.exports = {
  postCartH,
};
