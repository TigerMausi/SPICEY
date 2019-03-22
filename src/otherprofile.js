import React from "react";
import axios from "./axios";
import FriendButton from "./friendbutton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const otherUserId = this.props.match.params.id;
        console.log("THIS !!!!.props", this.props);

        axios
            .get("/api/user/" + otherUserId)
            .then(data => {
                var dataPath = data.data.data;

                console.log(
                    "DATA IN COMPONENT DID MOUNT THER PROFILES",
                    dataPath
                );
                //IF NO USER EXISTS redirect to where i was before
                if (dataPath == undefined) {
                    this.props.history.push("/");
                }
                //COMPARING MY ID WITH THE ONE FROM other USER
                else if (data.data.userId == dataPath.id) {
                    this.props.history.push("/");
                }

                console.log(
                    "dataPath.profilepic MY IMAGE",
                    dataPath.profilepic
                );

                this.setState({
                    id: dataPath.id,
                    firstName: dataPath.first,
                    lastName: dataPath.last,
                    profilePic: dataPath.profilepic,
                    bio: dataPath.bio
                });

                if (!dataPath.profilepic) {
                    this.setState({
                        profilePic: "/images/funny.gif"
                    });
                }

                if (!dataPath.bio) {
                    this.setState({
                        bio: "User hasn't added any bio yet"
                    });
                }

                // //trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the render() will be called twice in this case, the user won’t see the intermediate state.
                // console.log("DATA in componentDidMount", data);
                // console.log("The IMG in componentDidMount", data.profilepic);
                // this.setState({
                //     id: data.data.id,
                //     firstName: data.data.first,
                //     lastName: data.data.last,
                //     profilePic: data.data.profilepic,
                //     bio: data.data.bio
                // });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="profile-container">
                <div className="image">
                    <img src={this.state.profilePic} />
                </div>
                <div className="infos-other-profile">
                    {this.state.firstName}
                    <br />
                    {this.state.lastName}
                    <div>User: {this.state.id}</div>
                </div>

                <div className="bioEditor-container">
                    <div className="bio-text-container">{this.state.bio}</div>
                    <FriendButton otherUserId={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}

/*ADD FRIENDBUTTON later <FriendButton
this.props.match.params.id
 <p>{this.props.bio}</p>

 // <BioEditor
 //     image={this.props.image}
 //     onClick={this.showUploader}
 //     showTextarea={this.showTextarea}
 //     hideTextarea={this.hideTextarea}
 //     bio={this.props.bio}
 //     setBio={this.props.setBio}
 // />
>*/
