import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postFavorite, removeFavorite } from "../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";

export default function FavButton() {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isFav, setIsFav] = useState(false);
  const favorite = { id: id, email: user ? user.email : null };

  const handleFavorite = async () => {
    switch (isFav) {
      case true:
        setIsFav(false);
        await dispatch(removeFavorite(favorite));
        return;
      case false:
        setIsFav(true);
        await dispatch(postFavorite(favorite));
        return;
    }
  };

  return (
    <>
      {isAuthenticated &&
        (isFav ? (
          <button className="mt-4 text-xl" onClick={handleFavorite}>
            ❤️
          </button>
        ) : (
          <button className="mt-4 text-xl" onClick={handleFavorite}>
            🖤
          </button>
        ))}
    </>
  );
}
