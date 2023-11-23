import { SET_SEARCH_TERM, FETCH_PRODUCTS_SUCCESS } from '../types/index';

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProducts = (searchTerm) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/products/name?name=${searchTerm}`);
      const data = await response.json();
      dispatch(fetchProductsSuccess(data));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
};

