import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // textAreaIsVisible: false,
            editingMode: false,
            newValBio: ""
        };

        // this.showTextarea = this.showTextarea.bind(this);
        // this.hideTextarea = this.hideTextarea.bind(this);
        this.handleEditingMode = this.handleEditingMode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleEditingMode() {
        this.setState({
            editingMode: "true"
        });
    }

    //HANDLE CHANGE
    handleInputChange(e) {
        this.setState(
            {
                newValBio: e.target.value
            },
            () => console.log("new state ", this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log("this.state is", this.state);

        axios
            .post("/bio", { bio: this.state.newValBio })
            .then(data => {
                console.log("data ", data); //data.data[0].currentBio??
                //SetBio

                this.setState({ editingMode: false });
                //this.setState({data.data.bio})

                //keeping track of the if bio wasedited
                this.props.setBio(data.data.bio);

                console.log("data is ", data.data.bio);
            })
            .catch(err => {
                console.log("ERROR in handleSubmit: ", err);
            });
    }

    render() {
        console.log("this.state", this.state);
        //check if in editing editingMode
        if (this.state.editingMode == "true") {
            return (
                <div className="bioEditor-container">
                    <textarea onChange={this.handleInputChange} />
                    <button
                        className="FriendButton"
                        id="button-behaviour"
                        onClick={this.handleSubmit}
                    >
                        save your bio
                    </button>
                </div>
            );
        } else {
            if (this.props.bio) {
                console.log("THIS.STATE.BIO", this.state.bio);
                //check if there is a saved bio
                return (
                    <div className="bioEditor-container">
                        <div className="bio-text-container">
                            {this.props.bio}
                        </div>
                        <button
                            className="FriendButton"
                            onClick={this.handleEditingMode}
                        >
                            edit bio
                        </button>
                    </div>
                );
            } else {
                // bio is empty, add bio
                return (
                    <div className="bioEditor-container">
                        <div
                            className="FriendButton"
                            id="display-button"
                            onClick={this.handleEditingMode}
                        >
                            Add your BIO now!
                        </div>
                    </div>
                );
            }
        }
    }
}
// async setBio(e) {
//     e.preventDefault();
//
//     await axios.post("/bio", this.state);
// }
//
// handleChange() {}
//
//
// export default function BioEditor(props) {
//     return (
//         <div className="bioEditor-container">
//             <p className="editButton" onClick={this.props.showTextarea}>
//                 edit your bio
//             </p>
//             {props.textareaHidden && (
//                 <textarea
//                     onChange={this.props.handleInput}
//                     name="bioInput"
//                     value={this.props.bio}
//                 />
//             )}
//         </div>
//     );
// }
