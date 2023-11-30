import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Loging = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (

        <button onClick={() => loginWithRedirect()}>Login</button>

    );
};

export default Loging;