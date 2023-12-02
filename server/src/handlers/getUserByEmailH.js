const { getUserByEmailC } = require('../controllers/getUserByEmailC');

const getUserByEmailH = async(req, res) => {
    getUserByEmailC(req)
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    getUserByEmailH
}