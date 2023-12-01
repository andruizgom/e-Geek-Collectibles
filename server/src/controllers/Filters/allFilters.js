const {Op} = require('sequelize')
const { Products } = require('../../db');

const filterProducts = async(req) => {
    const { title, price, category, manufacturer, sortOrder, nameOrder} = req.query;
    try {
        
        const filterOptions = {};
        
        if(title){
            filterOptions.title = {
                [Op.iLike]: `%${title}%`
            }
        }

        if(price){
            filterOptions.price = {
                [Op.lte]: parseFloat(price)
            };
        }

        if(category){
            filterOptions.category = {
                [Op.iLike]: `%${category}%`
            };
        }

        if (manufacturer) {
            filterOptions.manufacturer = {
                [Op.iLike]: `%${manufacturer}%`
            };
        }

        const orderOptions = [];

        if(sortOrder === 'priceDesc'){
            orderOptions.push(['price', 'DESC']);
        } else if( sortOrder === 'priceAsc'){
            orderOptions.push(['price', 'ASC']);
        }

        if (nameOrder === 'nameDesc') {
            orderOptions.push(['title', 'DESC']);
        } else if (nameOrder === 'nameAsc') {
            orderOptions.push(['title', 'ASC']);
        }

        const filteredProducts = await Products.findAll({
            where: filterOptions,
            order: orderOptions
        })

        return filteredProducts;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    filterProducts
}