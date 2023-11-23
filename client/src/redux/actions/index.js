import axios from "axios";
import { GET_PRODUCTS } from "../types";

export function getProducts() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/products");
      return dispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}
