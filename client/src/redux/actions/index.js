import axios from "axios";
import {SEARCH_PRODUCTS_SUCCESS, /*SEARCH_PRODUCTS_FAILURE*/} from "../actionTypes.js"

export const searchProductSuccess = (products) => {
	return {
		type: SEARCH_PRODUCTS_SUCCESS,
		payload: products,
	};
};

// export const searchProductFailure = (error) => {
// 	return {
// 		type: SEARCH_PRODUCTS_FAILURE,
// 		payload: error,
// 	};
// };


export const searchProducts = (brand) => {
	const endpoint = `/product?brand=${brand}`;
	return async (dispatch) => {
		try {
			const response = await axios.get(endpoint);
			// const data = await response.json();

			if (response.status === 200) {
				dispatch(searchProductSuccess(response.data));
			} else {
				dispatch(searchProductFailure('No se pudieron encontrar resultados'));
			}
		} catch (error) {
			// dispatch(searchProductFailure('Ocurrió un error en la búsqueda'));
			console.error(error);
		}
	};
};












// import { ADD_ADMIN_USER_SUCCESS, ADD_ADMIN_USER_FAILURE, GET_ADMIN_USERS_FAILURE, GET_ADMIN_USERS_SUCCESS, SET_USER_DATA } from '.././actionTypes'

// export const addAdminUser = (adminUserData) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.post('/admin', adminUserData);
//             dispatch({ type: ADD_ADMIN_USER_SUCCESS, payload: response.data });
//         } catch (error) {
//             dispatch({ type: ADD_ADMIN_USER_FAILURE, payload: error.message });
//         }
//     }
// }

// export const getAdminUsers = () => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.get('/admin');
//             dispatch({ type: GET_ADMIN_USERS_SUCCESS, payload: response.data });
//         } catch (error) {
//             dispatch({ type: GET_ADMIN_USERS_FAILURE, payload: error.message });
//         }
//     }


// }

// export const setUserData = (user) => {
//     return (dispatch) => {
//         dispatch({
//             type: SET_USER_DATA,
//             payload: user,
//         });
//     };
// };
