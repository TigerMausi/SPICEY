import React from "react";
import axios from "./axios";

import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //DOM - INPUT FIELDS will handle the change of information (STORE THE VAL IN A STATE)
    handleChange(e) {
        this[e.target.name] = e.target.value;

        this.setState({
            [e.target.name]: e.target.value
        }); //check state?
    }
    handleSubmit(e) {
        console.log("SUBMIT in register, ");
        console.log("THIS.STAtE", this.state);
        //PREVENT DEFAULT BEHAVIOUR OF THE button
        e.preventDefault();

        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(data => {
                console.log("DATA IN THE LOGIN POST", data);

                if (data.data.success) {
                    //REDIRECT TO ROUTE
                    location.replace("/");
                } else {
                    //SET STATE TO ERROR
                    this.setState({
                        error: true
                    });
                    console.log("ERROR IN SUBMITING THE LOGIN FORM");
                }
            });
    }
    render() {
        return (
            <div className="login-container">
                <h1>
                    <span>
                        Login to your account and start talking with your
                        martian friends or family!
                    </span>
                </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.state.error && (
                        <div className="error">
                            Username or password does not match! Please try
                            again! || We couldn't find an account with the
                            emailadress you submitted. <br /> Please try again!
                        </div>
                    )}
                    <Link to="/">
                        Click here if you already have an account to register!
                    </Link>
                    <div className="input-container">
                        <input
                            onChange={this.handleChange}
                            type="email"
                            name="email"
                            placeholder="Email Adress"
                            required
                        />
                        <input
                            onChange={this.handleChange}
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <button id="submit">LOGIN</button>
                    </div>
                </form>
            </div>
        );
    }
}
