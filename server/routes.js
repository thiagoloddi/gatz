// import request from "./request";

// import Home from "../app/modules/home";
// import Profile from "../app/modules/profile";

import dimen from '../draws/dimensions';

const routes = app => {

    app.get('/svg/:draw', (req, res) => res.render("svg", { draw: req.params.draw, dimen: dimen[req.params.draw] }));

    app.get('/node_modules/paper/dist/paper-full.min.js', (req, res) => {
        res.sendFile(process.cwd() + '/node_modules/paper/dist/paper-full.min.js');
    });

    app.get('/draws/*.js', (req, res) => {
        res.sendFile(process.cwd() + req.url);
    });

    app.get("*", (req, res) => {
        res.render("index");
    });
}

export default routes;