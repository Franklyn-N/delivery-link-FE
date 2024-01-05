import { combineReducers } from 'redux';

import userReducer from './userReducer'

const allReducers = combineReducers({
    userData: userReducer,
  });
  
  export default allReducers;

  export type RootState = ReturnType<typeof allReducers>;
  