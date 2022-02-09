import { actionTypes } from './action-types';

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: { user },
  };
};
export const setSearchText = text => {
  return {
    type: actionTypes.SET_SEARCH_TEXT,
    payload: text,
  };
};
