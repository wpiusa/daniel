import axios from 'axios';

import {
  GET_ARTICLE,
  DELETE_ARTICLE,
  GET_ARTICLES,
  ARTICLE_LOADING,
  CLEAR_CURRENT_ARTICLE,
  GET_ERRORS,

} from './types';

// Get current article
export const getCurrentArticle = () => dispatch => {
  dispatch(setArticleLoading());
  axios
    .get('/api/article')
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICLE,
        payload: {}
      })
    );
};

// Get article by title
export const getArticleByTitle = title => dispatch => {
  dispatch(setArticleLoading());
  axios
    .get(`/api/article/title/${title}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICLE,
        payload: null
      })
    );
};

// Create ARTICLE
export const createArticle = (articleData, history) => dispatch => {
  axios
    .post('/api/article', articleData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



// Edit Article
export const editArticle = (articleData, history) => dispatch => {
  axios
    .put('/api/article/title/:title', articleData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Get all articles
export const getArticles = () => dispatch => {
  dispatch(setArticleLoading());
  axios
    .get('/api/article/all')
    .then(res =>
      dispatch({
        type: GET_ARTICLES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICLES,
        payload: null
      })
    );
};

export const deleteArticle = (id,history) => dispatch => {
  axios
    .delete(`/api/article/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ARTICLE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.res.data
      })
    );
};

// Article loading
export const setArticleLoading = () => {
  return {
    type: ARTICLE_LOADING
  };
};

// Clear article
export const clearCurrentArticle = () => {
  return {
    type: CLEAR_CURRENT_ARTICLE
  };
};
