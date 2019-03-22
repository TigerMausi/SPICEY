import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor() {
        super();

        this.state = {
            buttonText: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    //WHEN MAKING THE REQUEST THE SERVER DOESNT KNOW THE ID WE NEED TO SEND THIS TO THE SERVER AS PART OF MY Request
    //NEED TO TAKE TE ID AND PASS IT TO THE button
    //this.props.match.params.id
    //read response, if no data from the db and users no friendship then send friends request
    //if we do get data ack from db read respnse  and based of it render button that says "cancel friend request" "accept friendship" or "end friendship"
    //NEED TO CHECK HERE IF THE USERS HAVE A KIND OF A RELATIONSHIP
    //DEPENDING ON THAT NEED TO SET THE STATE OF THE FRIENDSHIP
    //IFS 3 OF THEM DONE here
    //axios to make ajax request in react to check for that

    //if the button said "send friend request" when the button was clicked -- create status -> insert row into the TABLE POST REQUEST
    //server should run an insert query into friendship
    //if the button said either cancel friend request or end friendship ->
    //POST REQUEST delete raw from the table query
    //if the button said "accept friend request"
    //run an UPDATE QUERY to update the "accepted" column from false to true
    componentDidMount() {
        let otherUserId = this.props.otherUserId;
        console.log("this.props.otherUserId", otherUserId);

        axios
            .get("/get-initial-status/" + otherUserId)
            .then(data => {
                console.log("friendship status:", data);

                this.setState(
                    {
                        buttonText: data.data.buttonText
                    },
                    () => console.log("new state ", this.state)
                );
            })
            .catch(err => {
                console.log("Error in get-initial-status of friedship ", err);
            });
    }

    handleClick() {
        console.log("dubby duby the button was clicked yeeh");
        let otherUserId = this.props.otherUserId;
        console.log("this.props.otherUserId", otherUserId);

        //HAS 2 JOBS TELL THE SERVER TO RUN INSERT, UPDATE OR DELETE QUERY BASED OFF WHAT THE BUTTONTEXT WAS WHEN IT WAS clicked

        //2. change buttonText in state so that the actual text of the button changes after we ve recieved a response from the server
        if (this.state.buttonText == "send friend request") {
            axios
                .post("/send-friend-request-status/" + otherUserId)
                .then(data => {
                    this.setState(
                        {
                            buttonText: "cancel friend request"
                        },
                        () =>
                            console.log(
                                "new state after send friend request ",
                                this.state
                            )
                    );
                });
            //keyvalue pairs to store the status
        } else if (
            this.state.buttonText == "cancel friend request" ||
            this.state.buttonText == "unfriend"
        ) {
            console.log("TRYNG TO UNFRIEND!!!!!!!!");
            axios.post("/terminate-friendship/" + otherUserId).then(data => {
                this.setState(
                    {
                        buttonText: "send friend request"
                    },
                    () => console.log("new state ", this.state)
                );
            });
        } else if (this.state.buttonText == "accept friend request") {
            axios
                .post("/accepted-friendship-status/" + otherUserId)
                .then(data => {
                    this.setState(
                        {
                            buttonText: "unfriend"
                        },
                        () => console.log("new state ", this.state)
                    );
                });
        }

        // this.setState(
        //     {
        //         buttonText: "something else"
        //     },
        //     () => console.log("new state ", this.state)
        // );
    }

    render() {
        return (
            <div>
                <button className="FriendButton" onClick={this.handleClick}>
                    {this.state.buttonText}
                </button>
            </div>
        );
    }
}
