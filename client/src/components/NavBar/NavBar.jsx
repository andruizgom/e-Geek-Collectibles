import React from 'react';
import SearchBar from '../SearchBar/SearchBar'; // Asegúrate de que la ruta es correcta

const NavBar = () => {
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>My Navbar</h2>
      <SearchBar />
      {/* Aquí puedes agregar más elementos a la NavBar si lo deseas */}
    </nav>
  );
}

export default NavBar;