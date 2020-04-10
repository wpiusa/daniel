import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import articleReducer from './articleReducer';
import categoryReducer from './categoryReducer';
import orgReducer from './orgReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  article: articleReducer,
  org:orgReducer,
  category: categoryReducer
});
