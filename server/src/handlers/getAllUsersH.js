const { getAllUsersC } = require('../controllers/getAllUsersC');

const getAllUsersH = async (req, res) => {
    getAllUsersC(req)
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    getAllUsersH
}