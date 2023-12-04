import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filteredProducts } from "../../redux/actions";

const Filters = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    title: "",
    price: "",
    category: "",
    manufacturer: "",
    sortOrder: "",
    nameOrder: "",
  });

  const categories = [
    "Games",
    "Statues",
    "Comics",
    "Figures",
    "Outfit and Accessories",
  ];
  const manufacturer = [
    "Marvel",
    "DC",
    "Netflix",
    "Saban",
    "Lucasfilm",
    "20th Century-Fox",
    "Toei Animation",
    "Warner Bros",
    "Universal Pictures",
    "Golden Harvest Limelight Entertainment",
    "Disney",
    "Capcom",
    "Amblin Entertainment",
    "Naughty Dog",
    "New Line Cinema",
    "Nickelodeon",
    "Metro Goldwyn Mayer",
    "Nintendo",
    "Hanna-Barbera",
    "Columbia Pictures",
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleFilter = () => {
    dispatch(filteredProducts(filters));
  };

  useEffect(() => {
    if (filters.sortOrder === "None") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        sortOrder: "",
      }));
    }

    if (filters.nameOrder === "None") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        nameOrder: "",
      }));
    }
  }, [filters.sortOrder, filters.nameOrder]);

  return (
    <div>
      <div>
        <label>Category:</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Manufacturer:</label>
        <select
          value={filters.manufacturer}
          onChange={(e) => handleFilterChange("manufacturer", e.target.value)}
        >
          <option value="">All Manufacturers</option>
          {manufacturer.map((manu) => (
            <option key={manu} value={manu}>
              {manu}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Price Order:</label>
        <select
          value={filters.sortOrder}
          onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
        >
          <option value="None">None</option>
          <option value="priceAsc">Price Ascending</option>
          <option value="priceDesc">Price Descending</option>
        </select>
      </div>
      <div>
        <label>Name Order:</label>
        <select
          value={filters.nameOrder}
          onChange={(e) => handleFilterChange("nameOrder", e.target.value)}
        >
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
