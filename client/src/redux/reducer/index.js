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
  DELETE_BUY_PRODUCT,
  CREATE_USER,
  RESET_PRODUCTS_HOME,
  GET_PRODUCT_DATA,
} from "../types/index";

const initialState = {
  allProducts: [],
  adminProducts: [],
  adminPage: 1,
  idProduct: null,
  productAvailable: null,
  updateState: false,
  currentPage: 1,
  loading: false,
  searchTerm: "",
  adSearchTerm: null,
  adSearchProducts: [],
  products: [],
  productsDetail: {},
  productsFiltered: [],
  product: {},
  idCarProduct: [], //modifique
  carrito: [],
  user: {},
  product: {},
  updateProductMessage: "",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: [...state.allProducts, ...payload.data],
        currentPage: state.currentPage + 1,
        adminProducts: payload.data,
        adminPage: payload.page,
        loading: false,
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: payload.searchTerm,
        adSearchTerm: payload.adSearchTerm,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: payload };
    case FETCH_PRODUCTS_SUCCESS_ADMIN:
      return { ...state, adSearchProducts: payload };
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: payload };
    case CLEAR_SEARCH:
      return {
        ...state,
        searchTerm: "",
        products: [],
        error: null,
        adSearchProducts: [],
      };
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
        productsFiltered: payload,
      };
    case CREATE_PRODUCT:
      return { ...state, product: payload };
    case BUY_PRODUCT:
      let listaIdBuy = [...state.idCarProduct, payload];
      return {
        ...state,
        idCarProduct: listaIdBuy,
      };
    case DELETE_BUY_PRODUCT:
      const updatedCar = state.idCarProduct.filter(
        (elemento) => elemento !== action.payload,
      );
      return {
        ...state,
        idCarProduct: updatedCar,
      };
    case CREATE_USER:
      return {
        ...state,
        user: payload,
      };
    case RESET_PRODUCTS_HOME:
      return {
        ...state,
        allProducts: [],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        updateState: payload.updateState,
        adSearchTerm: payload.adSearchTerm,
      };
    case GET_PRODUCT_DATA:
      return {
        ...state,
        idProduct: payload.id,
        productAvailable: payload.available,
      };
    default:
      return state;
  }
};

export default reducer;
