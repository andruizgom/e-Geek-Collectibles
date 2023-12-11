import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CartContext from '../../context/CartContext'

function CartWidget() {
  const {cantidadEnElCarrito} = useContext(CartContext)
  return (
    <div>
      <Link to="/cart">
        Carrito
        <span> ({cantidadEnElCarrito()})</span>
      </Link>
    </div>
  )
}

export default CartWidget