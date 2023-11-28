import React, {useState,useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {postFavorite, removeFavorite} from '../../redux/actions/index'



const FavButton = () => {

    const { user, isAuthenticated } = useAuth0();
    const { favorites } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { id } = useParams();

    const [isFav, setIsFav] = useState(false);

    const favorite = {"id":id, "email":user ? user.email:null}
  
    const handleFavorite = async() => {
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
    }
    return (
        <>
            {
                isAuthenticated && (isFav ? (
                    <button onClick={handleFavorite}>❤️</button>
                ) : (
                    <button onClick={handleFavorite}>🖤</button>
                ))
            }
        </>

    );
};

export default FavButton;
