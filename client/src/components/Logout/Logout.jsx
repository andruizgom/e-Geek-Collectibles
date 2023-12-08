import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { createUser } from "../../redux/actions";

const Logout = () => {
    
    const { logout, isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch();
  
    useEffect(() => {
      const checkAuthentication = async () => {
        while (!isAuthenticated) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
  
        if (isAuthenticated) {
          dispatch(createUser(user.email));
          console.log('User created or verified successfully');
        }
      };
  
      checkAuthentication();
    }, [isAuthenticated, user, dispatch]);

    return (
        <div>
            <button onClick={() => logout()}>Logout</button>
              
        </div>
    );
};

export default Logout;