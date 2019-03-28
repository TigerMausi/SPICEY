import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import { Link } from "react-router-dom";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("this.state", this.state);
        console.log("this.props in profile!!!", this.props);
        console.log("this.props . bio in profile!!!", this.props.bio);

        const image = this.props.image || "./images/funny.gif";

        // <div id="profile-image">
        //     <img src={image} />
        // </div>
        return (
            <div className="profile-container">
                <div id="buttons-features">
                    <Link to="/startSpicey">
                        <button
                            className="FriendButton"
                            id="define"
                            onClick={this.handleClick}
                        >
                            start Spicey
                        </button>
                    </Link>

                    <Link to="/startGame">
                        <button
                            className="FriendButton"
                            id="down"
                            onClick={this.handleClick}
                        >
                            start Game
                        </button>
                    </Link>
                </div>

                <div className="image">
                    <ProfilePic
                        image={this.props.image}
                        first={this.props.first}
                        last={this.props.last}
                        id={this.props.id}
                        onClick={this.props.onClick}
                    />
                </div>
                <BioEditor
                    image={this.props.image}
                    onClick={this.showUploader}
                    // showTextarea={this.showTextarea}
                    // hideTextarea={this.hideTextarea}
                    bio={this.props.bio}
                    setBio={this.props.setBio}
                />
            </div>
        );
    }
}
