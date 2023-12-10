const { Users } = require('../db');

const postUserC = async (req) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error('Datos incompletos');
    }

    const [user, created] = await Users.findOrCreate({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  postUserC,
};


