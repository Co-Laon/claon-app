import { combineReducers } from 'redux';
import ui from './uiSlice';
import auth from './auth';
const rootReducer = combineReducers({
  ui,
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
