const { Users, Products } = require('../db');

const getShippingC = async (req) => {

    try {
        const { email } = req.query;
        
        if (!email ) throw new Error('Incomplete data');               
        
        const userInfo = await Users.findOne({
            where: {
                email: email,
            },
            include: {
                model: Products,
                
            },
        });
        
        if (!userInfo) throw new Error('User not found');

        return userInfo;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getShippingC
}