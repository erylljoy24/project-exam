import { authConstants } from '../helpers/constants';

let user = JSON.parse(localStorage.getItem('_vsuser'));
const initialState = user ? { loggedIn: true, message: '', user: user } : {loggingIn: false, message: ''};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        user: action.payload
      };
    case authConstants.LOGIN_FAILURE:
      return {
        loggingIn: false,
        error: true,
        message: action.payload.message
      };
    case authConstants.LOGOUT:
      return {
        loggingIn: false
      };
    default:
      return state
  }
}