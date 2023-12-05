const { Users } = require("../db");

const updateUserC = async (req) => {
  try {
    const { email, isBanned, isAdmin, cart } = req.body;

    if (!email) throw new Error("Incomplete data");

    const currentUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }
    // Recorre cada elemento en el array cart que está en la base de datos
    for (let i = 0; i < currentUser.cart.length; i++) {
      const existingCartItem = currentUser.cart[i];
      const matchingCartItem = cart.find(item => item.id === existingCartItem.id);

      // Si el elemento existente no se encuentra en el nuevo array, elimínalo
      if (!matchingCartItem) {
        currentUser.cart.splice(i, 1);
        await currentUser.save();
        i--; // Ajusta el índice después de eliminar un elemento
      }
    }

    // Ahora, actualiza o agrega los elementos del nuevo array como antes
    for (const cartItem of cart) {
      const productId = cartItem.id;
      const cartItemIndex = currentUser.cart.findIndex(item => item.id === productId);

      if (cartItemIndex !== -1) {
        if (currentUser.cart[cartItemIndex].quantity !== cartItem.quantity) {
          currentUser.cart[cartItemIndex].quantity = cartItem.quantity;
          await currentUser.save();
        }
      } else {
        currentUser.cart.push(cartItem);
        await currentUser.save();
      }
    }

    const userUpdated = await Users.update(
      {
        isBanned: isBanned !== null ? isBanned : currentUser.isBanned,
        isAdmin: isAdmin !== null ? isAdmin : currentUser.isAdmin,
        cart: currentUser.cart,
      },
      {
        where: {
          email: email,
        },
      }
    );

    return userUpdated;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  updateUserC,
};
