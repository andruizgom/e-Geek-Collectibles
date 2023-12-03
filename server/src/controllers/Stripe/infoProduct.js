const { Products } = require('../../db');

async function infoProducts(productId) {
    try {
        const producto = await Products.findByPk(productId);
        console.log('Producto:', producto);
        return producto ? {
            id: producto.id,
            title: producto.title,
            description: producto.description,
            price: producto.price,
            category: producto.category,
            manufacturer: producto.manufacturer,
            author: producto.author,
            image: producto.image,
            stock: producto.stock,
            available: producto.available,
        } : null;
    } catch (error) {
        
        console.error(error);
        return null;
    }
}

module.exports = infoProducts;