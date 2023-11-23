import React from 'react';
import SearchBar from '../SearchBar/SearchBar'; // Asegúrate de que la ruta es correcta
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.title}>Collectibles</h2>
      <SearchBar />
      {/* mas elementos? */}
    </nav>
  );
}

export default NavBar;