const { Products } = require('../../db');

async function infoProducts(productId) {
    try {
        console.log('Buscando producto con ID:', productId);
        
        const product = await Products.findByPk(productId);

        if (product) {
            console.log('Producto encontrado:', product);
            return {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                category:product.category,
                manufacturer: product.manufacturer,
                author: product.author,
                image: product.image,
                stock: product.stock,
                available: product.available,
            };
        } else {
            console.log('Producto no encontrado');
            return null;
        }
    } catch (error) {
        console.error('Error al buscar el producto:', error);
        return null;
    }
}

module.exports = infoProducts;
