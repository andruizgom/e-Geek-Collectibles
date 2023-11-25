const { Users } = require('../db');

const postUserC = async (req) => {
	const { name, email, password, isBanned, isAdmin } = req.body;

	if (!name || !email) {
		throw new Error("Name and email are required");
	}

	try {
		
		const existingUser = await Users.findOne({
			where: {
				email: email,
			},
		});

		if (existingUser) {
			throw new Error("User already exists");
		}
		
		const newUser = await Users.create({
			name: name,
			email: email,
			password: password,
			isBanned,
			isAdmin,
		});

		return newUser;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	postUserC,
};
