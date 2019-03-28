import * as io from "socket.io-client";
import {
    getOnlineUsers,
    userJoined,
    userLeft,
    getChatMessages,
    getNewChatMessage,
    getAIResponses,
    getUserResponses
} from "./actions";

import React from "react";
import axios from "axios";

//import store for dispatch METHOD
import { store } from "./start";

let socket;

// ALTERNATIVE COMMUNICATION DIFFERENT THAN AXIOS

// FOR DUPLICATES
// STORE HAS THE DISPATCH METHOD
export function getSocket(store) {
    if (!socket) {
        socket = io.connect();

        // SPICEY TALK TO BE TRIGGERED EVENT
        socket.on("AIResponseToUser", data => {
            console.log("data in AI RESPONSE USER", data);
            // PUSH SPICEY RESPONE TO STORE
            store.dispatch(getAIResponses(data));

            // RENDER SPICEY RESPONSE
            synthVoice(data);
        });

        socket.on("getAIResponses", data => {
            console.log("DATA IN SOCKET", data);
            console.log("length of data!!!", data.length);

            // PUSH SPICEY RESPONE TO STORE
            // store.dispatch(getAIResponses(data));

            console.log("IS IT length?", "Then let us start our game".length);
            console.log("IS IT length?", "Then let us play".length);

            if (
                data == "Then let us start our game" ||
                data == "Then let us play" ||
                data == "Okay I will start the game for you" ||
                data == "I would be more than happy to start the game for you"
            ) {
                location.replace("/startGame");
                synthVoice(data);
            }

            // RENDER SPICEY RESPONSE
            setTimeout(() => {
                console.log("synth voice in set timeout socket.js", synthVoice);
                synthVoice(data);
            }, 100);
        });

        socket.on("UserResponseToAI", data => {
            console.log("data in UserResponseToAI", data);
            // // PUSH SPICEY RESPONE TO STORE
            store.dispatch(getUserResponses(data));

            console.log(data);

            // RENDER SPICEY RESPONSE
            synthVoice(data);
        });

        socket.on("onlineUsers", data => {
            store.dispatch(getOnlineUsers(data));
        });

        socket.on("userJoined", data => {
            store.dispatch(userJoined(data));
        });

        socket.on("userLeft", data => {
            store.dispatch(userLeft(data));
        });

        //IN SOCKET LISTEN FOR EVENT ALSO FOR MESSAGES
        socket.on("chatMessages", data => {
            console.log("data in chatMessages ", data);
            store.dispatch(getChatMessages(data));
        });

        socket.on("newChatMessage", data => {
            console.log("data in newChatMessage ", data);

            store.dispatch(getNewChatMessage(data));
        });
    }

    return socket;
}

// CREATE SYNTHETIC VOICE FOR COMPUTER
function synthVoice(text) {
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
