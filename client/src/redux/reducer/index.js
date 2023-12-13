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
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR,
  GET_PRODUCT_REVIEWS_ERROR,
  GET_PRODUCT_REVIEWS_SUCCESS,
  CREATE_USER,
  RESET_PRODUCTS_HOME,
  CREATE_DATA_CLIENT,
  GET_PRODUCT_DATA,
  ORDERS_FILTERED,
  SET_ORDERS_PAGE,
} from "../types/index";

const initialState = {
  allProducts: [],
  adminProducts: [],
  adminPage: 1,
  ordersPage: 1,
  pageSizeOrders: 10,
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
  ordersFiltered: [],
  product: {},
  idCarProduct: [], //modifique
  carrito: [],
  user: {},
  product: {},
  updateProductMessage: "",
  reviews: [],
  createReviewError: null,
  getProductReviewsError: null,
  userReviews: [],
  error: null,
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
      return {
        ...state,
        productsFiltered: payload,
      };
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        productsFiltered: [
          {
            id: 0,
          },
        ],
        loading: false,
        error: payload,
      };
    case CLEAR_SEARCH:
      return { ...state, searchTerm: "", productsFiltered: [], error: null };
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
    case ORDERS_FILTERED:
      return {
        ...state,
        ordersFiltered: payload,
      };
    case SET_ORDERS_PAGE:
      return { ...state, ordersPage: payload };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, payload],
        createReviewError: null,
      };

    case CREATE_REVIEW_ERROR:
      return {
        ...state,
        reviews: null,
        createReviewError: payload,
      };

    case GET_PRODUCT_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: payload,
        getProductReviewsError: null,
      };

    case GET_PRODUCT_REVIEWS_ERROR:
      return {
        ...state,
        reviews: null,
        getProductReviewsError: payload,
      };
    default:
      return state;
  }
};
export default reducer;
