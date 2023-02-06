import { combineReducers } from 'redux';
import auth from './auth';
import authInfo from './authInfo';
import webview from './webview';
import s3util from './s3util';
const rootReducer = combineReducers({
  auth,
  authInfo,
  webview,
  s3util,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
