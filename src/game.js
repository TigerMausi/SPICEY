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
        this.handleClick = this.handleClick.bind(this);
        this.checkforMatch = this.checkforMatch.bind(this);
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
    handleClick(e, card) {
        // recognition.onend = function() {
        //     recognition.start();
        // }
        //
        console.log("event", e);
        //e.classList.toggle("active");
        if (
            !this.state.card1
            // typeof this.state.card1 == "undefined" ||
            // this.state.card1 == null
        ) {
            this.setState({
                card1: card
            });
            //console.log(this.state);
        } else {
            this.setState({
                card2: card
            });

            if (this.state.card1 == this.state.card2) {
                console.log("match");

                //
                this.setState({
                    card1: null,
                    card2: null
                });
            }
        }
        console.log("card1", this.state.card1);
        console.log("card2", this.state.card2);
        //console.log("card", e);
        //console.log("clicked", this.state.shuffledCards);
    }

    checkforMatch() {
        // if (true) {
        // }
        console.log("calllled", this.state);
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

        //console.log("this.state", this.state);

        return (
            <div id="board">
                {this.state.shuffledCards.map((card, index) => (
                    <div
                        className="flip-card"
                        key={index}
                        onClick={e => this.handleClick(e, card)}
                    >
                        <div className="flip-card-inner">
                            <div className="flip-card-front" />
                            <div className="flip-card-back">{card}</div>
                        </div>
                    </div>
                ))}
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
