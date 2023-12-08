const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const infoProduct = require('../Stripe/infoProduct');
const { Products } = require('../../db'); 

async function crearPago(req, res) {
    try {
        const cartItems = req.body.cartItems;
        console.log("Carrito recibido:", cartItems);

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'Carrito vacío' });
        }

        const lineItems = await Promise.all(cartItems.map(async (item) => {
            const product = await infoProduct(item.productId);

            if (!product || !product.available || product.stock < item.quantity) {
                return { error: 'Producto no válido o no disponible' };
            }

            const updatedProduct = await Products.findByPk(item.productId);

            if (!updatedProduct) {
                return { error: 'Producto no encontrado' };
            }

            if (updatedProduct.stock < item.quantity) {
                return { error: 'No hay suficiente stock disponible.' };
            }

            updatedProduct.stock -= item.quantity;
            await updatedProduct.save();

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.title,
                        images: [product.image],
                    },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: item.quantity,
            };
        }));

        const hasError = lineItems.some((item) => item.error);
        if (hasError) {
            return res.status(400).json({ error: 'Al menos un producto no es válido o está agotado' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "AR", "CL","CO","PE","VE"],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 0,
                            currency: "usd",
                        },
                        display_name: "Free shipping",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 5,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 1500,
                            currency: "usd",
                        },
                        display_name: "Next day air",
                        // Delivers in exactly 1 business day
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 1,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 1,
                            },
                        },
                    },
                },
            ],
            phone_number_collection: {
                enabled: true,
            },
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/user',
            cancel_url: 'http://localhost:5173/home',
        });

        return res.json({ id: session.id, totalPrice: session.amount_total / 100 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al crear sesión de pago' });
    }
}

module.exports = {
    crearPago,
};
