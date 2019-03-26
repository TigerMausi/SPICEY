import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getSocket } from "./socket";
import axios from "axios";
import { getUserResponses } from "./actions";

class StartSpicey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.synthVoice = this.synthVoice.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.synthVoice(
            "Hello, I am spicy. If you want to talk to me click on the nice glowy button and let's start our conversation"
        );
    }

    // START SPEECH RECOGNITION
    handleClick() {
        // CHECK TO MAKE SURE SPEECH RECOGNITION IS SUPPORTED IN USER'S BROWSER
        if (window["webkitSpeechRecognition"]) {
            const SpeechRecognition =
                SpeechRecognition || webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            // USA-ENGLISH
            recognition.lang = "en-US";

            // PROCESS USER AUDIO WHILE USER IS SPEAKING
            recognition.interimResults = false;

            // SPEECH RECOGNITION WILL NOT END WHEN USER STOPS SPEAKING
            recognition.continuous = false;

            recognition.start();

            recognition.onresult = e => {
                let text;

                let last = e.results.length - 1;
                text = e.results[last][0].transcript;
                console.log("text the user said", text);

                this.props.dispatch(getUserResponses(text));

                console.log("Confidence: " + e.results[0][0].confidence);
            };

            recognition.onspeechstart = () => {
                // SPEACH HAS BEEN DETECTED
                console.log("SOMEBODY IS TALKING");
            };

            recognition.onspeechend = () => {
                recognition.stop();
            };

            recognition.onerror = e => {
                text = "Error occurred in recognition: " + e.error;
                //this.props.dispatch(displayMostRecentUserComment(text));
                return;
            };

            // recognition.onend = function() {
            //     recognition.start();
            // }
        }
    }
    // CREATE SYNTHETIC VOICE FOR COMPUTER
    synthVoice(text) {
        // CREATE CONTEXT FOR SPEECH SYNTHESIS
        const synth = window.speechSynthesis;
        console.log("synth", synth);

        const msg = new SpeechSynthesisUtterance();

        var voices = synth.getVoices();
        console.log("voices", voices);

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
        msg.rate = 1;

        speechSynthesis.speak(msg);
        if (!voices.length) {
            speechSynthesis.cancel();
            setTimeout(() => {
                this.synthVoice(text);
            }, 100);
        }
    }

    render() {
        console.log("this props", this.props);
        return (
            <div className="start-talking-to-spicey">
                <p className="first">Hello, I am SPICEY!</p>
                <button className="startSpicey" onClick={this.handleClick}>
                    start talking to Spicey
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("STATE : ", state);
    return {
        response: state.response

        // // from MDN DOCUMENTATION:  word => word.length > 6
        // friends:
        //     state.friendsKey &&
        //     state.friendsKey.filter(friend => friend.accepted === true),
        //
        // wannabees:
        //     state.friendsKey &&
        //     state.friendsKey.filter(wannabees => wannabees.accepted === false)
        // // wannabes: , // use filter method  _> accepted: false
        // // friends:
    };
};

export default connect(mapStateToProps)(StartSpicey);
