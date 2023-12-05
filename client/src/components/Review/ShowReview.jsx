import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductReviews } from "../../redux/actions";
import styles from "./Review.module.css";
import Favorites from "../Favorites/Favorites";
import { useAuth0 } from '@auth0/auth0-react';



const ShowReview = ({ productId }) => {
  const { user } = useAuth0();
  let email = null;

  if (user) {
    email = user?.email;
  }

  const dispatch = useDispatch();

  const [showReviews, setShowReviews] = useState(false);
  const [reviewText] = useState("");
  const [rating] = useState(0);

  const useMortis = () => {
    const productReviews = useSelector((state) => state.productsDetail);
    useEffect(() => {
      if (productId) {
        return () => {
          dispatch(getProductReviews(productId));
        };
      }
    }, [dispatch, productId]);
    return productReviews;
  };

  let productReviews = useMortis();

  const calculateAverageRating = () => {
    if (productReviews.Reviews && productReviews.Reviews.length > 0) {
      const total = productReviews.Reviews.reduce(
        (acc, review) => acc + parseInt(review.score, 10),
        0,
      );
      return (total / productReviews.Reviews.length).toFixed(1);
    }
    return 0;
  };

  const averageRating = calculateAverageRating();

    return (
    <div>
      <h2>Reviews:</h2>      
      <div>            
            <button onClick={() => setShowReviews(!showReviews)}>
              {showReviews ? "Ocultar Reseñas" : "Ver Reseñas"}
            </button>           
      </div>
      {showReviews && (
        <div>
          <ul>
            <h5>Reseñas para {productReviews.title}</h5>
            {productReviews.Reviews && productReviews.Reviews.length > 0 ? (
              productReviews.Reviews.map((review, index) => (
                <div key={review.id}>
                  <li key={index}>

                    <p>Descripción 📝: {review.content}</p>
                    <p>
                      Puntuación ⭐:{" "}
                      {Array(parseInt(review.score, 10)).fill("⭐").join(" ")}
                    </p>
                    <p>Usuario: {user.given_name ? user.given_name : 'Anónimo'}</p>
                  </li>
                </div>
              ))
            ) : (
              <p>No hay reseñas disponibles.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowReview;
