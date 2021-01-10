import { authConstants, httpParamConstants } from '../helpers/constants';
import { authService } from '../services';
import { history } from '../helpers/history';

export const authActions = {
    login,
    register,
    logout
}

function login(credentials){
    return dispatch => {
        dispatch({
            type: authConstants.LOGIN_REQUEST, 
            payload: credentials['username']
        });

        //Demo Purposes
        if(credentials.username == "admin" && credentials.password == "admin"){
            authService.login(credentials)
            .then((res) => {
                localStorage.setItem('_vsuser', JSON.stringify(credentials));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: credentials
                });
                history.push('/dashboard');
            })
            .catch((err) => {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {'message': "Something went wrong while processing your request."}
                });
            })
        }else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {'message': "Credentials do not match our records."}
            });
        }
        
    };
}

function logout(){
    localStorage.removeItem('_vsuser');
    history.push('/');
    return { type: authConstants.LOGOUT };
}

function register(data, role){
    return dispatch => {
        dispatch({
            type: authConstants.SIGNUP_REQUEST,
            payload: data['email']
        });

        httpParamConstants.USER_EMPLOYER == role || httpParamConstants.USER_JOBSEEKER == role ?

        authService.register(data)
        .then((res) => {
            let credentials = {
                fullName: data['fullName'],
                username: data['email'],
                password: data['password'],
                role: role
            }
            localStorage.setItem('_vsuser', JSON.stringify(credentials));
            httpParamConstants.USER_JOBSEEKER == role ? history.push('/create-account') : history.push('/dashboard')
            dispatch({
                type: authConstants.SIGNUP_SUCCESS,
                payload: credentials
            });
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: credentials
            });
        })
        .catch((err) => {
            dispatch({
                type: authConstants.SIGNUP_FAILURE,
                payload: {'message': "This is a demo error message"}
            })
        })

        :

        dispatch({
            type: authConstants.SIGNUP_FAILURE,
            payload: {'message': "Invalid User Role."}
        })
    }
}