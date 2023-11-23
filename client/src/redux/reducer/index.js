import { GET_PRODUCTS } from "../types/index";

const initialState = {
  allProducts: [],
  allProductsCopy: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
        allProductsCopy: payload,
      };
    default:
      return state;
  }
};

export default reducer;
