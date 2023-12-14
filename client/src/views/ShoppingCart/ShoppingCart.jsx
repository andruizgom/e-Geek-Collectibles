import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CartContext from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";
import { useAuth0 } from "@auth0/auth0-react";
import { getCart } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51OHSFxEdGwHq7UR2MSY16IkLw9ATiMPpMbDz4o3pQKINyv0gNmxMnW8YB1me0V7pfzRGrkEgjPfeOvrstgT6jWId00FqILQQ0n",
);

export default function ShoppingCart() {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const {
    carrito,
    agregarAlCarrito,
    precioTotal,
    vaciarCarrito,
    eliminarDelCarrito,
    incremento,
    decremento,
    precioFinalIva,
  } = useContext(CartContext);
  const isCart = useSelector((state) => state.cart);

  let cartItems = []; // Definir cartItems fuera del bloque condicional

  if (isAuthenticated && isCart && isCart.Products) {
    cartItems = isCart.Products;
  }

  const productDetail = cartItems.map((producto) => {
    const { Cart, ...restoDelProducto } = producto;
    return { productDetail: restoDelProducto, quantity: Cart.quantity };
  });

  useEffect(() => {
    const itemsToAdd = productDetail.filter(
      (item) =>
        !carrito.find((product) => product.id === item.productDetail.id),
    );

    itemsToAdd.forEach((item) => {
      agregarAlCarrito(item.productDetail, item.quantity, false);
    });
  }, [productDetail, agregarAlCarrito, carrito]);

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      const email = user.email;
      dispatch(getCart(email));
    }
  }, [dispatch, isAuthenticated, user]);

  const handleVaciar = async () => {
    if (isAuthenticated && user && user.email) {
      const { email } = user;
      const all = true;
      const emptyCart = {
        email,
        all,
      };
      await axios.put("/cart", emptyCart);
      vaciarCarrito();
    } else {
      vaciarCarrito();
    }
  };

  const handleEliminar = async (id) => {
    if (isAuthenticated && user && user.email) {
      const { email } = user;
      const all = false;
      const deleteItem = {
        email,
        id,
        all,
      };
      await axios.put("/cart", deleteItem);
      await eliminarDelCarrito(id);
    } else {
      eliminarDelCarrito(id);
    }
  };

  const hanldeIncrementar = async (id) => {
    incremento(id);
  };

  const handleDecrementar = async (id) => {
    decremento(id);
  };

  const subtotal = precioTotal();
  const total = precioFinalIva();

  const handleBuy = async () => {
    console.log("Objeto enviado al backend:", { cartItems: carrito });
    try {
      const response = await fetch("http://localhost:3001/crear-pago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: carrito.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en la solicitud:", errorData.error);
      } else {
        const session = await response.json();
        console.log("Sesión creada:", session);

        const stripe = await stripePromise;
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="h-auto bg-white pt-10">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <p
        className="justify-left mx-auto mb-2 max-w-5xl cursor-pointer px-6 text-xs text-gray-600 hover:text-red-600 md:flex md:space-x-6 xl:px-0"
        onClick={handleVaciar}
      >
        Remove All
      </p>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {carrito.map((product) => (
            <CartItem
              key={product.id}
              id={product.id}
              title={product.title}
              category={product.category}
              image={product.image}
              price={product.price}
              stock={product.stock}
              quantity={product.quantity}
              handleEliminar={handleEliminar}
              hanldeIncrementar={hanldeIncrementar}
              handleDecrementar={handleDecrementar}
            />
          ))}
        </div>
        <CartSummary
          subtotal={subtotal}
          total={total}
          mostrarCheckout={true}
          handleBuy={handleBuy}
        />
      </div>
    </div>
  );
}
