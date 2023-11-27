import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { filteredProducts } from "../../redux/actions";

const Filters = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    title: '',
    price: '',
    category: '',
    sortOrder: '',
    nameOrder: '',
  });

  const categories = ["Games", "Statues", "Comics", "Figures", "Outfit and Accessories"];

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  }

  const handleFilter = () => {
    dispatch(filteredProducts(filters));
  }

  useEffect(() => {
    // Lógica para manejar el cambio en sortOrder y nameOrder
    // Por ejemplo, puedes restablecer esos filtros si se selecciona "None"
    if (filters.sortOrder === 'None') {
      setFilters(prevFilters => ({
        ...prevFilters,
        sortOrder: '',
      }));
    }

    if (filters.nameOrder === 'None') {
      setFilters(prevFilters => ({
        ...prevFilters,
        nameOrder: '',
      }));
    }
  }, [filters.sortOrder, filters.nameOrder]);

  return (
    <div>
      <div>
        <label>Category:</label>
        <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Price Order:</label>
        <select value={filters.sortOrder} onChange={(e) => handleFilterChange('sortOrder', e.target.value)}>
          <option value="None">None</option>
          <option value="priceAsc">Price Ascending</option>
          <option value="priceDesc">Price Descending</option>
        </select>
      </div>
      <div>
        <label>Name Order:</label>
        <select value={filters.nameOrder} onChange={(e) => handleFilterChange('nameOrder', e.target.value)}>
          <option value="None">None</option>
          <option value="nameAsc">A-Z</option>
          <option value="nameDesc">Z-A</option>
        </select>
      </div>
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default Filters;