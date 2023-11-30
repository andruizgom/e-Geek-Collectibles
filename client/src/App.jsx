import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import { Car } from './components/ShoppingCar/Car';
import './App.css';
import Form from './components/Form/Form';
import User from './views/User/User';
import { useAuth0 } from '@auth0/auth0-react';
import { CartContext } from './context/CartContext';
import { useState } from 'react';

function App() {
  const {  isAuthenticated } = useAuth0();

  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (productDetail, quantity) => {
    const itemAgregado = {...productDetail, quantity}
    const nuevoCarrito = [...carrito]
    const estaEnElCarrito = nuevoCarrito.find((producto) => producto.id === itemAgregado.id)
    if(estaEnElCarrito){
      estaEnElCarrito.quantity += quantity;
    } else {
      nuevoCarrito.push(itemAgregado)
    }
    setCarrito(nuevoCarrito)
  };

  const cantidadEnElCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.quantity, 0);
  }
  const precioTotal = () => {
    return carrito.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)
  }
  const vaciarCarrito = () => {
    setCarrito([])
  }
    return (
    <div className="App">
    <CartContext.Provider value={{carrito, agregarAlCarrito, cantidadEnElCarrito, precioTotal, vaciarCarrito}}>
      <Routes>
        <Route path='/create' element={<Form/>} />
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/Car" element={<Car/>} /> 
        {isAuthenticated && <Route path="/user" element={<User />} />}
      </Routes>
    </CartContext.Provider>
    </div>
  );
}

export default App;
