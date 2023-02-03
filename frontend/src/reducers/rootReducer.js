import { combineReducers } from 'redux';
import uiReducer from '../slices/uiSlice';

const rootReducer = combineReducers({
  ui: uiReducer,
});

export default rootReducer;
