import React from "react";
import { NavLink } from 'react-router-dom';


function Admin() {
  return <div>
    <h1>Admin Dashboard</h1>
    <NavLink to="/create">Create Product</NavLink>
    <NavLink to="/userform">Update user role and access</NavLink>
    </div>;
}

export default Admin;