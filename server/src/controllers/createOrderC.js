const { Orders, Users } = require('../db.js');

const createOrderC = async (req) => {
    try {
        const { email, carrito } = req.body;

        if (!email || !carrito) throw new Error('Incomplete data');

        const items = carrito.map((obj) => {
            const { title, price, quantity, id } = obj;

            return {
                product_name: title,
                product_id: id,
                price,
                quantity,
                email,
            };
        });

        const order = await Orders.bulkCreate(items);
        const user = await Users.findOne({email});
        console.log('user', user);
        order.addUser(user);

        return order;
    } catch (error) {
        console.log('se cae');
        throw new Error(error.message);
    }
}

module.exports = {
    createOrderC
}