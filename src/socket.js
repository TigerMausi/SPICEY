import * as io from "socket.io-client";
import {
    getOnlineUsers,
    userJoined,
    userLeft,
    getChatMessages,
    getNewChatMessage,
    getAIResponses
} from "./actions";
let socket;

// ALTERNATIVE COMMUNICATION DIFFERENT THAN AXIOS

// FOR DUPLICATES
// STORE HAS THE DISPATCH METHOD
export function getSocket(store) {
    if (!socket) {
        socket = io.connect();

        // SPICEY TALK TO BE TRIGGERED EVENT
        socket.on("AIResponseToUser", data => {
            // PUSH SPICEY RESPONE TO STORE
            store.dispatch(getAIResponses(data));

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
    // CREATE CONTEXT FOR SPEECH SYNTHESIS
    const synth = window.speechSynthesis;

    //SpeechSynthesis.getVoices()
    //DEFINE THE ACCENT later

    // CREATE NEW INSTANCE OF SpeechSynthesisUtterance
    const msg = new SpeechSynthesisUtterance();

    var voices = synth.getVoices();

    // DEFINE WHAT TEXT COMPUTER WILL BE SPEAKING
    msg.text = text;

    // CUSTOMIZE COMPUTER'S VOICE
    msg.voiceURI = "Native";
    msg.volume = 1;
    msg.rate = 1;
    msg.lang = "en-GB";

    synth.speak(msg);
}
