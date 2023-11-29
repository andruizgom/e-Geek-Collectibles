import { fetchProducts } from "../../components/Pagination/Pagination.jsx";
import {
  GET_PRODUCTS_SUCCESS,
  SET_SEARCH_TERM,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAILURE,
  CLEAR_SEARCH,
  GET_PRODUCT_BY_ID,
  RESET_PRODUCT_DETAIL,
  GET_FILTERS,
  CREATE_PRODUCT,
  ADD_FAVORITES,
  REMOVE_FAVORITES,
  GET_FAVORITES,
  BUY_PRODUCT,
} from "../types";
import axios from "axios";

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

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const searchProducts = (searchTerm) => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/products/name?name=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.length === 0) {
        dispatch(fetchProductsFailure('No matches found'));
      } else {
        dispatch(fetchProductsSuccess(data));
      }
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};
export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/products/${id}`);
      await dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: data,
      });
    } catch (error) {
      throw new Error("No llegó un producto a la acción");
    }
  };
};
export const resetProductDetail = () => {
  return { type: RESET_PRODUCT_DETAIL };
};

export const filteredProducts = (filters) => {
  return async (dispatch) => {
    try {

      const response = await axios.get('http://localhost:3001/products?page=all', {
        params: filters,
      });
      await dispatch({
        type: GET_FILTERS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  };
};

export const createProduct = ({category,description,available,price,stock,author,manufacturer,title,image}) => {
  return async (dispatch) => {
     try {
  const product = {
  title,
  manufacturer,
  author,
  stock,
  price,
  image,
  available,
  description,
  category
}
    const endPoint = "http://localhost:3001/products"
    const { data } = await axios.post(endPoint,product);
    dispatch({
         type: CREATE_PRODUCT,
         payload: data
    })
    console.log(data);
  } catch (error) {
    throw new Error(error)
  }
  }
}

export const postFavorite = (favorite) => {
  const endpoint = 'http://localhost:3001/favorites';
  return async (dispatch) => {
      try {

          const {data} = await axios.post(endpoint, favorite);

          if (!data) throw new Error('There was no data');

          return dispatch({
              type: ADD_FAVORITES,
              payload: data.Products,
          });

      } catch (error) {
          throw new Error(error.message)
      }
  };
};

export const removeFavorite = (favorite) => {
  const endpoint = 'http://localhost:3001/favorites';
  return async (dispatch) => {
      try {

          const {data} = await axios.put(endpoint, favorite);

          if (!data) throw new Error('There was no data');

          return dispatch({
              type: REMOVE_FAVORITES,
              payload: data.Products,
          });

      } catch (error) {
          throw new Error(error.message)
      }
  };
};

export const getFavorites = (email) => {
  const endpoint = `http://localhost:3001/favorites/email?email=${email}`;
  
  return async (dispatch) => {
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (!data) {
        throw new Error('There was no data');
      }

      return dispatch({
        type: GET_FAVORITES,
        payload: data.Products,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const buyProduct=(id)=>{ //MODIFIQUE
  return{
    type: BUY_PRODUCT,
    payload:id,
  }

}

export const deleteProductCar=()=>{
  return{
    type:DELETE_BUY_PRODUCT,
    payload:id
  }
}

