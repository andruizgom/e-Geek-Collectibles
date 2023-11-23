
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, fetchProducts, clearSearch } from '../../redux/actions/index';
import styles from "./SearchBar.module.css"

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const products = useSelector((state) => state.products);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const onChange = (event) => {
    const value = event.target.value;
    dispatch(setSearchTerm(value));
    if (value.length > 2) { // Buscar cuando haya al menos 3 caracteres
      dispatch(fetchProducts(value));
    } else if (value.length === 0) {
      dispatch(clearSearch()); // Limpia la barra y los resultados si el valor es una cadena vacía
    }
  };

  const onSelectItem = (title) => {
    dispatch(setSearchTerm(title));
    dispatch(clearSearch());
    
    
  };

  return (
    <div className={styles.searchBar}>
      
      <input  className={styles.inputField}
        type="text"
        placeholder="Buscar..." value={searchTerm} onChange={onChange} />
        <button className={styles.searchButton}>Buscar</button>
      
      {error && <p>Error: {error}</p>}
      {products.length > 0 && (
        <div>
          {products.map((item) => (
            <div key={item.title} onClick={() => onSelectItem(item.title)}>
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;










