import axios from "axios";

const fetchProducts = async (page) => {
  try {
    const response = await axios.get(`http://localhost:3001/products?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { fetchProducts };