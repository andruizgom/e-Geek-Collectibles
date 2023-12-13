const { Orders } = require("../db.js");
const { transporter } = require("../email/mailConfig");

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
      await transporter.sendMail({
        from: '"e-Geek Collectibles" <pfhenry8@gmail.com>',
        to: email,
        subject: `Compra realizada con éxito!🥳`,
        html: await order
          .map(
            (item) =>
              `Felicitaciones por tu compra!! En breve podrás recibir tu producto ☺! No dude en chequear tu cuenta para ver el estado de tu pedido. <br><br> Producto: ${item.product_name}, Cantidad: ${item.quantity}, Precio unitario: $ ${item.price}`
          )
          .join("<br>"),
      });
    } catch (error) {
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
