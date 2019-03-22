import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

import * as io from "socket.io-client";
import { getSocket } from "./socket";

const socket = io.connect();
socket.emit("Hii", {
    funky: "chicken"
});

//socket.on("yoo");

/* ----------------  REDUX -------------*/
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { Provider } from "react-redux";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (getSocket(store),
    (
        <Provider store={store}>
            <App />
        </Provider>
    ));
    //getSocket();
}

ReactDOM.render(elem, document.querySelector("main"));

// import React from "react";
// import ReactDOM from "react-dom";
//
// let myJsx = <strong>Hiii !</strong>;
//
// ReactDOM.render(
//     //myJsx(), //component is JSX -> XML EXTENSION
//     //<HelloWorld></HelloWorld> //CREATES INSTANCES OF AN COMPONENT
//     //<HelloWorld />,
//     <Hello greetee ="Kitty" funky = "lalaal"/>
//     //<div><HelloWorld/><HelloWorld/><HelloWorld/></div>
//     document.querySelector("main")
// );

//FUNCTIONS NEED START WITH CAPITAL LETTER
//COMPONENTS NEED TO START WITH CAPITAL LETTER!!
// function Hello(props) {
//     const style = {
//         color: 'tomato',
//         fontSize: '20px'
//     };
//
//
//     console.log(props);
//
//     //return null; //?untill everything is loaded is not ready to show stuff
//
//     return (
//         <div id="hello" style= {style} className={props.greete}>
//             Hello, <Greete name= {props.greetee }/> !
//             <p>It is nicenice to see you</p>
//         </div>
//     );
//
// //
// //         { props.greetee.toUpperCase() } !</div>; // you) can return an array //returns jsx
// //     //
// //     //return <div>Hello, { $ } !</div>; // you) can return an array //returns jsx
// // //--> you can't use ifs conditional expressions here
// // // Hello, { that || this }
// //
// //     <div id ="hello" className={props.greetee}>
// }
//
// // you can either create instances with a fucntion or a class the instaces
//
// //normally functions to create components
