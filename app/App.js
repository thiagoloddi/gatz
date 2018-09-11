import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import AsyncComponent from './AsyncComponent';

import "../stylesheets/_index.styl";

const circuits = import(/* webpackChunkName: "circuits" */ './modules/circuits/index');

const App = () => {
    return (
        <Switch>
            <Route path="/" component={() => <AsyncComponent provider={circuits} />} />
            <Route component={() => <div className="not-found">404 NOT FOUND</div>} />
        </Switch>
    );
};

export default App;
