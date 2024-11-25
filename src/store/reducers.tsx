import {AnyAction, combineReducers} from 'redux';
import homeSlice from '../slice/homeSlice';
const appReducer = combineReducers({
  homeSlice,
});
const rootReducer = (state: any, action: AnyAction) => {
  // Clear all data in redux store to initial.
  if (action.type === 'LogOut') {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
