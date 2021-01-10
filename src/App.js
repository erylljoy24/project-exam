import React from 'react';
import './App.css';
import {
    Switch,
    Route,
    BrowserRouter,
    useLocation
} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import './styles/custom.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PrivateRoute } from './components/PrivateRouter';
import { PublicRoute } from './components/PublicRouter';

import Login from './components/pages/Login';
import Signup from './components/pages/registration/Signup';
import Dashboard from './components/pages/Dashboard';
import Cart from './components/pages/Cart';
import Header from './components/layouts/Header';

function App() {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <React.Fragment>
            {location.pathname !== '/' &&
                <Header/>
            }
                <Switch >
                    <Route path="/" exact>
                        <Login />
                    </Route>

                    <PublicRoute path="/register" component={Signup}></PublicRoute>
                    <PublicRoute path="/dashboard" component={Dashboard} />
                    <PublicRoute path="/cart" component={Cart} />
                </Switch>
        </React.Fragment>
    );
}

export default App;
