import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from '../types';

export const searchRequest = () => ({
  type: SEARCH_REQUEST,
});

export const searchSuccess = results => ({
  type: SEARCH_SUCCESS,
  payload: results,
});

export const searchFailure = error => ({
  type: SEARCH_FAILURE,
  payload: error,
});