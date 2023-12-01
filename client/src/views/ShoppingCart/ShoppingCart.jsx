import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";

export default function ShoppingCart() {
  const {
    carrito,
    precioTotal,
    cantidadEnElCarrito,
    vaciarCarrito,
    eliminarDelCarrito,
    incremento,
    decremento,
    precioFinalIva,
  } = useContext(CartContext);

  const handleVaciar = () => {
    vaciarCarrito();
  };

  const handleEliminar = (id) => {
    eliminarDelCarrito(id);
  };

  const hanldeIncrementar = (id) => {
    incremento(id);
  };

  const handleDecrementar = (id) => {
    decremento(id);
  };

  const subtotal = precioTotal();
  const total = precioFinalIva()

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
              key={product.title}
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
        <CartSummary subtotal={subtotal} total={total} />
      </div>
    </div>
  );
}
