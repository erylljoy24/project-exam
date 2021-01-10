import { httpParamConstants, authConstants } from '../helpers/constants';
import { history } from '../helpers/history';

export const signUpActions = {
    setChoice
}

function setChoice(type){
    history.push(`/register/${type}`);
    return { type: authConstants.SIGNUP_TYPE, payload: type };
}