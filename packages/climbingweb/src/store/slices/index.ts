import { combineReducers } from 'redux';
import ui from './uiSlice';
import auth from './auth';
import createFeed from './createFeed';
import manageBnb from './manageBnb';
import centerReview from './centerReview';
const rootReducer = combineReducers({
  ui,
  auth,
  createFeed,
  manageBnb,
  centerReview,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
