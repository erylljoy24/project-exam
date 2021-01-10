import { authConstants } from '../helpers/constants';

const initialState = {signingUp: false};

export function signup(state = initialState, action) {
    switch (action.type) {
        case authConstants.SIGNUP_REQUEST:
            return {
                signingUp: true
            }
        case authConstants.SIGNUP_SUCCESS:
            return {
                signingUp: false,
                signedUp: true,
                user: action.payload
            }
        case authConstants.SIGNUP_FAILURE:
            return {
                signingUp: false,
                error: true,
                message: action.payload.message
            }
        default:
            return state
    }
}