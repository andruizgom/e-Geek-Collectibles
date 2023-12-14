import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CartContext from "../../context/CartContext";

const stripePromise = loadStripe(
  "pk_test_51OHSFxEdGwHq7UR2MSY16IkLw9ATiMPpMbDz4o3pQKINyv0gNmxMnW8YB1me0V7pfzRGrkEgjPfeOvrstgT6jWId00FqILQQ0n",
);

const PaymentForm = ({ productId, quantity }) => {
  const [loading, setLoading] = useState(false);
  const { carrito, vaciarCarrito } = useContext(CartContext);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const getStock = async () => {
      try {
        const response = await fetch(
          `https://e-geek-collectibles-production.up.railway.app/products/${productId}`,
        );
        const productData = await response.json();
        setStock(productData.stock);
      } catch (error) {
        console.error(error);
      }
    };

    getStock();
  }, [productId]);

  const handlePayment = async () => {
    setLoading(true);

    try {
      if (stock <= 0) {
        return;
      }

      const cartItems = carrito.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const response = await fetch("https://e-geek-collectibles-production.up.railway.app/crear-pago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });

      const session = await response.json();
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error.message);
        setLoading(false);
      } else {
        vaciarCarrito();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading || stock <= 0}
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-8 py-3 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        {loading ? "Procesando..." : "Buy"}
      </button>
    </div>
  );
};

export default PaymentForm;
