const { Users, Products } = require('../db');

const getFavoritesC = async (req) => {

    try {
        const { email } = req.query;
        
        if (!email ) throw new Error('Incomplete data');               
        
        const favorites = await Users.findOne({
            where: {
                email: email,
            },
            include: {
                model: Products,
                
            },
        });
        
        if (!favorites) throw new Error('User not found');

        return favorites;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getFavoritesC
}