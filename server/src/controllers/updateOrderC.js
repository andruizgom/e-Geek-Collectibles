const { Orders } = require("../db");
const { transporter } = require("../email/mailConfig");

const updateOrderC = async (req) => {
  try {
    console.log(req.body);
    const { id, state, email, product_name } = req.body;

    if (!state || !id) throw new Error("Incomplete data");

    const currentOrder = await Orders.findOne({
      where: {
        id: id,
      },
    });

    if (!currentOrder) {
      throw new Error("Order not found");
    }

    const orderUpdated = await Orders.update(
      {
        state: state ? state : currentOrder.state,
      },
      {
        where: {
          id: id,
        },
      }
    );
if (state === "On the way") {
      try {
        await transporter.sendMail({
          from: '"e-Geek Collectibles" <pfhenry8@gmail.com>',
          to: email,
          subject: "Bienvenido e-Geek Collectibles",
          html: `<h2>Felicitaciones ${email} tu pedido ${product_name} se encuentra en camino!! Espero lo disfrutes y no te olvides de dejarnos tu reseña!☺</h2>`,
        });
      } catch (error) {
        console.error(error.message);
      }
    }
    return orderUpdated;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  updateOrderC,
};
