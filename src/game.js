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

            //SELECTED BY INDEX
            firstSelectedIndex: null,
            secondSelectedIndex: null,

            // KEEPING TRACK OF GAMES VICTORY
            nrVictories: 0,

            currScore: 0,

            // KEEPS TRACK OF THE CARDS THAT WERE IN MOTION
            animationOnClick: false,

            // GAME OVER?
            startGame: false,
            choice: [
                "🐶",
                "🦄",
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
                "🐷"
            ],

            winningMessage: ""
        };
        console.log("we made it");

        //BIND LATER
        this.shuffleCards = this.shuffleCards.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.checkforMatch = this.checkforMatch.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
        //this.score = this.score.bind(this);
    }

    startNewGame(index) {
        console.log("START GAME HAPPENING");

        this.setState({
            shuffledCards: [],

            // SELECTED CARDS: will be an array of 2 from cards
            currSelectedCards: [],
            copyCurrentCards: [],

            firstSelectedIndex: null,
            secondSelectedIndex: null,

            // KEEPING TRACK OF GAMES VICTORY
            nrVictories: 0,
            newPairs: [],

            currScore: 0,
            animationOnClick: false,

            // GAME OVER?
            startGame: true
        });

        // MAKE A COPY OF THE NEW ARRAY
        const newArrayOfCards = this.state.choice.concat(
            this.state.choice.slice()
        );

        console.log("new array", newArrayOfCards);

        //
        this.setState({
            shuffledCards: this.shuffleCards(newArrayOfCards)
        });
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

    // START SPEECH RECOGNITION
    handleClick(card, index) {
        console.log("index!!", index);
        console.log("caaard!!!", card);
        // IF ALREADY CLICKED DO NOT FLIPP
        if (this.state.animationOnClick) {
            return;
        }

        // creating a new array and adding the curr selcted state
        let selectedCard = this.state.currSelectedCards;
        console.log("selected card", selectedCard);

        // CHECK IF THE CARD HAS ALREADY BEEN SELECTED disable option to flip
        if (
            this.state.currSelectedCards.length === 1 ||
            this.state.currSelectedCards.length === 2
        ) {
            if (this.state.currSelectedCards[0].index === index) {
                return;
            }
        }
        // MAKE A NEW ARRAY AND PUSHH THE CURRENTLY SELECTED CARD IN THE NEW ARRAY
        selectedCard.push({ card, index });
        console.log("this state after clicked", this.state);
        console.log("NEW ARRAY", selectedCard);

        if (selectedCard.length === 1) {
            this.setState({
                currSelectedCards: selectedCard,
                firstSelectedIndex: index
            });
        } else if (selectedCard.length === 2) {
            //IF CLICKED ON THE SAME IMAGE NO ACTION TO HAPPEN
            if (this.state.currSelectedCards[0].index == index) {
                return;
            }

            this.setState({
                currSelectedCards: selectedCard,
                secondSelectedIndex: index,
                animationOnClick: true
            });

            this.checkforMatch();

            setTimeout(() => {
                // ADD PROPERTY OF 2ND SELECTED
                this.setState({
                    currSelectedCards: [],
                    firstSelectedIndex: null,
                    secondSelectedIndex: null,
                    animationOnClick: false //
                });
            }, 1000);
        }
    }

    checkforMatch() {
        // console.log("this.state in checkforMatch", this.state);
        // // CHECK IF THERE ARE 2 CARDS
        // console.log(
        //     "!!!current selected card is",
        //     this.state.currSelectedCards
        // );
        console.log(
            "do they match? answer:",
            this.state.currSelectedCards[0].card ===
                this.state.currSelectedCards[1].card
        );

        // COMPARING THE 2 CARDS THAT WERE CURRENTLY SELECTED
        if (
            this.state.currSelectedCards[0].card ===
            this.state.currSelectedCards[1].card
        ) {
            //MOTION
            this.setState({
                animationOnClick: true
            });
            console.log("animation on click is set to: ", this.state);

            // IT'S A MATCH
            setTimeout(() => {
                let updatedNewPairs = this.state.newPairs;

                // UPDATE THE ARRAY
                updatedNewPairs.push(
                    this.state.currSelectedCards[0].index,
                    this.state.currSelectedCards[1].index
                );

                // UPDATE SCORE
                let score = this.state.currScore;
                score += 1;

                // SETTING NEW STATE TO IGNORE THE PREVIOUS ONES THAT WERE ALREADY A MATCH?
                this.setState({
                    newPairs: updatedNewPairs,
                    animationOnClick: false,
                    currScore: score
                });

                console.log("UPDATED SCORE ", score);

                // const maxScore = 15;
                const maxScore = this.state.shuffledCards.length / 2;
                console.log(maxScore);

                // CHECK IF ALL WERE A MATCH
                if (score === maxScore) {
                    updatedNewPairs = [];

                    this.setState({
                        startGame: false,
                        winningMessage: "CONGRATS! YOU WON :) "
                    });
                }
            }, 1000);
        }
    }

    // SETTING UP THE GAME FIELD
    // this.setState({
    //     cards: cards
    //     startGame: true
    // })

    // CREATE SYNTHETIC VOICE FOR COMPUTER

    render() {
        //console.log("this.state", this.state);

        // <div>
        //     <button className="FriendButton">START GAME</button>
        // </div>

        console.log("STATE for checking if fliponSelection ", this.state);
        console.log("this.score", this.state.currScore);

        return (
            <div className="game-field">
                <h2
                    className={
                        !this.state.startGame
                            ? "onStartMakeInvisible"
                            : "current-score"
                    }
                >
                    {this.state.currScore}
                </h2>
                <div>
                    <button
                        className={
                            this.state.startGame
                                ? "onStartMakeInvisible"
                                : "FriendButton"
                        }
                        id="style-change"
                        onClick={this.startNewGame}
                    >
                        START GAME
                    </button>
                    <div>{this.state.winningMessage}</div>
                </div>

                <div id="board">
                    {this.state.shuffledCards.map((card, index) => (
                        <div
                            className={
                                this.state.newPairs.includes(index)
                                    ? "flip-card hidePairs"
                                    : "flip-card"
                            }
                            key={index}
                            onClick={e => this.handleClick(card, index)}
                        >
                            <div
                                className={
                                    this.state.firstSelectedIndex === index ||
                                    this.state.secondSelectedIndex === index
                                        ? "flip-card-inner flipOnSelection"
                                        : "flip-card-inner"
                                }
                            >
                                <div className="flip-card-front">
                                    <img
                                        className="img-question-mark"
                                        src="/images/question_mark2.gif"
                                    />
                                </div>
                                <div className="flip-card-back">{card}</div>
                            </div>
                        </div>
                    ))}
                </div>
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
