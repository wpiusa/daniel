import axios from 'axios';

import {
  ADD_CATEGORY,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_CATEGORYS,
  GET_CATEGORY,
  CATEGORY_LOADING,
  DELETE_CATEGORY
} from './types';

// Add CATEGORY
export const addCategory = categoryData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/categorys', categoryData)
    .then(res =>
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Categorys
export const getCategorys = () => dispatch => {
  dispatch(setCategoryLoading());
  axios
    .get('/api/categorys')
    .then(res =>
      dispatch({
        type: GET_CATEGORYS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORYS,
        payload: null
      })
    );
};

// Get Category
export const getCategory = id => dispatch => {
  dispatch(setCategoryLoading());
  axios
    .get(`/api/categorys/${id}`)
    .then(res =>
      dispatch({
        type: GET_CATEGORY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORY,
        payload: null
      })
    );
};

// Delete Category
export const deleteCategory = id => dispatch => {
  axios
    .delete(`/api/categorys/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setCategoryLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
