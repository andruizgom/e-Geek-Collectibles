const { Users } = require('../db');

const getAllUsersC = async (req) => {

	try {
		
        const users = await Users.findAll();

		return users;
		
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	getAllUsersC,
};