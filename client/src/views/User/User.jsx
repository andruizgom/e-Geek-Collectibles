import React from "react";
import Favorites from '../../components/Favorites/Favorites';
import OrdersUser from '../OrdersUser/OrdersUser';
import { useAuth0 } from '@auth0/auth0-react';


function User() {
  const { user } = useAuth0();
  return <div>
    <h2 className="user">Welcome to your dashboard {user.name}</h2>
    <h2 className="cards">These are your favorites products</h2>
    <Favorites/>
    <h2 className="orders">These are your products orders</h2>
    <OrdersUser/>
    <h2 className="review">Write a product review</h2>
    </div>;
}

export default User;