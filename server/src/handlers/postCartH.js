const { postCartC } = require("../controllers/postCartC");

const postCartH = async (req, res) => {
  console.log("Este es el req.body ", req.body);
  console.log(req.body.id);
  try {
    const newCart = await postCartC(req);
    res.status(200).json(newCart);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al postear un nuevo producto. " + error.message });
  }
};

module.exports = {
  postCartH,
};
