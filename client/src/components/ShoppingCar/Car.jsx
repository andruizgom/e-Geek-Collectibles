import React, { useContext } from 'react';
import NavBar from '../NavBar/NavBar';
import { CartContext } from '../../context/CartContext';

export const Car = () => {
  const {carrito, precioTotal, cantidadEnElCarrito, vaciarCarrito} = useContext(CartContext);

  const handleVaciar = () => {
    vaciarCarrito()
  }
  return (
    <div>
    <NavBar/>
      <h2>Carrito</h2>
      {carrito.map((prod) => (
        <div key={prod.id}>
          <img className="w-48 h-80" src={prod.image}  />
          <h3>Cantidad: {prod.quantity}</h3>
          <h3>Precio: ${prod.price}</h3>
          <h3>Precio Total: ${prod.price * prod.quantity}</h3>
        </div>
      ))}
      { carrito.length > 0 ?
        <>
          <h2>Cantidad total: {cantidadEnElCarrito()}</h2>
          <h2>Precio total: ${precioTotal()}</h2>
          <button onClick={handleVaciar}>Vaciar Carrito</button>
        </> :
        <h2>El Carrito esta vacio</h2>
    }
    </div>
  );
};