const { deleteFavoritesC } = require('../controllers/deleteFavoritesC');

const deleteFavoritesH = async(req, res) => {
    deleteFavoritesC(req)
    .then((favorites) => res.status(200).json(favorites))
    .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    deleteFavoritesH
}