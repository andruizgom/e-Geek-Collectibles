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
    setCarrito,
  } = useContext(CartContext);
  const isCart = useSelector((state) => state.cart);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      const email = user.email;
      dispatch(getCart(email));
    }
  }, [dispatch, isAuthenticated, user, cartUpdated]);

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
      setCartUpdated(!cartUpdated);
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
      setCartUpdated(!cartUpdated);
    } else {
      eliminarDelCarrito(id);
    }
  };

  const hanldeIncrementar = async (id) => {
    if (isAuthenticated && user && user.email) {
      try {
        const producto = await isCart.find((item) => item.id === id);
        const cantidadActual = producto ? producto.quantity : 0;
        console.log(cantidadActual);
        const { email } = user;
        const item = {
          email,
          id,
          quantity: cantidadActual + 1,
        };
        const response = await axios.put("/cart/updateQuantity", item);
        if (response && response.data) {
          incremento(id);
          setCartUpdated(!cartUpdated);
        } else {
          console.error("La respuesta del servidor no contiene datos.");
        }
      } catch (error) {
        console.error("Error al incrementar la cantidad:", error.response.data);
      }
    } else {
      incremento(id);
    }
  };

  const handleDecrementar = async (id) => {
    if (isAuthenticated && user && user.email) {
      try {
        const { email } = user;
        const item = {
          email,
          id,
          quantity: -1,
        };
        await axios.put("/cart/updateQuantity", item);
        decremento(id);
        setCartUpdated(!cartUpdated);
      } catch (error) {
        console.error("Error al decrementar la cantidad:", error.response.data);
      }
    } else {
      decremento(id);
    }
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
          {isAuthenticated && isCart && isCart.Products
            ? isCart.Products.map((ca) => (
                <CartItem
                  key={ca.id}
                  id={ca.id}
                  title={ca.title}
                  category={ca.category}
                  image={ca.image}
                  price={ca.price}
                  stock={ca.stock}
                  quantity={ca.Cart.quantity}
                  handleEliminar={handleEliminar}
                  hanldeIncrementar={hanldeIncrementar}
                  handleDecrementar={handleDecrementar}
                />
              ))
            : carrito.map((product) => (
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
