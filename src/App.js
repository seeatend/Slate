import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Signin from './pages/Signin';
import Signup from './pages/Signup';


export const App = () => (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Route path='/' component={Signin} exact />
                <Route path='/signup' component={Signup} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </BrowserRouter>
);