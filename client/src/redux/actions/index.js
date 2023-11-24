import { fetchProducts } from '../../components/Pagination/Pagination';
import { GET_PRODUCTS_SUCCESS } from '../types';

export function getProducts(page = 1) {
  return async function (dispatch) {
    try {
      const data = await fetchProducts(page);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
}
