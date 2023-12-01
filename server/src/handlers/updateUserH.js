const { updateUserC } = require('../controllers/updateUserC');

const updateUserH = async (req, res) => {
    updateUserC(req)
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    updateUserH
}