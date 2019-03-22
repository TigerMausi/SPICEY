import * as io from "socket.io-client";
import {
    getOnlineUsers,
    userJoined,
    userLeft,
    getChatMessages,
    getNewChatMessage
} from "./actions";
let socket;

// ALTERNATIVE COMMUNICATION DIFFERENT THAN AXIOS

// FOR DUPLICATES
// STORE HAS THE DISPATCH METHOD
export function getSocket(store) {
    if (!socket) {
        socket = io.connect();

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
