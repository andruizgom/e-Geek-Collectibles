import React, { useState } from "react";
import Favorites from '../../components/Favorites/Favorites';
import OrdersUser from '../OrdersUser/OrdersUser';
import { useAuth0 } from '@auth0/auth0-react';
import Review from '../../components/Review/Review';
import ReviewForm from "../../components/Review/ReviewForm";
import { createReview } from "../../redux/actions";

function User() {
  const { user } = useAuth0();
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleReviewSuccess = () => {
    // Lógica a ejecutar cuando se envía con éxito una reseña
    // Puedes actualizar el estado, recargar datos, etc.
    console.log("Review submitted successfully");
  };

  return (
    <div>
      <h2 className="user">Welcome to your dashboard {user.name}</h2>
      <h2 className="cards">These are your favorites products</h2>
      <Favorites/>
      <h2 className="orders">These are your products orders</h2>
      <OrdersUser/>
      <h2 className="review">Write a product review</h2>
      {selectedProductId && (
        <ReviewForm
        productId={productDetail.id}  // Utiliza productDetail.id en lugar de productId
        onSuccess={() => {
          dispatch(getProductReviews(productDetail.id)); // Recargar revisiones después de enviar una nueva
        }}
      />
      )}
    </div>
  );
}

export default User;
