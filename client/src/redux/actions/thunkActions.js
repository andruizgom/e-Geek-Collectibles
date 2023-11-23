import { searchRequest, searchSuccess, searchFailure } from './index';

export const searchByName = (name) => {
  return async dispatch => {
    dispatch(searchRequest());
    try {
      const response = await fetch(`/api/search?name=${name}`);
      const data = await response.json();
      dispatch(searchSuccess(data));
    } catch (error) {
      dispatch(searchFailure(error.toString()));
    }
  };
};