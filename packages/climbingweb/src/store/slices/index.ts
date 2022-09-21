import { combineReducers } from 'redux';
import ui from './uiSlice';
const rootReducer = combineReducers({
  ui,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
