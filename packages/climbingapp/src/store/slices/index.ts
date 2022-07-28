import { combineReducers } from 'redux';
import auth from './auth';
import authInfo from './authInfo';
import webview from './webview';
const rootReducer = combineReducers({
  auth,
  authInfo,
  webview,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
