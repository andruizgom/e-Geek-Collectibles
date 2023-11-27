import {
  GET_PRODUCTS_SUCCESS,
  SET_SEARCH_TERM,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAILURE,
  CLEAR_SEARCH,
  GET_PRODUCT_BY_ID,
  RESET_PRODUCT_DETAIL,
  GET_FILTERS
} from "../types/index";

const initialState = {
  allProducts: [],
  currentPage: 1,
  loading: false,
  searchTerm: "",
  products: [],
  productsDetail: {},
  productsFiltered: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: [...state.allProducts, ...payload],
        currentPage: state.currentPage + 1,
        loading: false,
      };
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: payload };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: payload };
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: payload };
    case CLEAR_SEARCH:
      return { ...state, searchTerm: "", products: [], error: null };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productsDetail: payload,
      };
    case RESET_PRODUCT_DETAIL:
      return {
        ...state,
        productsDetail: {},
      };
    case GET_FILTERS:
      return {
        ...state,
        productsFiltered: payload
      }
    default:
      return state;
  }
};

export default reducer;
