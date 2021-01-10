import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('_vsuser')
            ? ( rest.role ? ( JSON.parse(localStorage.getItem('_vsuser')).role == rest.role ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} /> ) : <Component {...props} /> )
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)