import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import axios from 'axios';

export const Car = () => {
  
  const idProductCar = useSelector((state) => state.idCarProduct);
  const [carrito, setCarrito] = useState({});
  const [cantidad, setCantidad] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);

  // Cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    const storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito) {
      setCarrito(JSON.parse(storedCarrito));
    }
  }, []);

  // Llamada automática para cada ID en idProductCar
  useEffect(() => {
    const cargarCarritoDesdeLocalStorage = async () => {
      const storedCarrito = localStorage.getItem('carrito');
      if (storedCarrito) {
        setCarrito(JSON.parse(storedCarrito));
      }
    };

    cargarCarritoDesdeLocalStorage();
  }, []);

  // Actualizar el carrito local desde idProductCar
  useEffect(() => {
    const getProductCar = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        const newProduct = response.data;

        setCarrito((prevCarrito) => {
          const updatedCarrito = { ...prevCarrito };

          if (updatedCarrito[newProduct.id]) {
           
            updatedCarrito[newProduct.id].cantidad += 1;
          } else {
          
            updatedCarrito[newProduct.id] = {
              ...newProduct,
              cantidad: 1,
            };
          }

          return updatedCarrito;
        });
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    idProductCar.forEach((id) => {
      const numericId = Number(id);
      getProductCar(numericId);
    });
  }, [idProductCar]);

 
  useEffect(() => {
    // Actualizar localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

   
    const newCantidad = Object.values(carrito).reduce((total, product) => total + product.cantidad, 0);
    const newPrecioTotal = Object.values(carrito).reduce(
      (total, product) => total + product.price * product.cantidad,
      0
    );

    // Actualizar los estados
    setCantidad(newCantidad);
    setPrecioTotal(newPrecioTotal);
  }, [carrito]);

  // Función para eliminar un producto del carrito
  const eliminarProducto = (id) => {
    setCarrito((prevCarrito) => {
      const updatedCarrito = { ...prevCarrito };

      
      delete updatedCarrito[id];

      return updatedCarrito;
    });
  };




  const incrementarCantidad = (id) => {
    setCarrito((prevCarrito) => {
      const updatedCarrito = { ...prevCarrito };
  
      if (updatedCarrito[id]) {
        
        updatedCarrito[id].cantidad += 1;
      }
  
      return updatedCarrito;
    });
  };
  
 
  const decrementarCantidad = (id) => {
    setCarrito((prevCarrito) => {
      const updatedCarrito = { ...prevCarrito };
  
      if (updatedCarrito[id]) {
       
        updatedCarrito[id].cantidad = Math.max(1, updatedCarrito[id].cantidad - 1);
      }

      return updatedCarrito;
    });
  };


  return (
    <>
      <h1>"SOY CARRITO"</h1>
      {Object.values(carrito).map((element) => (
        <div key={element.id}>
          <p>ID: {element.id}</p>
          <img className="w-48 h-80" src={element.image}  />
          <button onClick={() => decrementarCantidad(element.id)}>-</button>
          <button onClick={() => incrementarCantidad(element.id)}>+</button>
          <p>Price: ${element.price}</p>
          <p>Quantity: {element.cantidad}</p>
          <button onClick={() => eliminarProducto(element.id)}>Eliminar</button>
        </div>
      ))}
      <p>Cantidad total: {cantidad}</p>
      <p>Precio total: ${precioTotal.toFixed(2)}</p>
    </>
  );
};