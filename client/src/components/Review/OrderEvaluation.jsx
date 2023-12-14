import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Review.module.css";


function OrderEvaluation({ orderId, orderState, productId }) {
    const dispatch = useDispatch();
    const { user } = useAuth0();
    useSelector((state) => state.reviews);
    
  
    
    

  const [isLoading, setIsLoading] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  if (!orderId || orderState !== 'Accepted') {
    return <div>No hay nada que evaluar para esta orden.</div>;
  }

  const handleEvaluate = async (e) => {
    e.preventDefault();


    try {



        if (!user) {
        
            alert("Debes estar autenticado para enviar una reseña.");
            return;
          }
          if (!productId) {
            console.error("productId is not defined");
            return;
          }
          
          if (!reviewText || rating === 0) {
            alert(
              "Por favor, completa la reseña y asigna una puntuación antes de enviar."
            );
            return;
          } 
          
          const reviewData = {
            content: reviewText,
            score: rating.toString(),
            productId: productId,
            usersId: user.email,
          };
          
          
           
      
          alert("Reseña enviada con éxito");
          setReviewText("");
          setRating(0);
          
      setIsLoading(true);
      
      dispatch(createReview(reviewData));
      setIsReviewSubmitted(true);
      
      
      console.log('Evaluación enviada con éxito', response.data);
    } catch (error) {
      console.error('Error al enviar la evaluación:', error.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div>
        {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={index <= rating ? styles.selectedStar : styles.star}
          onClick={() => setRating(index)}
        >
          ★
        </span>
      ))}
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Escribe tu evaluación..."
        disabled={isReviewSubmitted}
      />
      <button onClick={handleEvaluate} disabled={isLoading || orderState !== 'Accepted' || isReviewSubmitted}>
        {isLoading ? 'Enviando...' : 'Enviar Evaluación'}
      </button>
    </div>
  );
}

export default OrderEvaluation;
