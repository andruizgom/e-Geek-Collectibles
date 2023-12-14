import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import CartWidget from "../CartWidget/CartWidget";
import Dashboard from "../Dashboard/Dashboard";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className="styles.title">
        e-Collectibles
      </Link>
      <Link to="/home">Home</Link>
      <Dashboard />
      <CartWidget />
      <SearchBar />
    </nav>
  );
};

export default NavBar;
