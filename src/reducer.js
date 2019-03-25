export default function reducer(state = {}, action) {
    // RETURNS A NEW GLOBAL STATE OBJ. THAT HAS PROPERTY OF friendsWannabees
    // Return a new state object that contains a property
    // called friendsWannabees whose value is the array we got back from the server

    // PUSH USERS RECENT RESPONSE TO STATE
    if (action.type == "GET_NEW_USER_RESPONSE") {
        state = {
            //CLONE REDUX STATE
            ...state,
            friendsKey: action.friendsKey
        };
    }

    // PUSH SPICY RECENT RESPONSE TO STATE
    if (action.type == "GET_NEW_AI_RESPONSE") {
        state = {
            //CLONE REDUX STATE
            ...state,
            friendsKey: action.friendsKey
        };
    }
    console.log("STATE IN REDUCER ", state);

    if (action.type == "RECEIVE_FRIENDS_WANNABIES") {
        state = {
            //CLONE REDUX STATE
            ...state,
            friendsKey: action.friendsKey
        };
    }

    // RETURNS OBJ THAT HAS ALL PROPERTIES OF THE CURRENT STATE OBJ EXCEPT IT'S ACCEPTED PROPERTY WILL HAVE THE VALUE OF TRUE -> using map
    if (action.type == "ACCEPT_FRIEND") {
        state = {
            // CLONE REDUX STATE
            ...state,
            friendsKey: state.friendsKey.map(friend => {
                if (action.friend == friend.id) {
                    return {
                        ...friend,
                        accepted: true
                    };
                } else {
                    return { ...friend };
                }
            })
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            // CLONE REDUX STATE
            ...state,
            friendsKey: state.friendsKey.filter(friend => {
                if (action.friend != friend.id) {
                    return friend;
                }
            })
        };
    }

    // --------- SOCKET IO - GET ALL ONLINE USERS --------
    if (action.type == "ONLINE_USERS") {
        state = {
            //CLONE REDUX STATE
            ...state,
            onlineUsers: action.onlineUsers
        };
    }
    /* `"USER_JOINED"???
 return a new state object that has all of the properties of the old state object except the old online users array is replaced with a new online users array that has in it all of the same objects as the old array but one more added, the one attached to the action

*/

    /*
`"USER_LEFT"`-
 return a new state object that has all of the properties of the old state object except the old online users array is replaced with a new online users array that has in it all of the same objects as the old array but one removed, the one whose id is specified in the action
*/
    if (action.type == "USER_THAT_LEFT") {
        state = {
            //CLONE REDUX STATE
            ...state,
            onlineUsers: state.onlineUsers.filter(
                item => item.id != action.userThatLeft
            )
        };
    }

    /*  SOCKET IO RECEIVING ALL MESSAGES FROM ACTIONS */
    if (action.type == "GET_CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.chatMessages || []
        };
    }

    if (action.type == "GET_NEW_CHAT_MESSAGE") {
        state = {
            ...state,
            chatMessages: [action.newChatMessage, ...state.chatMessages]
        };
        console.log("ACTION!! test", state);
    }

    //return a new state which friends
    return state; //handle the response
}

//----------- FROM IVANA ----------------
// export default function(state = {}, action) {
//     if (action.type == 'RECEIVE_USERS') {
//         state = Object.assign({}, state, {
//             users: action.users
//         });
//     }
//
//     // METHOD #1: using Object.assign()
//     // if (action.type == 'MAKE_HOT') {
//     //     state = Object.assign({}, state, {
//     //         users: state.users.map(user => {
//     //             if (action.id == user.id) {
//     //                 return Object.assign({}, user, {
//     //                     hot: true
//     //                 });
//     //             } else {
//     //                 return Object.assign({}, user);
//     //             }
//     //         })
//     //     });
//     // }
//
//     // METHOD #2: using the spread operator
//     if (action.type == 'MAKE_HOT') {
//         state = {
//             // clone REDUX state
//             ...state,
//             users: state.users.map(user => {
//                 if (action.id == user.id) {
//                     return {
//                         ...user,
//                         hot: true
//                     };
//                 } else {
//                     return { ...user };
//                 }
//             })
//         };
//     }
//     console.log("state in REDUCER: ", state);
//     return state;
// }
