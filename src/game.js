import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getSocket } from "./socket";
import axios from "axios";
import { getUserResponses } from "./actions";

export default class StartGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        console.log("we made it");
    }

    componentDidMount() {
        console.log("PAGE LOADINGs");
    }

    // START SPEECH RECOGNITION
    handleClick() {
        // recognition.onend = function() {
        //     recognition.start();
        // }
    }

    createField(size) {}

    restartGame() {}

    createCards() {}

    turnAround() {
        this.addClass("active");
    }

    // CREATE SYNTHETIC VOICE FOR COMPUTER

    render() {
        return (
            <div className="start">
                <p className="first">Hello, I am SPICEY!</p>
                <button className="reset" onClick={this.restartGame}>
                    restart game
                </button>
                <div
                    className="cards"
                    width="100"
                    height="100"
                    onClick={this.turnAround}
                >
                    1
                </div>
                <div
                    className="cards"
                    width="100"
                    height="100"
                    onClick={this.turnAround}
                >
                    1
                </div>
                <div
                    className="cards"
                    width="100"
                    height="100"
                    onClick={this.turnAround}
                >
                    2
                </div>
                <div
                    className="cards"
                    width="100"
                    height="100"
                    onClick={this.turnAround}
                >
                    2
                </div>{" "}
                <div
                    className="cards"
                    width="100"
                    height="100"
                    onClick={this.turnAround}
                >
                    3
                </div>
                <div
                    className="cards"
                    width="100"
                    height="100"
                    onClick={this.turnAround}
                >
                    3
                </div>{" "}
                <div
                    className="cards"
                    width="100"
                    height="100"
                    onClick={this.turnAround}
                >
                    4
                </div>
                <div
                    className="cards"
                    width="100"
                    height="100"
                    onClick={this.turnAround}
                >
                    4
                </div>
            </div>
        );
    }
}
