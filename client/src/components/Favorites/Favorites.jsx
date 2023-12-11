import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import "./Favorites.styles.css";

function Favorites() {
  const { user } = useAuth0();

  let email = null;

  if (user) {
    email = user?.email;
  }

  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const endpoint = `/favorites/email`;
    axios.get(endpoint, { params: { email: email } })
      .then(response => {
        setFavorites(response.data.Products);
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      });
  }, []);

  return <div className="containercards">
    <Cards allProducts={favorites} className="CardContainer" />
  </div>

}

export default Favorites;
