const { Users, Products } = require('../db');

const deleteFavoritesC = async (req) => {

    try {
        // email usuario e id producto 
        const { email, id } = req.body;

        if (!email || !id) throw new Error('Incomplete data');

        const user = await Users.findOne({
			where: {
				email: email,
			},
		});

        if (!user) throw new Error('User not found');

        await user.removeProducts(id);
        
        const favorites = await Users.findOne({
            where: {
                email: email,
            },
            include: {
                model: Products,
                
            },
        });
        

        return favorites;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    deleteFavoritesC
}