import { jobConstants } from '../helpers/constants';

const initialState = { postings: [] };

export function job(state = initialState, action) {
    switch (action.type) {
        case jobConstants.POSTING_SUCCESS:
            return {
                post: action.payload
            }
        case jobConstants.POSTING_FAILURE:
            return {
                error: true,
                message: action.payload.message
            }
        default:
            return state
    }
}