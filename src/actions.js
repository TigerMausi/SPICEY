import axios from "./axios";
import { getSocket } from "./socket";

// Here we will do all the AXIOS REQUESTS
// Every function we write MUST RETURN AN OBJECT
// the object has the property called TYPE
export async function receiveFriendsWannabes() {
    //console.log("MADE IT TO ACTION :)");
    const { data } = await axios.get("/friends-wannabees");
    console.log("MY DATA IN ACTIONS", data);
    return {
        //RETURNS THE OBJECT
        type: "RECEIVE_FRIENDS_WANNABIES",
        friendsKey: data
    };
    // axios GET request to get friends and wannabes!
    // ONCE WE GET RESPONSE FROM SERVER... return an object that contains type AND OBJECT
    // we need to return an object that needs to contain both friends and wannabees
}

// after this we will be on the server :> we only need people who send us a request or with whom we are friends (not people whom I send a request)
// SERVERLAND
export async function deleteFriend(id) {
    console.log("MADE IT TO deleteFriend :)");
    await axios.post("/terminate-friendship/" + id);

    return {
        type: "UNFRIEND",
        friend: id
    };
}

export async function acceptAsFriend(id) {
    console.log("MADE IT TO acceptAsFriend :)");
    await axios.post("/accepted-friendship-status/" + id);

    return {
        type: "ACCEPT_FRIEND",
        friend: id
    };
}

// ----------- ONLINE USERS SOCKET IO -----------
export async function getOnlineUsers(data) {
    //console.log("MADE IT TO ACTION :)");
    console.log("MY DATA IN getOnlineUsers", data);
    return {
        //RETURNS THE OBJECT
        type: "ONLINE_USERS",
        onlineUsers: data
    };

    // axios GET request to get friends and wannabes!
    // ONCE WE GET RESPONSE FROM SERVER... return an object that contains type AND OBJECT
    // we need to return an object that needs to contain both friends and wannabees
}

export async function userJoined(data) {
    console.log("MY DATA IN userJoined", data);
    return {
        //RETURNS THE OBJECT
        type: "ONLINE_USERS",
        userThatJoined: data
    };
}

export async function userLeft(data) {
    console.log("MY DATA IN userJoined", data);
    return {
        //RETURNS THE OBJECT
        type: "USER_THAT_LEFT",
        userThatLeft: data
    };
}

// ------------ CHAT SOCKET IO -----------
export async function getChatMessages(data) {
    console.log(" DATA IN getChatMessages", data);

    return {
        type: "GET_CHAT_MESSAGES",
        chatMessages: data
    };
}

export async function getNewChatMessage(data) {
    console.log(" DATA IN newChatMessage", data);

    return {
        type: "GET_NEW_CHAT_MESSAGE",
        newChatMessage: data
    };
}

// ----------- TALKING SPICEY ----------
export async function getAIResponses(data) {
    console.log(" DATA IN getAIResponses", data);

    return {
        type: "GET_NEW_AI_RESPONSE",
        response: data
    };
}

//------- USER TALKING -------
export async function getUserResponses(data) {
    console.log(" DATA IN getUserResponses", data);

    return {
        type: "GET_NEW_USER_RESPONSE",
        response: data
    };

    // EMMIT THE USER COMMENT TO SERVER
    socket.emit("userResponse", {
        response
    });
}
