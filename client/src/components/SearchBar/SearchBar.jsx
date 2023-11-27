import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  searchProducts,
  clearSearch,
} from "../../redux/actions/index";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const products = useSelector((state) => state.products);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const dropdownRef = useRef(null);
  const [inputClicked, setInputClicked] = useState(false);

  useEffect(() => {
    // Función para llamar cuando se hace clic en el documento
    const handleClickOutside = (event) => {
      // Si se hace clic fuera de la lista desplegable, se limpia la búsqueda
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(clearSearch());
      }
    };

    // Añade el listener para el evento 'mousedown'
    document.addEventListener('mousedown', handleClickOutside);

    // Función de limpieza para eliminar el listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  const onChange = (event) => {
    const value = event.target.value;
    setInputClicked(true);
    dispatch(setSearchTerm(value));
    if (value.length >= 3) { // Buscar cuando haya al menos 3 caracteres
      dispatch(searchProducts(value));
    } else if (value.length === 0) {
      dispatch(clearSearch()); // Limpia la barra y los resultados si el valor es una cadena vacía
    }
  };

  const onSelectItem = (title) => {
    dispatch(setSearchTerm(title));
    dispatch(clearSearch());
    
    
  };

  return (
    <div className={styles.searchContainer}>
    <div className={styles.searchBar}>
      
      <input  className={styles.inputField}
        type="text"
        placeholder="Buscar..." value={searchTerm} onChange={onChange} onClick={() => setInputClicked(true)} />
        <button className={styles.searchButton}>Buscar</button>
    </div> 
      {inputClicked && error && products.length === 0 && searchTerm.length >= 3 && (
        <p className={styles.dropdown}>Error: {error}</p>
      )}
      {products.length > 0 && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {products.map((item) => (
            <div key={item.title} onClick={() => onSelectItem(item.title)}
            className={styles.dropdownItem}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div> 
  );
};

export default SearchBar;