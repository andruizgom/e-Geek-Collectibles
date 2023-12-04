import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';

import axios from "axios";


const Dashboard = () => {

    const { isAuthenticated, user } = useAuth0();
    const [isAdminLocal, setIsAdminLocal] = useState(false);

    const checkUserRole = async (email) => {
        const endpoint = `/users/email`;

        try {
            const response = await axios.get(endpoint, { params: { email: email } });
            const data = response.data;
            if (!data) {
                throw new Error('There was no data');
            }
            return data.isAdmin;
        } catch (error) {
            throw new Error(error.message);
        }

    };


    useEffect(() => {
        const checkAuthentication = async () => {
            if (!isAuthenticated) {
                return;
            }

            try {
                const isAdmin = await checkUserRole(user?.email);
                setIsAdminLocal(isAdmin);
            } catch (error) {
                console.error('Error while verifying user role:', error.message);
            }
        };

        checkAuthentication();
    }, [isAuthenticated, user?.email]);


    return (

        <div>
            {isAuthenticated && isAdminLocal ? (
                <NavLink to="/admin">Admin Dashboard</NavLink>
            ) : isAuthenticated ? (
                <NavLink to="/user">User Dashboard</NavLink>
            ) : null}
        </div>

    );
};

export default Dashboard;