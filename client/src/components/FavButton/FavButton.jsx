import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function FavButton() {
  const { user, isAuthenticated } = useAuth0();
  const { id } = useParams();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(
            `/favorites/email?email=${user.email}`,
          );
          const favoriteProducts = response.data.Products;
          const isCurrentProductFav = favoriteProducts.some(
            (favorite) => favorite.id == id,
          );
          setIsFav(isCurrentProductFav);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getFavorites();
  }, []);

  const favorite = { id: id, email: user ? user.email : null };

  const handleFavorite = async () => {
    try {
      const endpoint = "/favorites";

      switch (isFav) {
        case true:
          setIsFav(false);
          await removeFavorite(endpoint, favorite);
          return;

        case false:
          setIsFav(true);
          await postFavorite(endpoint, favorite);
          return;
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

  const removeFavorite = async (endpoint, favorite) => {
    try {
      const { data } = await axios.put(endpoint, favorite);
      if (!data) throw new Error("There was no data");
      console.log("Favorite removed successfully:", data.Products);
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw new Error(error.message);
    }
  };

  const postFavorite = async (endpoint, favorite) => {
    try {
      const { data } = await axios.post(endpoint, favorite);

      if (!data) throw new Error("There was no data");

      console.log("Favorite added successfully:", data.Products);
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw new Error(error.message);
    }
  };

  return (
    <>
      {isAuthenticated &&
        (!isFav ? (
          <button
            className="mt-4 text-xs text-gray-700"
            onClick={handleFavorite}
          >
            Add favorites 🖤
          </button>
        ) : (
          <button
            className="mt-4 text-xs text-gray-700"
            onClick={handleFavorite}
          >
            Remove favorites ❤️
          </button>
        ))}
    </>
  );
}
