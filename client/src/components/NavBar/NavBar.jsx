import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import CartWidget from '../CartWidget/CartWidget';
import Dashboard from '../Dashboard/Dashboard';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.title}>Collectibles</h2>
      <Link to="/home">Home</Link>
      <Dashboard/>
      <CartWidget/>
      <SearchBar />
    </nav>
  );
}

export default NavBar;

