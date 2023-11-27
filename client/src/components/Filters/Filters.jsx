import React, { useState, useEffect } from "react";
import axios from 'axios';
import Card from '../Card/Card';

const Filters = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchFilteredProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/filter', {
        params: {
          title,
          price,
          category,
          sortOrder
        }
      });

      setFilteredProducts(response.data)
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  }

  useEffect(() => {
    // Call the fetchFilteredProducts function here or use it directly in the onClick
  }, [title, price, category, sortOrder]);

  const handleFilter = () => {
    fetchFilteredProducts();
  }

  return (
    <div>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div>
        <label>Sort Order:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">None</option>
          <option value="priceAsc">Price Ascending</option>
          <option value="priceDesc">Price Descending</option>
        </select>
      </div>
      <button onClick={handleFilter}>Apply Filters</button>

      <div>
        {/* Display filtered products here */}
        {filteredProducts ? (
          filteredProducts.map((prod) => {
            return (
              <Card
              key={prod.id}
              title={prod.title}
              img={prod.image}
              price={prod.price}
              />
            )
          })
        ) : (
          'asd'
        )}
      </div>
    </div>
  );
};



export default Filters;
