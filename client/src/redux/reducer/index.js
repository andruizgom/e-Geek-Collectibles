import { GET_PRODUCTS_SUCCESS, SET_SEARCH_TERM, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_FAILURE, CLEAR_SEARCH  } from '../types/index';


const initialState = {
  allProducts: [],
  currentPage: 1,
  loading: false,
  searchTerm: '',
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: [...state.allProducts, ...payload],
        currentPage: state.currentPage + 1,
        loading: false,
      };
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_SEARCH:
      return { ...state, searchTerm: '', products: [], error: null };
    default:
      return state;
  }
};

export default reducer;
