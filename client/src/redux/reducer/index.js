import { SET_SEARCH_TERM, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_FAILURE, CLEAR_SEARCH  } from '../types/index';

const initialState = {
  searchTerm: '',
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_SEARCH:
      return { ...state, searchTerm: '', products: [] };
    default:
      return state;
  }
};

export default reducer;
