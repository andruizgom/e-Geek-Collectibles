import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getProductReviews } from "../../redux/actions";
import styles from "./Review.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useRef } from "react";
import ReviewForm from "./ReviewForm";

const Reviews = ({ productId }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();

  const [showReviews, setShowReviews] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (productId) {
      dispatch(getProductReviews(productId));
    }
  }, [dispatch, productId]);

  const productReviews = useSelector((state) => state.productsDetail);

  const calculateAverageRating = () => {
    if (productReviews.Reviews && productReviews.Reviews.length > 0) {
      const total = productReviews.Reviews.reduce(
        (acc, review) => acc + parseInt(review.score, 10),
        0,
      );
      const average = (total / productReviews.Reviews.length).toFixed(1);
      return { average, count: productReviews.Reviews.length };
    }
    return { average: 0, count: 0 };
  };

  const { average: averageRating, count: reviewCount } =
    calculateAverageRating();

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
        "Por favor, completa la reseña y asigna una puntuación antes de enviar.",
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

    alert("Reseña enviada con éxito");
    setReviewText("");
    setRating(0);
  };

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const renderStars = () => {
      const stars = [];

      for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i}>&#9733;</span>);
      }

      if (hasHalfStar) {
        stars.push(
          <span key="half" style={{ position: "relative" }}>
            &#9733;&#189;
          </span>,
        );
      }

      return stars;
    };

    return <div>{renderStars()}</div>;
  };

  return (
    <div>
      <StarRating rating={parseFloat(averageRating)} />
      <span className="text-xs font-semibold text-gray-900">
        {reviewCount === 1 ? "1 review" : `${reviewCount} reviews`}
      </span>
      <br />
      <span className="text-xs text-gray-600">
        You need to buy the product to write a review.
      </span>
    </div>
  );
};

export default Reviews;
