// import request from "./request";

// import Home from "../app/modules/home";
// import Profile from "../app/modules/profile";

const routes = app => {

    app.get("*", (req, res) => {
        res.render("index");
    });
}

export default routes;