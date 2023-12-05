import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Slide from "../../components/Slide/Slide";
import Welcome from "../../components/Welcome/Welcome";
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from "react";
import { createUser } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function Landing() {

  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
     
      while (!isAuthenticated) {
        await new Promise(resolve => setTimeout(resolve, 100)); 
      }
      dispatch(createUser(user.email));
    };

    checkAuthentication();
  }, [isAuthenticated]);

  return (
    <div>
      <Banner />
      <Welcome />
      <Slide />
      <Footer />
    </div>
  );
}
