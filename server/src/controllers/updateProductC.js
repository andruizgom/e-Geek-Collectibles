const { Users, Products } = require("../db");
const { transporter } = require("../email/mailConfig");

const updateProducts = async (req) => {
  try {
    const { id } = req.params;
    const {
      category,
      description,
      available,
      price,
      stock,
      author,
      manufacturer,
      title,
      image,
    } = req.body;
    const notFound = "Product not found";

    const [rowsUpdated, [updatedProduct]] = await Products.update(
      {
        price,
        available,
        stock,
        image,
        author,
        available,
        description,
        category,
        title,
        manufacturer,
      },
      {
        returning: true,
        where: { id: Number(id) },
      }
    );

    if (rowsUpdated === 0) return { notFound, isProduct: false };

    if (updatedProduct.stock !== stock) {
      // Buscar todos los usuarios que tienen este producto en favoritos
      const usersWithFavoriteProduct = await Users.findAll({
        include: {
          model: Products,
          where: { id: updatedProduct.id },
        },
      });

      const usersToUpdate = usersWithFavoriteProduct.map((user) => user.email);
      try {
        await Promise.all(
          usersToUpdate.map(async (email) => {
            await transporter.sendMail({
              from: '"e-Geek Collectibles" <pfhenry8@gmail.com>',
              to: email,
              subject: `¡Producto Favorito Disponible! 🎉`,
              html: `<h3>Hey ${email}, el producto ${title} que tanto te gusta ya está disponible en nuestra web. ¡No dudes en adquirirlo!</h3>`,
            });
          })
        );
      } catch (error) {
        console.error(
          "Error al enviar los correos electrónicos:",
          error.message
        );
      }
    }

    return { message: "product updated", isProduct: true, updatedProduct };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  updateProducts,
};
