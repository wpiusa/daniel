import axios from 'axios';

import {
  GET_ORG,
  GET_ORGS,
  ORG_LOADING,
  GET_ERRORS,
 
} from './types';

// Get current profile
export const getCurrentOrg = () => dispatch => {
  dispatch(setOrgLoading());
  axios
    .get('/api/org')
    .then(res =>
      dispatch({
        type: GET_ORG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORG,
        payload: {}
      })
    );
};

// Get profile by handle
export const getOrgByOrg = org => dispatch => {
  dispatch(setOrgLoading());
  axios
    .get(`/api/org/org/${org}`)
    .then(res =>
      dispatch({
        type: GET_ORG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORG,
        payload: null
      })
    );
};

// Create Org
export const createOrg = (orgData, history) => dispatch => {
  axios
    .post('/api/org', orgData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit Org
export const editOrg = (orgData, history) => dispatch => {
  axios
    .put('/api/org/org/:org', orgData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};





// Get all orgs
export const getOrgs = () => dispatch => {
  dispatch(setOrgLoading());
  axios
    .get('/api/org/all')
    .then(res =>
      dispatch({
        type: GET_ORGS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORGS,
        payload: null
      })
    );
};


// Org loading
export const setOrgLoading = () => {
  return {
    type: ORG_LOADING
  };
};


