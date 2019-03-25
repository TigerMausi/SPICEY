import React from "react";
import axios from "./axios";
import Typist from "react-typist";
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

    componentDidMount() {
        new TypeIt(this.el, this.props);
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
                <Typist avgTypingSpeed={20} startDelay={200}>
                    <h1>
                        <span>
                            A virtual assistant that talks to your child...
                        </span>
                        <Typist.Backspace delay={900} Delay ms={1250} />
                    </h1>
                    <Typist.Backspace count={21} delay={900} Delay ms={1250} />
                    <h1>
                        <Typist.Backspace
                            count={26}
                            delay={900}
                            Delay
                            ms={1250}
                        />
                        For children who have difficulties communicating, <br />
                        <span>SPICEY</span> <br />
                        can be an an effective helper to interact in a safe
                        environment and to train their thinking.
                    </h1>
                    <Typist.Backspace count={149} delay={700} />
                    <Typist.Backspace delay={3900} Delay ms={1250} />
                    <h1>
                        <span>Start your journey now!</span>
                    </h1>
                </Typist>
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
