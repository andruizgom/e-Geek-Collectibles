import axios from "axios";

const fetchProducts = async (page) => {
  try {
    const response = await axios.get(`/products?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { fetchProducts };