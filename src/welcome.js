import React from "react";
import Registration from "./register";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";

/* ADDED THE WELCOME PAGE KIND OF A MAIN TEMPLATE */
export default function Welcome() {
    return (
        <div id="welcome">
            <div id="logo-container">
                <img src="./images/logo.png" className="mainLogo" />
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
