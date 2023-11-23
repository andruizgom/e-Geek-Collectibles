import { GET_PRODUCTS_SUCCESS } from "../types";

const initialState = {
  allProducts: [],
  currentPage: 1,
  loading: false,
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
    // Otros casos y acciones aquí
    default:
      return state;
  }
};

export default reducer;