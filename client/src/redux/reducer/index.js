import { SET_SEARCH_TERM, FETCH_PRODUCTS_SUCCESS } from '../types/index';

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
    default:
      return state;
  }
};

export default reducer;
