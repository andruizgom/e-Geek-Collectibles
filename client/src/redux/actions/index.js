import { fetchProducts } from "../../components/Pagination/Pagination.jsx";
import {
  GET_PRODUCTS_SUCCESS,
  SET_SEARCH_TERM,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_SUCCESS_ADMIN,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAILURE,
  CLEAR_SEARCH,
  GET_PRODUCT_BY_ID,
  RESET_PRODUCT_DETAIL,
  GET_FILTERS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  BUY_PRODUCT,
  CREATE_USER,
  RESET_PRODUCTS_HOME,
  GET_CART,
  GET_PRODUCT_DATA,
  ORDERS_FILTERED,
  SET_ORDERS_PAGE,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR,
  GET_PRODUCT_REVIEWS_ERROR,
  GET_PRODUCT_REVIEWS_SUCCESS,
} from "../types";
import axios from "axios";

export function getProducts(page = 1) {
  return async function (dispatch) {
    try {
      const data = await fetchProducts(page);
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: { data, page },
      });
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

export const setSearchTerm = (searchTerm, adSearchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: { searchTerm, adSearchTerm },
});

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

const fetchProductsSuccessAdmin = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS_ADMIN,
  payload: products,
});

export const searchProducts = () => {
  return async (dispatch, getState) => {
    const searchTerm = getState().searchTerm || "";
    dispatch(fetchProductsRequest());

    try {
      const response = await axios.get(`/products/name`, {
        params: { name: searchTerm },
      });
      const data = await response.data;

      const filteredData = data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      if (filteredData.length === 0) {
        dispatch(fetchProductsFailure("No matches found"));
      } else {
        dispatch(fetchProductsSuccess(filteredData));
      }
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};
export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/products/${id}`);
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
      const response = await axios.get("/products?page=all", {
        params: filters,
      });
      await dispatch({
        type: GET_FILTERS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      const endPoint = "/products";
      const { data } = await axios.post(endPoint, product);
      dispatch({
        type: CREATE_PRODUCT,
        payload: data,
      });
      alert(data.title && "product created");
    } catch (error) {
      alert(error.message);
      throw new Error(error);
    }
  };
};

export const buyProduct = (id) => {
  //MODIFIQUE
  return {
    type: BUY_PRODUCT,
    payload: id,
  };
};

export const deleteProductCar = () => {
  return {
    type: DELETE_BUY_PRODUCT,
    payload: id,
  };
};

export const createUser = (email) => {
  const endpoint = "/users";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, { email });
      if (!data) throw new Error("There was no data");
      return dispatch({
        type: CREATE_USER,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
export const resetHomeProducts = () => {
  return { type: RESET_PRODUCTS_HOME };
};

export const getCart = (email) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/cart", { params: { email } });
      await dispatch({
        type: GET_CART,
        payload: data,
      });
    } catch (error) {
      throw new Error("Error GET cart products:", error);
    }
  };
};

export const createReview = (reviewData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/reviews", reviewData);
      console.log(response);

      dispatch({
        type: CREATE_REVIEW_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_REVIEW_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getProductReviews = (productId) => {
  return async (dispatch) => {
    try {
      //const response = await axios.get(`/products/${productId}`);
      const response = await axios.get("/reviews/", productId);

      dispatch({
        type: GET_PRODUCT_REVIEWS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_REVIEWS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const updateProduct = (product, id, updateState, actions) => {
  return async (dispatch) => {
    try {
      const endPoint = `/products/${id}`;
      const { data } = await axios.put(endPoint, product);
      dispatch({
        type: UPDATE_PRODUCT,
        payload: {
          updateState,
          adSearchTerm: actions ? data.product.title : actions,
        },
      });
      alert(data.message);
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const getIdAvailable = (id, available) => {
  return (dispatch) => {
    dispatch({
      type: GET_PRODUCT_DATA,
      payload: { id, available },
    });
  };
};

export const ordersFilters = ({ createdDate, state }) => {
  return async (dispatch) => {
    try {
      const endPoint = `/orders?`;
      const { data } = await axios.get(endPoint, {
        params: {
          createdDate,
          state,
        },
      });
      dispatch({
        type: ORDERS_FILTERED,
        payload: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const setOrdersPage = (page) => {
  return (dispatch) =>
    dispatch({
      type: SET_ORDERS_PAGE,
      payload: page,
    });
};

export const createDataClient = () => {};
