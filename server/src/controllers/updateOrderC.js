const { Orders } = require('../db');

const updateOrderC = async (req) => {

    try {

        const { id, state } = req.body;

        if (!state || !id) throw new Error('Incomplete data');

        const currentOrder = await Orders.findOne({
            where: {
                id: id,
            },
        });

        if (!currentOrder) {
            throw new Error('Order not found');
        }        

        const orderUpdated = await Orders.update(
            {
                state: state? state : currentOrder.state
                
            },
            {
                where: {
                    id: id,
                },
            });

        return orderUpdated;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    updateOrderC,
};