import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductReviews } from "../../redux/actions";
import Favorites from "../Favorites/Favorites";
import { useAuth0 } from "@auth0/auth0-react";

export default function ShowReview({ productId }) {
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
      <div>
        <hr className="pb-6" />
        <p className="pb-4 text-lg font-semibold text-gray-900">Top reviews</p>
        <ul className="ml-2">
          {productReviews.Reviews && productReviews.Reviews.length > 0 ? (
            productReviews.Reviews.map((review, index) => (
              <div key={review.id} className="pb-4">
                <li key={index}>
                  <span className="text-xs">
                    {Array(parseInt(review.score, 10)).fill("⭐").join(" ")}
                  </span>
                  <p className="text-md mb-2 mt-2 text-gray-600">
                    {review.content}
                  </p>
                </li>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-600 ">No reviews yet</p>
          )}
        </ul>
      </div>
    </div>
  );
}
