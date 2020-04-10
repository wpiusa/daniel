import {
  GET_ORG,
  GET_ORGS,
  ORG_LOADING,
 } from '../actions/types';

const initialState = {
  org: null,
  orgs: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORG_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ORG:
      return {
        ...state,
        org: action.payload,
        loading: false
      };
    case GET_ORGS:
      return {
        ...state,
        orgs: action.payload,
        loading: false
      };
    
    default:
      return state;
  }
}
