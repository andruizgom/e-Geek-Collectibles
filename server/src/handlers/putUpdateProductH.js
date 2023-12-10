const { updateProducts } = require("../controllers/updateProductC.js");

const putUpdateProductH = async (req, res) => {
  try {
    const { isProduct,message,  notFound } = await updateProducts(req);
    if (isProduct) return res.status(200).json(message);
    return res.status(404).json(notFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  putUpdateProductH,
};
