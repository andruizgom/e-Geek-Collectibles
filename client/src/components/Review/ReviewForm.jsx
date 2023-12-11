import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getUserReviews } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Review.module.css";
//aqui esta



const ReviewForm = ({ productId, onSuccess }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(getUserReviews(user.email));
    }
  }, [isAuthenticated, user, dispatch]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
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

    dispatch(createReview(reviewData));
    onSuccess(); // Llama a la función onSuccess para manejar el éxito del envío

    alert("Reseña enviada con éxito");
    setReviewText("");
    setRating(0);
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
        placeholder="Deja un comentario"
        className="reviews-textarea"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <button onClick={handleReviewSubmit}>Enviar</button>
    </div>
  );
};

export default ReviewForm;
