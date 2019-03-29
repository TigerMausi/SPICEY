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
        this.synthVoice = this.synthVoice.bind(this);
    }
    //DOM - INPUT FIELDS will handle the change of information (STORE THE VAL IN A STATE)
    handleChange(e) {
        this[e.target.name] = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
        }); //check state?
    }

    componentDidMount() {
        //new TypeIt(this.el, this.props);

        this.synthVoice(`

            A virtual assistant that talks to your child...

            For children who have difficulties communicating, SPICEY
            can be an an effective helper

            to interact in a safe
            environment and to train their thinking.

            `);
    }

    synthVoice(text) {
        // CREATE CONTEXT FOR SPEECH SYNTHESIS
        const synth = window.speechSynthesis;
        //console.log("synth", synth);

        const msg = new SpeechSynthesisUtterance();

        var voices = synth.getVoices();
        //console.log("voices", voices);

        // setTimeout(() => {
        //     var voices = synth.getVoices();
        //     console.log("voices", voices);
        // }, 200);

        // for (let i = 0; i < voices.length; i++) {
        //     if (voices[i].name === "Samantha") {
        //         msg.voice = voices[i];
        //     }
        // }

        msg.voice = voices[32];

        // DEFINE WHAT TEXT COMPUTER WILL BE SPEAKING
        msg.text = text;

        // CUSTOMIZE COMPUTER'S VOICE
        //msg.voiceURI = "Native";
        msg.lang = "en-US";
        msg.volume = 1;

        console.log("msg is ", msg);
        msg.rate = 1;

        speechSynthesis.speak(msg);
        if (!voices.length) {
            speechSynthesis.cancel();
            setTimeout(() => {
                this.synthVoice(text);
            }, 100);
        }
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
                    </h1>
                    <h1>
                        <span>Start your journey now!</span>
                        <Typist.Backspace
                            count={23}
                            delay={1900}
                            Delay
                            ms={1650}
                        />
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
