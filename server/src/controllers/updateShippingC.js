const { Users } = require("../db");

const updateShippingC = async (req, res) => {
  try {
    const { email, shippingInfo } = req.body;

    if (!email || !shippingInfo) {
      return res.status(400).json({
        error: "Se requiere el correo electrónico y la información de envío.",
      });
    }

    const [updatedRowsCount] = await Users.update(
      {
        address: shippingInfo.address || Users.address,
        country: shippingInfo.country || Users.country,
        phone: shippingInfo.phone || Users.phone,
        city: shippingInfo.city || Users.city,
        name: shippingInfo.name || Users.name,
      },
      { where: { email } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const updatedUser = await Users.findOne({ where: { email } });

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Error del servidor");
  }
};
module.exports = {
  updateShippingC,
};
