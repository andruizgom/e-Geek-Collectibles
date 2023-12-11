const { Users } = require('../db');

const getAllUsersC = async (req) => {
  try {
    const users = await Users.findAll({
      order: [['email', 'ASC']], 
    });

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUsersC,
};
