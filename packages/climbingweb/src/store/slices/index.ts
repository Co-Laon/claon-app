import { combineReducers } from 'redux';
import ui from './uiSlice';
import auth from './auth';
import createFeed from './createFeed';
import manageBnb from './manageBnb';
const rootReducer = combineReducers({
  ui,
  auth,
  createFeed,
  manageBnb,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
