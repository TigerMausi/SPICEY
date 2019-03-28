import React from "react";
import { connect } from "react-redux";
import { getSocket } from "./socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        //this.state
    }

    handleKeyDown(e) {
        if (e.which === 13) {
            //if ENTER
            console.log("key " + e.which + " was pressed");
            console.log("target value", e.target.value);
            getSocket().emit("messageHasBeenSent", e.target.value);
        }
    }

    componentDidMount() {
        //this.props.dispatch(());

        console.log("this.elem", this.elem);
    }

    componentDidUpdate() {
        if (this.chatContainer) {
            this.chatContainer.scrollTop = this.chatContainer.scrollHeight;

            console.log("This.chatContainer in didmount", this.chatContainer);
            console.log(
                "This.chatContainer in didmount",
                this.chatContainer.scrollTop
            );

            //this.chatContainer.scrollTop = "100px"; // we will need to put something here that will tell the component to scroll
        }
    }

    //ELEM REPRESENTS THE CHAT CONTAINER, the actual div
    render() {
        console.log("this.props.", this.props);
        const { chats } = this.props;

        console.log("chats ", chats);

        if (!chats) {
            return null;
        } else {
            return (
                <div className="chat-page">
                    <div className="background-video">
                        <video autoPlay muted loop id="myVideo">
                            <source src="images/video.mov" type="video/mp4" />
                        </video>
                    </div>

                    <div className="foreground">
                        <h1>START SHARING YOUR STORY NOW WITH THE COMMUNITY</h1>
                        <div
                            ref={elem => (this.chatContainer = elem)}
                            id="chat-container"
                        >
                            {chats.map(message => {
                                // console.log("message in chats.map", message);

                                const image =
                                    message.profilepic ||
                                    "./images/profile_pic.png";

                                return (
                                    <div
                                        className="chats-list"
                                        key={message.created_at}
                                    >
                                        <div className="friends-names">
                                            {message.first}
                                            <b />
                                            {message.last}
                                        </div>
                                        <p>
                                            {" "}
                                            {message.created_at.slice(
                                                0,
                                                10
                                            )}{" "}
                                        </p>
                                        <img
                                            src={image}
                                            height="80"
                                            width="80"
                                        />
                                        <p className="comment-container">
                                            {message.messages}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <textarea
                            onKeyDown={this.handleKeyDown}
                            id="textarea-chat"
                            placeholder="Share you knowledge or add one of your concerns here"
                        />
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    console.log("STATE : ", state);
    return {
        // getting from socketjs
        chats: state.chatMessages
    };
};

export default connect(mapStateToProps)(Chat);
