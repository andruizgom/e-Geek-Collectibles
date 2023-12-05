import React, { useState } from "react";
import Favorites from '../../components/Favorites/Favorites';
import Review from '../../components/Review/Review';

function User() {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenReviewForm = (productId) => {
    setIsReviewFormOpen(true);
    setSelectedProductId(productId);
  };

  const handleCloseReviewForm = () => {
    setIsReviewFormOpen(false);
    setSelectedProductId(null);
  };

  return (
    <div>
      <Favorites onReviewClick={handleOpenReviewForm} />
      {isReviewFormOpen && (
        <div>
          <Review productId={selectedProductId} onClose={handleCloseReviewForm} />
        </div>
      )}
    </div>
  );
}

export default User;
