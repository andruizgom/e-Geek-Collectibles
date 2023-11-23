import {} from "../actions/index";

let initialState = {
    productsDetail:null,


};

function rootReducer(state = initialState, action) {
  switch (action.payload) {
    case 'GET_PRODUCT_DETAIL':
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case 'CLEAN_PRODUCT_DETAIL':
      return {
        ...state,
        pokemonDetail: null,
      };




    default:
      return state;
  }
}

export default rootReducer;