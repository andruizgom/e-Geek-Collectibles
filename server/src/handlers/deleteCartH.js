const { deleteCartC } = require("../controllers/deleteCartC");

const deleteCartH = async (req, res) => {
  deleteCartC(req)
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error.message));
};

module.exports = {
  deleteCartH,
};
