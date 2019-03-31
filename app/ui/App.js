import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import AsyncComponent from './AsyncComponent';
import "../../stylesheets/_index.styl";
import reducers from './reducers';

const circuits = import(/* webpackChunkName: "circuits" */ './modules/circuits/index');


const App = () => {
    return (
        <Provider store={createStore(reducers)}>
            <Switch>
                <Route exact path="/" component={() => <AsyncComponent provider={circuits} />} />
                {/* <Route path="/svg" component */}

                <Route component={() => <div className="not-found">404 NOT FOUND</div>} />
            </Switch>
        </Provider>
    );
};

export default App;
