import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getSocket } from "./socket";
import axios from "axios";
import { getUserResponses } from "./actions";

export default class StartGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // INITIAL VALUE
            shuffledCards: [],

            // SELECTED CARDS: will be an array of 2 from cards
            currSelectedCards: [],

            // KEEPING TRACK OF GAMES VICTORY
            nrVictories: 0,

            // GAME OVER?
            startGame: false
        };
        console.log("we made it");
        //BIND LATER
        this.shuffleCards = this.shuffleCards.bind(this);
    }

    shuffleCards(array) {
        // TO BE STARTED AT THE VERY BEGINNING IN componentDidMount()
        // FROM THE INTERNET

        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    // multiplyCards(cards,  ) {
    //     //
    // }

    componentDidMount() {
        // // 15 * 2  30 elements
        const cards = [
            "🐶",
            "🦍",
            "🐒",
            "🦁",
            "🦊",
            "🐘",
            "🐭",
            "🐹",
            "🐰",
            "🐨",
            "🐥",
            "🐙",
            "🐡",
            "🦖",
            "🦀"
        ];

        // MAKE A COPY OF THE NEW ARRAY
        const newArrayOfCards = cards.concat(cards.slice());

        this.setState({
            shuffledCards: this.shuffleCards(newArrayOfCards)
        });
    }

    // START SPEECH RECOGNITION
    handleClick() {
        // recognition.onend = function() {
        //     recognition.start();
        // }
    }

    createField(size) {}

    startGame() {}

    createCards() {}

    turnAround() {
        this.addClass("active");
    }

    // WHEN 2 CARDS MATCH
    winningBehaviour() {
        // WHEN 2 CARDS MATCH
    }

    // SETTING UP THE GAME FIELD
    // this.setState({
    //     cards: cards
    //     startGame: true
    // })

    // CREATE SYNTHETIC VOICE FOR COMPUTER

    render() {
        if (this.state.shuffledCards.length == 0) {
            return null;
        }

        console.log("this.state", this.state);

        return (
            <div className="start">
                <p className="first">Hello, I am SPICEY!</p>
                <button className="reset" onClick={this.startGame}>
                    start game
                </button>

                {this.state.shuffledCards.map(card => {
                    //                     <div class="flip-card">
                    //                     <div class="flip-card-inner">
                    //     <div class="flip-card-front">
                    //       <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;">
                    //     </div>
                    //     <div class="flip-card-back">
                    //       <h1>John Doe</h1>
                    //       <p>Architect & Engineer</p>
                    //       <p>We love that guy</p>
                    //     </div>
                    //   </div>
                    // </div>

                    <div
                        className="cards"
                        width="100"
                        height="100"
                        onClick={this.turnAround}
                    >
                        {card}
                    </div>;
                })}
            </div>
        );
    }
}

// <div
//     className="cards"
//     width="100"
//     height="100"
//     onClick={this.turnAround}
// >
//     1
// </div>
// <div
//     className="cards"
//     width="100"
//     height="100"
//     onClick={this.turnAround}
// >
//     1
// </div>
// <div
//     className="cards"
//     width="100"
//     height="100"
//     onClick={this.turnAround}
// >
//     2
// </div>
// <div
//     className="cards"
//     width="100"
//     height="100"
//     onClick={this.turnAround}
// >
//     2
// </div>{" "}
// <div
//     className="cards"
//     width="100"
//     height="100"
//     onClick={this.turnAround}
// >
//     3
// </div>
// <div
//     className="cards"
//     width="100"
//     height="100"
//     onClick={this.turnAround}
// >
//     3
// </div>{" "}
// <div
//     className="cards"
//     width="100"
//     height="100"
//     onClick={this.turnAround}
// >
//     4
// </div>
// <div
//     className="cards"
//     width="100"
//     height="100"
//     onClick={this.turnAround}
// >
//     4
// </div>
