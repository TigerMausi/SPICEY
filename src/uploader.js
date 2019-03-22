import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //HANDLE CHANGE
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.files[0]
            },
            () => console.log("The new state ", this.state)
        );
    }

    //HANDLE SUBMIT for when the form will be submitted
    handleSubmit(e) {
        e.preventDefault(); //so that the button doesn't refreshes
        // formData is just for files
        var formData = new FormData();
        formData.append("file", this.state.file);
        console.log("this,state", this.state.file);

        axios
            .post("/upload", formData)
            .then(data => {
                console.log(
                    "DATA RESPONSE URL in UPLOADER ",
                    data.data[0].profilepic
                );

                this.props.setImage(data.data[0].profilepic);
                // console.log("PROPS AFTER IN UPLOAD POST", this.props);
                //
                // console.log("DATA DATA", data.data[0].profilepic);
            })
            .catch(err => {
                console.log("ERROR in handleSubmit: ", err);
            });
        // console.log("this in uploadFile: ", this);
        // console.log("formData in uploadFile: ", formData);
    }

    render() {
        return (
            <div className="uploadermodal">
                <p className="xButton" onClick={this.props.hideUploader}>
                    X
                </p>
                <h2> Upload a new profile picture </h2>
                <label className="custom-file-upload">
                    Upload
                    <input
                        onChange={this.handleChange}
                        className="file"
                        type="file"
                        name="file"
                        accept="image/*"
                    />
                </label>
                <button
                    id="MyButton"
                    className="custom-file-upload"
                    onClick={this.handleSubmit}
                >
                    Save
                </button>
            </div>
        );
    }
}
//<div className="overlay-container">
//<p className="xButton" onClick={this.props.hideUploader}>
//    X
//</p>
// <form onSubmit={this.handleSubmit}>
//     <input
//         onChange={this.handleChange}
//         type="file"
//         accept="image/*"
//         name="file"
//     />
//     <button /*type="submit"*/ className="FriendButton">
//         UPLOAD
//     </button>
// </form>
//    </div>

//uploader needs to tell the
//app will have a function that will pass to the UPLOADER
//the uploader will have to call it so after this we need to send a json response
