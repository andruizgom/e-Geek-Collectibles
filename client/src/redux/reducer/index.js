import {SEARCH_PRODUCTS_SUCCESS,
	SEARCH_PRODUCTS_FAILURE,} from '../types/index';

const initialState = {
  allProducts: [],
  products: [],
	productsAux: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_PRODUCTS_SUCCESS:
			return {
				...state,
				products: action.payload,
				productsAux: action.payload,
				error: null,
			};

		case SEARCH_PRODUCTS_FAILURE:
			return {
				...state,
				products: [],
				productsAux: [],
				error: action.payload,
			};
    default:
      return state;
  }
};

export default reducer;
