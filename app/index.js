import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import App from './App';

const element = document.getElementById("app");

if(element) {
    render(
        <Router>
            <App />
        </Router>,
        element
    );
}