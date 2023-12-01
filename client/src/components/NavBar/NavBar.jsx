import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.title}>Collectibles</h2>
      <Link to="/home">Home</Link>
      <Link to="/create">Create Product</Link>
      <CartWidget/>
      <SearchBar />
    </nav>
  );
}

export default NavBar;

