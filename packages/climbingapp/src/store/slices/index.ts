import { combineReducers } from 'redux';
import auth from './auth';
import authInfo from './authInfo';
const rootReducer = combineReducers({
  auth,
  authInfo,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
