import {SEARCH_PRODUCTS_SUCCESS, /*SEARCH_PRODUCTS_FAILURE*/} from "../actions/index.js";

let initialState = {	products: [],
	productsAux: [],};

function rootReducer(state = initialState, action) {
  switch (action.payload) {
    case SEARCH_PRODUCTS_SUCCESS:
			return {
				...state,
				products: action.payload,
				productsAux: action.payload,
				error: null,
			};

		// case SEARCH_PRODUCTS_FAILURE:
		// 	return {
		// 		...state,
		// 		products: [],
		// 		productsAux: [],
		// 		error: action.payload,
		// 	};
    // default:
    //   return state;
  }
}

export default rootReducer;