import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(carritoInicial);

  const agregarAlCarrito = (productDetail, quantity) => {
    const itemAgregado = { ...productDetail, quantity };
    const nuevoCarrito = [...carrito];
    const estaEnElCarrito = nuevoCarrito.find(
      (producto) => producto.id === itemAgregado.id,
    );
    if (estaEnElCarrito) {
      estaEnElCarrito.quantity += quantity;
    } else {
      nuevoCarrito.push(itemAgregado);
    }
    setCarrito(nuevoCarrito);
  };

  const eliminarDelCarrito = (productId) => {
    const nuevoCarrito = carrito.filter(
      (producto) => producto.id !== productId,
    );
    setCarrito(nuevoCarrito);
  };

  const cantidadEnElCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.quantity, 0);
  };

  const precioTotal = () => {
    const total = carrito.reduce(
      (acc, prod) => acc + prod.price * prod.quantity,
      0,
    );
    return parseFloat(total.toFixed(2));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const incremento = (id) => {
    const nuevoCarrito = carrito.map((producto) =>
      producto.id === id
        ? {
            ...producto,
            quantity:
              producto.quantity < producto.stock
                ? producto.quantity + 1
                : producto.quantity,
          }
        : producto,
    );
    setCarrito(nuevoCarrito);
  };

  const decremento = (id) => {
    const nuevoCarrito = carrito.map((producto) =>
      producto.id === id
        ? {
            ...producto,
            quantity:
              producto.quantity > 1 ? producto.quantity - 1 : producto.quantity,
          }
        : producto,
    );
    setCarrito(nuevoCarrito);
  };

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cantidadEnElCarrito,
        precioTotal,
        vaciarCarrito,
        incremento,
        decremento,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
