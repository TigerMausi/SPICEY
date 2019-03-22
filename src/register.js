import React from "react";
import axios from "./axios";

import { Link } from "react-router-dom";

export default class Registration extends React.Component {
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
        e.preventDefault();

        console.log("SUBMIT in register, ");
        console.log("this.state", this.state);

        // axios
        //     .post("/register", {
        //         first: this.state.firstName,
        //         last: this.state.lastName,
        //         email: this.state.email,
        //         password: this.state.password
        //     })
        //     .then(({ data }) => {
        //         console.log("DATA IS", data);
        //
        //         if (data.success) {
        //             //REDIRECT TO ROUTE
        //             location.replace("/");
        //         } else {
        //             this.setState({
        //                 error: true
        //             });
        //             console.log("Err in submitting the registration");
        //         }
        //     });

        axios
            .post("/register", {
                first: this.state.firstName,
                last: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("DATA IS", data);

                if (data.success) {
                    //REDIRECT TO ROUTE
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                    console.log("Err in submitting the registration");
                }
            });
    }
    render() {
        return (
            <div className="registration-container">
                <h1 id="welcome">
                    Register now to ConnectMars,
                    <br />
                    the only social network that focuses in connecting people
                    from Earth and Mars!
                    <br />
                    <br />
                    <span>
                        Start talking with your martian friends and family!
                    </span>
                </h1>
                <form>
                    {this.state.error && (
                        <div className="error">Oops! Please try again!</div>
                    )}
                    <Link to="/login">
                        You already have an account? Click <span>here</span> to
                        Log in!
                    </Link>

                    <div className="input-container">
                        <input
                            onChange={this.handleChange}
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                        />
                        <input
                            onChange={this.handleChange}
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                        />
                        <input
                            onChange={this.handleChange}
                            name="email"
                            type="email"
                            placeholder="Email Adress"
                        />
                        <input
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            minLength="3"
                            maxLength="12"
                            placeholder="Password"
                        />
                        <button onClick={this.handleSubmit} id="submit">
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
