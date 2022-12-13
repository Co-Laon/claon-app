import { combineReducers } from 'redux';
import ui from './uiSlice';
import auth from './auth';
import createFeed from './createFeed';
const rootReducer = combineReducers({
  ui,
  auth,
  createFeed,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
