import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  searchProducts,
  clearSearch,
} from "../../redux/actions/index";
import { Link } from "react-router-dom";
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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(clearSearch());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  const onChange = (event) => {
    const value = event.target.value;
    setInputClicked(true);
    dispatch(setSearchTerm(value));
    if (value.length >= 3) {
      dispatch(searchProducts(value));
    } else if (value.length === 0) {
      dispatch(clearSearch());
    }
  };

  const onSelectItem = () => {
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
              <Link to={`/detail/${item.id}`}>{item.title}</Link>
            </div>
          ))}
        </div>
      )}
    </div> 
  );
};

export default SearchBar;
