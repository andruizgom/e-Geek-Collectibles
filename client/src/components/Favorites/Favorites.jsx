import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites } from '../../redux/actions/index'

function Favorites() {

  const { user } = useAuth0();
  const { favorites } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  let email = null;

  if (user) {
    email = user?.email;
  }

  useEffect(() => {
    (async () => {
      try {

        user ? await dispatch(getFavorites(user.email)) : null;

      } catch (error) {
        alert("There is no data")
      }
    })();

  }, [])


  return <>
    <h2>Favorites</h2>
    <h2>{user.name}</h2>
    
    <Cards allProducts={favorites} />


  </>
}

export default Favorites;
