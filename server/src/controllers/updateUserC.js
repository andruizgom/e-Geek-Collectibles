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

    const userUpdated = await Users.update(
      {
        isBanned: isBanned !== null ? isBanned : currentUser.isBanned,
        isAdmin: isAdmin !== null ? isAdmin : currentUser.isAdmin,
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
