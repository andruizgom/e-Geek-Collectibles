const { getFavoritesC } = require('../controllers/getFavoritesC');

const getFavoritesH = async(req, res) => {
    getFavoritesC(req)
    .then((favorites) => res.status(200).json(favorites))
    .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    getFavoritesH
}