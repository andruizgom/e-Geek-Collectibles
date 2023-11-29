/*import React, { useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushCar } from '../../redux/actions';

export const Car = () => {
  const dispatch=useDispatch();  
  const idProductCar = useSelector((state) => state.idCarProduct);
  const carrito=useSelector((state)=>state.carrito)
   
  
  localStorage.setItem("carrito",JSON.stringify(carrito))
  

  
  const contarRepeticiones = (id) => {
    const idString = id.toString();
    return idProductCar.filter((productId) => productId === idString).length;
  };


 
  useEffect(() => {

    console.log("idProductCar:", idProductCar);
    idProductCar.map((element)=>(
        dispatch(pushCar(element))
    ))
    

  }, [idProductCar]);

  return (
    <>
    
      <h1>"SOY CARRITO"</h1>
      {carrito.map((element) => (
        
        <div key={element.id}>
          <p>ID: {element.id}</p>
          <img className="w-48 h-80" src={element.image} alt="Descripción de la imagen" />
          
          <p>Price: ${element.price * contarRepeticiones(element.id)}</p>
          <p>Quantity: {contarRepeticiones(element.id)}</p>
        </div>
      ))}
    </>
  );
}; */
/*
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export const Car = () => {
  const dispatch = useDispatch();
  const idProductCar = useSelector((state) => state.idCarProduct);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Cargar el carrito desde localStorage al montar el componente
    const storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito) {
      setCarrito(JSON.parse(storedCarrito));
    }
  }, []);

  const getProductCar = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/products/${id}`);
      const newProduct = response.data;
  
      // Verificar si el producto ya está en el carrito
      const productExists = carrito.some((product) => product.id === newProduct.id);
  
      // Actualizar el carrito local solo si el producto no está en el carrito
      if (!productExists) {
        setCarrito((prevCarrito) => {
          // Verificar nuevamente para evitar duplicados durante la actualización del estado
          const updatedCarrito = prevCarrito.some((product) => product.id === newProduct.id)
            ? prevCarrito
            : [...prevCarrito, newProduct];
  
          // Guardar todo el carrito en localStorage
          localStorage.setItem('carrito', JSON.stringify(updatedCarrito));
  
          return updatedCarrito;
        });
  
        console.log(`Producto con ID ${id} agregado al carrito.`);
      } else {
        console.log(`Producto con ID ${id} ya está en el carrito.`);
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  };
  // Llamada automática para cada ID en idProductCar
  useEffect(() => {
    idProductCar.forEach((id) => {
      // Convierte el ID a número antes de llamar a la función
      const numericId = Number(id);
      getProductCar(numericId);
    });
  }, [idProductCar]);

  const contarRepeticiones = (id) => {
    const idString = id.toString();
    return idProductCar.filter((productId) => productId === idString).length;
  };

  return (
    <>
      <h1>"SOY CARRITO"</h1>
      {carrito.map((element) => (
        <div key={element.id}>
          <p>ID: {element.id}</p>
          <img className="w-48 h-80" src={element.image} alt="Descripción de la imagen" />
          <p>Price: ${element.price * contarRepeticiones(element.id)}</p>
          <p>Quantity: {contarRepeticiones(element.id)}</p>
        </div>
      ))}
    </>
  );
};*/
/* este es el mejor codigo
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
            // Producto ya en el carrito, incrementar cantidad
            updatedCarrito[newProduct.id].cantidad += 1;
          } else {
            // Producto no en el carrito, añadir con cantidad 1
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

  // Efecto secundario para realizar operaciones adicionales después de actualizar el carrito
  useEffect(() => {
    // Actualizar localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Calcular cantidad y precio total
    const newCantidad = Object.values(carrito).reduce((total, product) => total + product.cantidad, 0);
    const newPrecioTotal = Object.values(carrito).reduce(
      (total, product) => total + product.price * product.cantidad,
      0
    );

    // Actualizar los estados
    setCantidad(newCantidad);
    setPrecioTotal(newPrecioTotal);
  }, [carrito]);

  return (
    <>
      <h1>"SOY CARRITO"</h1>
      {Object.values(carrito).map((element) => (
        <div key={element.id}>
          <p>ID: {element.id}</p>
          <img className="w-48 h-80" src={element.image} alt="Descripción de la imagen" />
          <p>Price: ${element.price}</p>
          <p>Quantity: {element.cantidad}</p>
        </div>
      ))}
      <p>Cantidad total: {cantidad}</p>
      <p>Precio total: ${precioTotal.toFixed(2)}</p>
    </>
  );
}; */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export const Car = () => {
  const dispatch = useDispatch();
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
            // Producto ya en el carrito, incrementar cantidad
            updatedCarrito[newProduct.id].cantidad += 1;
          } else {
            // Producto no en el carrito, añadir con cantidad 1
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

  // Efecto secundario para realizar operaciones adicionales después de actualizar el carrito
  useEffect(() => {
    // Actualizar localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Calcular cantidad y precio total
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

      // Eliminar el producto del carrito
      delete updatedCarrito[id];

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