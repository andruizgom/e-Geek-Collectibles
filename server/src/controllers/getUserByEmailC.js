const { Users } = require('../db');

const getUserByEmailC = async (req) => {

	try {
		
        const { email } = req.query;

        if (!email) throw new Error('Incomplete data');

        const user = await Users.findOne({
            where: {
                email: email,
            }
        });

		return user;
		
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	getUserByEmailC,
};