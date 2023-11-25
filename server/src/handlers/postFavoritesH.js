const { postFavoritesC } = require('../controllers/postFavoritesC');

const postFavoritesH = async(req, res) => {
    postFavoritesC(req)
    .then((favorites) => res.status(200).json(favorites))
    .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    postFavoritesH
}