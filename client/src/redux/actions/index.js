import axios from "axios";

import {
    GET_PRODUCT_DETAIL,
    CLEAN_PRODUCT_DETAIL
} from "./types"


export const getProductDetail = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${URL}/${id}`);
            await dispatch({
                type: GET_PRODUCT_DETAIL,
                payload: data
            });
        } catch (error) {
            console.log(error.message)
        } 
    };
};

export const cleanProductDetail = () => { //reestablece el estado
    return {
        type: CLEAN_PRODUCT_DETAIL
    };
};