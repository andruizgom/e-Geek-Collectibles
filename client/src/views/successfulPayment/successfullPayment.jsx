import React, { useContext, useEffect } from 'react';
import CartContext from '../../context/CartContext';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import axios from 'axios';


export default function SuccessfullPayment() {

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

    const { isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthentication = async () => {
            while (!isAuthenticated) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            if (isAuthenticated) {
                const endpoint = `/order`;
                axios.post(endpoint, { email: user?.email, carrito })
                    .then(response => {
                        vaciarCarrito();
                    })
                    .catch(error => {
                        console.error('Error fetching favorites:', error);
                    });
            }
        };

        checkAuthentication();

        return
    }, [isAuthenticated, user, dispatch]);



    return (
        <div>
            Successfull Payment

        </div>
    );
}