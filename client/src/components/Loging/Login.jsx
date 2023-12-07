import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Loging = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  
  const redirectUri = 'http://localhost:5173/home';

  return (
    <button onClick={() => loginWithRedirect({ redirectUri })}>Login</button>
  );
};

export default Loging;
