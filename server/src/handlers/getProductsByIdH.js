const { getProductsByIdC } = require('../controllers/getProductsByIdC')

const getProductsByIdH = async (req, res) => {

  let { id } = req.params;
  
  getProductsByIdC(id)
    .then((product) => res.status(200).json(product))
    .catch((error) => res.status(500).json(error.message));

}

module.exports = {
    getProductsByIdH
}