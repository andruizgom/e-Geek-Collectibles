import React, { useState } from "react";
import Favorites from '../../components/Favorites/Favorites';
import OrdersUser from '../OrdersUser/OrdersUser';
import { useAuth0 } from '@auth0/auth0-react';
import Review from '../../components/Review/Review';
import ReviewForm from "../../components/Review/ReviewForm";
import { createReview, getProductReviews } from "../../redux/actions";
import Navigation from "../../components/Navigation/Navigation";

//hasta aqui ok volver seguro

function User() {
  const { user } = useAuth0();
 

  return (
    <div>
      <Navigation/>
      <h2 className="user">Welcome to your dashboard {user.name}</h2>
      <h2 className="cards">These are your favorite products</h2>
      <Favorites />
      <h2 className="orders">These are your product orders</h2>
      <OrdersUser />
      <h2 className="review">Write a product review</h2>
      <div>
        {OrdersUser.user && OrdersUser.state === "Accepted" ? (
          <ReviewForm productId={OrdersUser.product_id} />
        ) : (
          'No se encontró una orden para el producto y el usuario'
        )}
      </div>
    </div>
  );
}  

export default User;
