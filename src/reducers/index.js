import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { signup } from './signup';
import { job } from './job';

const rootReducer = combineReducers({
  authentication,
  signup,
  job
});

export default rootReducer;