import React from "react";
import { NavLink } from 'react-router-dom';
import './Admin.styles.css'; 

function Admin() {
  return (
    <div className="admin-container">
      <h1>Welcome to the Admin Dashboard</h1>
      <NavLink className="nav-link" to="/create">Create Product</NavLink>
      <NavLink className="nav-link" to="/userform">Update user role and access</NavLink>
    </div>
  );
}

export default Admin;
