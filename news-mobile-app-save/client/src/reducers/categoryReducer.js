import {
  ADD_CATEGORY,
  GET_CATEGORYS,
  GET_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_LOADING
} from '../actions/types';

const initialState = {
  categorys: [],
  category: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CATEGORYS:
      return {
        ...state,
        categorys: action.payload,
        loading: false
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categorys: [action.payload, ...state.categorys]
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categorys: state.categorys.filter(category => category._id !== action.payload)
      };
    default:
      return state;
  }
}
