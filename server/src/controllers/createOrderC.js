const { Orders } = require("../db.js");
const { transporter } = require("../mail/mailConfig");

const createOrderC = async (req) => {
  try {
    const { email, carrito } = req.body;

    if (!email || !carrito) throw new Error("Incomplete data");

    const items = carrito.map((obj) => {
      const { title, price, quantity, id } = obj;

      return {
        product_name: title,
        product_id: id,
        price,
        quantity,
        email,
      };
    });

    const order = await Orders.bulkCreate(items);

    try {
      // Obtén los detalles de la orden recién creada
      const orderDetails = await order
        .map(
          (item) =>
            `Producto: ${item.product_name}, Cantidad: ${item.quantity}, Precio: ${item.price}`
        )
        .join("<br>");

      await transporter.sendMail({
        from: '"e-Geek Collectibles" <pfhenry8@gmail.com>',
        to: email,
        subject: `Compra realizada con éxito!🥳`,
        html: `<h3>Felicitaciones por tu compra!!🤩</h3><br><h4>Aqui están los detalles de tu orden:</h4><br>${orderDetails}`,
      });
    } catch (error) {
      // Maneja el error al enviar el correo electrónico
      console.error("Error al enviar el correo electrónico:", error.message);
    }

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createOrderC,
};
