const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const infoProducts = require('../Stripe/infoProduct');

async function crearPago(req, res) {
    try {
        const productId = req.body.productId;
        const producto = await infoProducts(productId);
            if (!producto || !producto.available || producto.stock <= 0) {
            return res.status(400).json({ error: 'Producto no válido o no disponible' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: producto.title,
                            images: [producto.image],
                        },
                        unit_amount: Math.round(producto.price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/user',
            cancel_url: 'http://localhost:5173/home',
        });

        
        const responseObj = {
            id: session.id,
            price: producto.price, 
        };

        res.json(responseObj);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear sesión de pago');
    }
}

module.exports = {
    crearPago,
};